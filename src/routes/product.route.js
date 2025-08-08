import { Router } from "express";
import { 
    deleteProductHandler,
        getPoductHandlerByParam, 
        getProductsHandler, 
        postProductHandler,
        putProductHandler
    } 
from '../controllers/product.controller.js';

const router = Router();

router.get('/',getProductsHandler)
router.get('/:id',getPoductHandlerByParam)
router.post('/',postProductHandler)
router.put('/:id',putProductHandler)
router.delete('/:id',deleteProductHandler)

export default router;