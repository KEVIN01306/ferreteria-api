import { Router } from "express";
import productsRoute from "./product.route.js";
import salesRoute from "./sale.route.js";
import saleDetailRoute from "./saleDetail.route.js";

const router = Router()

router.use('/products',productsRoute)
router.use('/sales',salesRoute)
router.use('/saleDetail',saleDetailRoute)

export default router;
