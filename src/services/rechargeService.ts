import dayjs from 'dayjs';
import * as cardRepository from '../repositories/cardRepository.js';
import * as rechargeRepository from '../repositories/rechargeRepository.js';
import * as errorUtils from '../../utils/errorsUtils.js'

export async function rechargeCard(cardId: number, amount: number) {
    const entityName = 'card';

    const cardData = await cardRepository.findById(cardId);

    console.log('encotrou aqui na service:', cardData)
	
    errorUtils.errorNotFound(cardData, entityName)

	const currentDate = dayjs().format("MM/YY");
    const expirationDate = cardData.expirationDate;
    const isWithinExpirationDate = dayjs(currentDate).isBefore(expirationDate);
    if(!isWithinExpirationDate) throw {type: 'unauthorized', message:'your card has expired'}; 

    await rechargeRepository.insert({ cardId, amount }); 
};