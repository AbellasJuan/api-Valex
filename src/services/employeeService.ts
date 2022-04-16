import * as employeeRepository from "../repositories/employeeRepository.js";
import * as errorUtils from "../../utils/errorsUtils.js";

export async function getUserIfExist(id: number){
    const entityName = 'employee';
    const employee = await employeeRepository.findById(id);

    errorUtils.errorNotFound(employee, entityName)

    return employee;
};