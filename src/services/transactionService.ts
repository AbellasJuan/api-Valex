import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import * as cardRepository from '../repositories/cardRepository.js';
import * as paymentRepository from '../repositories/paymentRepository.js';
import * as businessRepository from '../repositories/businessRepository.js';
import * as cardService from '../services/cardService.js';

export async function createTransaction(cardId: number, password: string, businessId: number, amount: number) {

    const cardData = await cardRepository.findById(cardId);
    
    await verifyIfCardExist(cardData);
    await verifyCardExpirationDate(cardData);
    await verifyCardPassword(password, cardData);
    await verifyExistingBusiness(businessId, cardData);
    await verifyIfUserHasCredit(cardId, amount)

    await paymentRepository.insert({ cardId, businessId, amount })
};

async function verifyCardExpirationDate(cardData: cardRepository.Card){
    const currentDate = dayjs().format("MM/YY");
    const expirationDate = cardData.expirationDate;
    const isWithinExpirationDate = dayjs(currentDate).isBefore(expirationDate);
    if(!isWithinExpirationDate) throw { type: 'unauthorized', message:'your card has expired' }; 
};

async function verifyCardPassword(password: string, cardData: cardRepository.Card){
    if (!bcrypt.compareSync(password, cardData.password)) throw { type: 'unauthorized', message: 'incorrect password' };
};

async function verifyExistingBusiness(businessId: number, cardData: cardRepository.Card){
    const business = await businessRepository.findById(businessId);
    
    if(!business) throw { type:'not_found', message: 'establishment not found' };
    if(!business.type) throw {type: 'not_found', message:'business type not found'};
    if(business.type !== cardData.type) throw { type: 'not_found', message:'business type not found for this user' };
};

async function verifyIfUserHasCredit(cardId: number, amount: number){
    const amountAvailable = await cardService.getBalanceAndTransactions(cardId);
    if (amountAvailable.balance < amount) throw { type: 'unauthorized', message: 'check your balance'} ;
};

async function verifyIfCardExist(cardData: cardRepository.Card){
    if(!cardData) throw { type: 'not_found', message: 'card not found' };
};