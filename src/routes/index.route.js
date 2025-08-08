import { Router } from "express";
import productsRoute from "./product.route.js";

const router = Router()

router.use('/products',productsRoute)

export default router;
