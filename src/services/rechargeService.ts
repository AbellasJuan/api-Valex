import dayjs from 'dayjs';
import { notFoundError } from '../errors/notFoundError.js';
import { unauthorizedError } from '../errors/unauthorizedError.js';
import * as cardRepository from '../repositories/cardRepository.js';
import * as rechargeRepository from '../repositories/rechargeRepository.js';

export async function rechargeCard(cardId: number, amount: number) {
    const cardData = await cardRepository.findById(cardId);

    if(!cardData) throw notFoundError('card'); 

	const currentDate = dayjs().format("MM/YY");
    const expirationDate = cardData.expirationDate;
    const isWithinExpirationDate = dayjs(currentDate).isBefore(expirationDate);
    if(!isWithinExpirationDate) throw unauthorizedError(); ; 

    await rechargeRepository.insert({ cardId, amount }); 
};