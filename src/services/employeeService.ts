import { notFoundError } from "../errors/notFoundError.js";
import * as employeeRepository from "../repositories/employeeRepository.js";

export async function getUserIfExist(id: number){
    const employee = await employeeRepository.findById(id);

    if(!employee) throw notFoundError('emplyee'); 
    return employee;
};