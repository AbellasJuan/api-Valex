import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import * as cardRepository from '../repositories/cardRepository.js';
import * as paymentRepository from '../repositories/paymentRepository.js';
import * as businessRepository from '../repositories/businessRepository.js';
import * as cardService from '../services/cardService.js';

export async function purchase(cardId: number, password: string, businessId: number, amount: number) {
    const cardData = await cardRepository.findById(cardId);
    if (!cardData) throw { type: 'not_found', message: 'card not found' };

    console.log(cardId, password, businessId, amount)

    //ver se o cartao ta na validade
    const currentDate = dayjs().format("MM/YY");
    const expirationDate = cardData.expirationDate;
    const isWithinExpirationDate = dayjs(currentDate).isBefore(expirationDate);
    if(!isWithinExpirationDate) throw { type: 'unauthorized', message:'your card has expired' }; 

    //ver se a senha do cartao ta correta
    if (!bcrypt.compareSync(password, cardData.password)) throw { type: 'unauthorized', message: 'incorrect password' };

    //ver se business existe
    const business = await businessRepository.findById(businessId);
    console.log(business)
    if (!business) throw { type:'not_found', message: 'establishment not found' };

    //business nao existe
    console.log(business.type)
    if(!business.type) throw {type: 'not_found', message:'business type not found'};

    //ver se o tipo da compra bate com o tipo do cartao
    if(business.type !== cardData.type) throw { type: 'not_found', message:'business type not found for this user' };

    //ver se  o cara tem credito pra fazer aquela compra
    const amountAvailable = await cardService.getBalanceAndTransactions(cardId);
    if (amountAvailable.balance < amount) throw { type: 'unauthorized', message: 'verify if you have credit'} ;

    await paymentRepository.insert({ cardId, businessId, amount })
};