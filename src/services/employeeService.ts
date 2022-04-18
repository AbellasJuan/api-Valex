import * as employeeRepository from "../repositories/employeeRepository.js";

export async function getUserIfExist(id: number){
    const employee = await employeeRepository.findById(id);

    if(!employee) throw {type: 'not_found', message: 'employee not found'};

    return employee;
};