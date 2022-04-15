import { Request, Response } from "express";
import * as employeeService from "../services/employeeService.js";

export async function selectEmployee(req: Request, res: Response){

    const { id } = req.params;
    const idTypeNumber = Number(id);

    const existingEmployee = await employeeService.getUserIfExist(idTypeNumber)

    console.log('employeeController', existingEmployee)

    res.sendStatus(200);
};