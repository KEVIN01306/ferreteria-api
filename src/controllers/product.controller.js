import { products } from "../mock-data/product.data.js";

const getProductsHandler = async (req,res) => {
    try{
        let response = {
            message: "success",
            data: {
                products: products,
                count: products.length
            }
        };
        res.status(200).json(response);
    }catch (error){
        console.error(error);
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}


const getPoductHandlerByParam = async (req,res) => {
    try{

        const id = req.params.id;

        let response = {}

        const prodcut = products.find( p => p.id == id)
        if (!prodcut){
            response = {
                message: "Producto no encontrado",
            };
            return res.status(404).json(response)
        }

        response = {
            message: "success",
            data: prodcut
        };
        res.status(200).json(response);
    }catch (error){
        console.error(error);
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}

const postProductHandler = async (req,res) => {
    try{
        const newProduct = req.body

        let response = {}
        const product = products.find( p => p.id == newProduct.id );
        if (product) {
            response = {
                message: "El producto ya existe"
            }
            return res.status(400).json(response)
        }

        products.push(newProduct);

        response = {
            message: "success",
            data: {
                product: newProduct.id,
            }
        }
        return res.status(201).json(response)
    }catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}

const putProductHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedProduct = req.body;

        let response = {};
        const index = products.findIndex(p => p.id == id);

        if (index === -1) {
            response = {
                message: "Producto no encontrado"
            };
            return res.status(404).json(response);
        }

        products[index] = { ...products[index], ...updatedProduct };

        response = {
            message: "success",
            data: products[index]
        };
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

const deleteProductHandler = async (req, res) => {
    try {
        const id = req.params.id;

        let response = {};
        const index = products.findIndex(p => p.id == id);

        if (index === -1) {
            response = {
                message: "Producto no encontrado"
            };
            return res.status(404).json(response);
        }

        products.splice(index, 1);

        response = {
            message: "Producto eliminado correctamente"
        };
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};


export {
    getProductsHandler,
    getPoductHandlerByParam,
    postProductHandler,
    putProductHandler,
    deleteProductHandler
}