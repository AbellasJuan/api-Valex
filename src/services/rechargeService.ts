import dayjs from 'dayjs';
import * as cardRepository from '../repositories/cardRepository.js';
import * as rechargeRepository from '../repositories/rechargeRepository.js';

export async function rechargeCard(cardId: number, amount: number) {
    const cardData = await cardRepository.findById(cardId);

    if(!cardData) throw {type: 'not_found', message: 'card not found'};

	const currentDate = dayjs().format("MM/YY");
    const expirationDate = cardData.expirationDate;
    const isWithinExpirationDate = dayjs(currentDate).isBefore(expirationDate);
    if(!isWithinExpirationDate) throw {type: 'unauthorized', message:'your card has expired'}; 

    await rechargeRepository.insert({ cardId, amount }); 
};