import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../service/product.service.js";
import Joi from "joi";

const productSchema = Joi.object({
    id: Joi.number().integer().min(1).required(),
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().min(5).max(255).required(),
    price: Joi.number().min(0).required(),
    stock: Joi.number().integer().min(0).required()
});

const getProductsHandler = async (req, res) => {
    try {
        const products = getAllProducts();
        res.status(200).json({
            message: "success",
            data: {
                products: products,
                count: products.length
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const getPoductHandlerByParam = async (req, res) => {
    try {
        const id = req.params.id;
        const product = getProductById(id);
        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }
        res.status(200).json({
            message: "success",
            data: product
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const postProductHandler = async (req, res) => {
    try {
        const newProduct = req.body;
        const { error } = productSchema.validate(newProduct);
        if (error) {
            return res.status(400).json({
                message: "Validation error",
                details: error.details.map(d => d.message)
            });
        }
        const created = createProduct(newProduct);
        if (!created) {
            return res.status(400).json({ message: "Product already exists" });
        }
        res.status(201).json({
            message: "success",
            data: { product: created.id }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const putProductHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedProduct = req.body;
        const partialSchema = productSchema.fork(["id"], field => field.forbidden());
        const { error } = partialSchema.validate(updatedProduct, { allowUnknown: false });
        if (error) {
            return res.status(400).json({
                message: "Validation error",
                details: error.details.map(d => d.message)
            });
        }
        const updated = updateProduct(id, updatedProduct);
        if (!updated) {
            return res.status(404).json({ message: "Product not found" });
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

const deleteProductHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = deleteProduct(id);
        if (!deleted) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export {
    getProductsHandler,
    getPoductHandlerByParam,
    postProductHandler,
    putProductHandler,
    deleteProductHandler
}