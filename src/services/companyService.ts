import * as companyRepository from '../repositories/companyRepository.js';

export async function getCompanyIfExist(apiKey: string){
    const company = await companyRepository.findByApiKey(apiKey);
    if(!company) throw {type: 'not_found', message: 'company not found'};
    return company;
};