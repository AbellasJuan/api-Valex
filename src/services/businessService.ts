import { notFoundError } from '../errors/notFoundError.js';
import * as businessRepository from '../repositories/businessRepository.js';

export async function getBusinessIfExist(id: number){
    const business = await businessRepository.findById(id);

    if(!business) throw notFoundError('card');
    return business;
};