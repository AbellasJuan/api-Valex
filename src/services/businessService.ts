import * as businessRepository from '../repositories/businessRepository.js';

export async function getBusinessIfExist(id: number){
    const business = await businessRepository.findById(id);

    if(!business) throw {type: 'not_found', message:'business not found'};

    return business;
};