import * as employeeRepository from "../repositories/employeeRepository.js";

export async function seUsuarioExisteOuNao(id: number){
    
    const employee = await employeeRepository.findById(id);

    if(!employee) throw {type: 'not_found', message:'user not found'}

    return employee;
};