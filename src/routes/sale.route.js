import { Router } from "express";
import { 
    deleteSaleHandler,
    getSaleHandlerByParam, 
    getSalesHandler, 
    postSaleHandler,
    putSaleHandler } 
from '../controllers/sale.controller.js';

const router = Router();

router.get('/',getSalesHandler)
router.get('/:id',getSaleHandlerByParam)
router.post('/',postSaleHandler)
router.put('/:id',putSaleHandler)
router.delete('/:id',deleteSaleHandler)

export default router;