import * as employeeRepository from "../repositories/employeeRepository.js";

export async function seUsuarioExisteOuNao(id: number){
    
    const employee = await employeeRepository.findById(id);

    console.log('employee:', employee)
    
    if(!employee) throw {type: 'not_found', message:'user not found'}
};