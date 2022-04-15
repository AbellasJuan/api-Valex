import { Request, Response } from "express";
import * as employeeService from "../services/employeeService.js";

export async function selectEmployee(req: Request, res: Response){

    const id = 3;
    
    const existingEmployee = await employeeService.seUsuarioExisteOuNao(id)

    console.log('employee', existingEmployee)

    

    res.sendStatus(200);
};