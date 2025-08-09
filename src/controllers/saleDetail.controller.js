import { products } from "../mock-data/product.data.js";
import { sales } from "../mock-data/sale.data.js";
import {
    getAllSaleDetails,
    getSaleDetailById,
    createSaleDetail,
    updateSaleDetail,
    deleteSaleDetail
} from "../service/saleDetail.service.js";
import Joi from "joi";

const saleDetailSchema = Joi.object({
    id: Joi.number().integer().min(1).required(),
    saleId: Joi.number().integer().min(1).required(),
    productId: Joi.number().integer().min(1).required(),
    quantity: Joi.number().integer().min(1).required()
});

function joinSaleDetail(detail) {
    const product = products.find(p => p.id === detail.productId);
    const sale = sales.find(s => s.id === detail.saleId);
    const subtotal = product ? product.price * detail.quantity : null;
    return {
        ...detail,
        product: product || null,
        sale: sale || null,
        subtotal
    };
}

const getSaleDetailsHandler = async (req, res) => {
    try {
        const details = getAllSaleDetails();
        const joinedDetails = details.map(joinSaleDetail);
        res.status(200).json({
            message: "success",
            data: {
                saleDetails: joinedDetails,
                count: joinedDetails.length
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getSaleDetailHandlerByParam = async (req, res) => {
    try {
        const id = req.params.id;
        const detail = getSaleDetailById(id);
        if (!detail) {
            return res.status(404).json({ message: "SaleDetail not found" });
        }
        res.status(200).json({
            message: "success",
            data: joinSaleDetail(detail)
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const postSaleDetailHandler = async (req, res) => {
    try {
        const newDetail = req.body;
        const { error } = saleDetailSchema.validate(newDetail);
        if (error) {
            return res.status(400).json({
                message: "Validation error",
                details: error.details.map(d => d.message)
            });
        }
        const saleExists = sales.some(s => s.id === newDetail.saleId);
        const productExists = products.some(p => p.id === newDetail.productId);
        if (!saleExists || !productExists) {
            return res.status(400).json({
                message: "Referenced sale or product does not exist"
            });
        }
        const created = createSaleDetail(newDetail);
        if (!created) {
            return res.status(400).json({ message: "SaleDetail already exists" });
        }
        res.status(201).json({
            message: "success",
            data: { saleDetail: created.id }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const putSaleDetailHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedDetail = req.body;
        const partialSchema = saleDetailSchema.fork(["id"], field => field.forbidden());
        const { error } = partialSchema.validate(updatedDetail, { allowUnknown: false });
        if (error) {
            return res.status(400).json({
                message: "Validation error",
                details: error.details.map(d => d.message)
            });
        }
        if (updatedDetail.saleId && !sales.some(s => s.id === updatedDetail.saleId)) {
            return res.status(400).json({ message: "Referenced sale does not exist" });
        }
        if (updatedDetail.productId && !products.some(p => p.id === updatedDetail.productId)) {
            return res.status(400).json({ message: "Referenced product does not exist" });
        }
        const updated = updateSaleDetail(id, updatedDetail);
        if (!updated) {
            return res.status(404).json({ message: "SaleDetail not found" });
        }
        res.status(200).json({
            message: "success",
            data: joinSaleDetail(updated)
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const deleteSaleDetailHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = deleteSaleDetail(id);
        if (!deleted) {
            return res.status(404).json({ message: "SaleDetail not found" });
        }
        res.status(200).json({ message: "SaleDetail deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export {
    getSaleDetailsHandler,
    getSaleDetailHandlerByParam,
    postSaleDetailHandler,
    putSaleDetailHandler,
    deleteSaleDetailHandler
};
