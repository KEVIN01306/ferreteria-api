import {
    getAllSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale
} from "../service/sale.service.js";
import Joi from "joi";

const saleSchema = Joi.object({
    id: Joi.number().integer().min(1).required(),
    date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    total: Joi.number().min(0).required()
});

const getSalesHandler = async (req, res) => {
    try {
        const sales = getAllSales();
        res.status(200).json({
            message: "success",
            data: {
                sales,
                count: sales.length
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getSaleHandlerByParam = async (req, res) => {
    try {
        const id = req.params.id;
        const sale = getSaleById(id);
        if (!sale) {
            return res.status(404).json({ message: "Sale not found" });
        }
        res.status(200).json({
            message: "success",
            data: sale
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const postSaleHandler = async (req, res) => {
    try {
        const newSale = req.body;
        const { error } = saleSchema.validate(newSale);
        if (error) {
            return res.status(400).json({
                message: "Validation error",
                details: error.details.map(d => d.message)
            });
        }
        const created = createSale(newSale);
        if (!created) {
            return res.status(400).json({ message: "Sale already exists" });
        }
        res.status(201).json({
            message: "success",
            data: { sale: created.id }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const putSaleHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedSale = req.body;
        const partialSchema = saleSchema.fork(["id"], field => field.forbidden());
        const { error } = partialSchema.validate(updatedSale, { allowUnknown: false });
        if (error) {
            return res.status(400).json({
                message: "Validation error",
                details: error.details.map(d => d.message)
            });
        }
        const updated = updateSale(id, updatedSale);
        if (!updated) {
            return res.status(404).json({ message: "Sale not found" });
        }
        res.status(200).json({
            message: "success",
            data: updated
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const deleteSaleHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = deleteSale(id);
        if (!deleted) {
            return res.status(404).json({ message: "Sale not found" });
        }
        res.status(200).json({ message: "Sale deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export {
    getSalesHandler,
    getSaleHandlerByParam,
    postSaleHandler,
    putSaleHandler,
    deleteSaleHandler
};
