import { Request, Response } from "express";
import * as employeeService from "../services/employeeService.js";

export async function getEmployee(req: Request, res: Response){
    const { id } = req.params;
    const idTypeNumber = Number(id);

    const employee = await employeeService.getUserIfExist(idTypeNumber)
    res.status(200).send(employee);
};