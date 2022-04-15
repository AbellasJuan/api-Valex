import { Router } from "express";
import * as employeeController from '../controllers/employeeController.js'

const employeeRouter = Router();

employeeRouter.get('/employee/:id', employeeController.selectEmployee)

export default employeeRouter;