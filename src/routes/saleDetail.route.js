import { Router } from "express";
import { 
    deleteSaleDetailHandler,
    getSaleDetailHandlerByParam,
    getSaleDetailsHandler,
    postSaleDetailHandler,
    putSaleDetailHandler,} 
from '../controllers/saleDetail.controller.js';

const router = Router();

router.get('/',getSaleDetailsHandler)
router.get('/:id',getSaleDetailHandlerByParam)
router.post('/',postSaleDetailHandler)
router.put('/:id',putSaleDetailHandler)
router.delete('/:id',deleteSaleDetailHandler)

export default router;