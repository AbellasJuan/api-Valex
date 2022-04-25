import { notFoundError } from '../errors/notFoundError.js';
import * as companyRepository from '../repositories/companyRepository.js';

export async function getCompanyIfExist(apiKey: string){
    const company = await companyRepository.findByApiKey(apiKey);
    if(!company) throw notFoundError('company'); 
    return company;
};