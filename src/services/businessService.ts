import * as errorUtils from "../../utils/errorsUtils.js"
import * as businessRepository from '../repositories/businessRepository.js';

export async function getBusinessIfExist(id: number){
    const entityName = 'business';
    const business = await businessRepository.findById(id);

    errorUtils.errorNotFound(business, entityName);

    return business;
}