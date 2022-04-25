import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import bcrypt from 'bcrypt';
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargesRepository from "../repositories/rechargeRepository.js";
import { notFoundError } from "../errors/notFoundError.js";
import { unauthorizedError } from "../errors/unauthorizedError.js";

export async function getAllCardsIfExist(){
    const cardData = await cardRepository.find();
    
    if(cardData.length === 0 || !cardData) throw notFoundError('card');
    return cardData;
};

export async function getCardByCardIdIfExist(id: number){
    const cardData = await cardRepository.findById(id);

    if(!cardData) throw notFoundError('card');

    return cardData;
};

export async function validateCreation(employeeId: number, companyId: number, type: cardRepository.TransactionTypes) {
    const employee = await employeeRepository.findById(employeeId);
    if(!employee) throw notFoundError('employee');
    if (employee.companyId !== companyId) throw unauthorizedError(); 

    const cardData = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
    if(cardData) throw unauthorizedError(); 
};

export async function createCard(employeeId: number, type: cardRepository.TransactionTypes) {
    const cardData = await formatCardData(employeeId, type);
    await cardRepository.insert(cardData);
};

async function formatCardData(employeeId: number, type: cardRepository.TransactionTypes) {
    const number = faker.finance.creditCardNumber('mastercard');
    const cardholderName = await formatEmployeeName(employeeId);
    const securityCode = await createCriptoCVV();
    const expirationDate = dayjs().add(5, "year").format("MM/YY");

    return {
        employeeId: employeeId,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: false,
        type
    };
};

function formatName(name: string) {
    const nameToArray = name.toUpperCase().split(' ');
    let cardholderName = nameToArray[0];
    
    for(let i = 1; i < (nameToArray.length-1); i++){
        if(nameToArray[i].length >= 3) cardholderName += ` ${nameToArray[i][0]}`;
    };

    return cardholderName + ` ${nameToArray[nameToArray.length-1]}`;
};

async function formatEmployeeName(employeeId: number) {
    const { fullName } = await employeeRepository.findById(employeeId);
    return formatName(fullName);
};

async function createCriptoCVV(){
    const securityCode = faker.finance.creditCardCVV();
    console.log(securityCode);
    const hashedSecurityCode = bcrypt.hashSync(securityCode, 10);
    return hashedSecurityCode;
};

export async function deleteCardById(id: number){
    await cardRepository.remove(id);
};

export async function activateCard(securityCode: string, password: string, originalCardId: number){
    const cardData = await cardRepository.findById(originalCardId);
    if(cardData) throw notFoundError('card');

    await verifyCardExpirationDate(cardData);
    await verifyCVC(securityCode, cardData);
    await verifyIfCardActivated(cardData);

    const hashedPassword = bcrypt.hashSync(password, 10);
    const cardDataValidated = {
        password: hashedPassword,
        originalCardId: originalCardId
    };
    await cardRepository.update(originalCardId, cardDataValidated);
};

async function verifyCardExpirationDate(cardData: cardRepository.Card){
    const currentDate = dayjs().format("MM/YY");
    const expirationDate = cardData.expirationDate;
    const isWithinExpirationDate = dayjs(currentDate).isBefore(expirationDate);
    if(!isWithinExpirationDate) throw unauthorizedError(); 
};

async function verifyCVC(securityCode: string, cardData: cardRepository.Card){
    if(!bcrypt.compareSync(securityCode, cardData.securityCode)) throw unauthorizedError();
};

async function verifyIfCardActivated(cardData: cardRepository.Card){
    if(cardData.password) throw unauthorizedError(); 
};

export async function getBalanceAndTransactions(id: number){
	const cardData = await cardRepository.findById(id);
	if (!cardData) throw notFoundError('card');

	const transactions = await paymentRepository.findByCardId(id);
	const recharges =  await rechargesRepository.findByCardId(id);

	const transactionsTotal = transactions
		.map(transaction => transaction.amount)
		.reduce((curr: number, sum: number) => curr + sum, 0);
	
	const rechargesTotal = recharges
		.map((recharge) => recharge.amount)
		.reduce((curr: number, sum: number) => curr + sum, 0);
	
	return {
		balance: rechargesTotal - transactionsTotal,
		transactions,
		recharges
	};
};