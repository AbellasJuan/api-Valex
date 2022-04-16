import * as errorUtils from "../../utils/errorsUtils.js"
import * as companyRepository from '../repositories/companyRepository.js';

export async function getCompanyIfExist(apiKey: string){
    const entityName = 'company';
    const company = await companyRepository.findByApiKey(apiKey);

    errorUtils.errorNotFound(company, entityName);

    return company;
}