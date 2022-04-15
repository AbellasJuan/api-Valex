import { Router } from "express";
import * as businessController from "../controllers/businessController.js";

const businessRouter = Router();

businessRouter.get('/business/:id', businessController.getBusiness)

export default businessRouter;