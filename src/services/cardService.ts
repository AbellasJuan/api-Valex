import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import * as errorUtils from "../../utils/errorsUtils.js"
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import { string } from "joi";

export async function getAllCardsIfExist(){
    const card = await cardRepository.find();
    const entityName = 'card';

    errorUtils.errorNotFound(card, entityName)
    
    console.log('service:', card);
    return card;
};

export async function getCardByCardIdIfExist(id: number){
    const card = await cardRepository.findById(id);
    const entityName = 'card';

    errorUtils.errorNotFound(card, entityName)
    return card;
};

export async function validateCreation(employeeId: number, companyId: number, type: cardRepository.TransactionTypes) {
    const entityName = 'employee';

    const employee = await employeeRepository.findById(employeeId);
    errorUtils.errorNotFound(employee, entityName);
    if (employee.companyId !== companyId) throw {type: 'unauthorized', message:'unauthorized to create card'};

    const card = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
    if(card) throw {type: 'unauthorized', message:'unauthorized to create card'};
};

export async function createCard(employeeId: number, type: cardRepository.TransactionTypes) {
    const cardData = await formatCardData(employeeId, type);

    await cardRepository.insert(cardData);
};

async function formatCardData(employeeId: number, type: cardRepository.TransactionTypes) {
    const number = faker.finance.creditCardNumber('mastercard');
    const cardholderName = await formatEmployeeName(employeeId);
    const securityCode = faker.finance.creditCardCVV();
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
    
    for(let i = 1; i < (nameToArray.length - 1); i++){
        if(nameToArray[i].length >= 3) cardholderName += ` ${nameToArray[i][0]}`;
    };

    return cardholderName + ` ${nameToArray[nameToArray.length - 1]}`;
};

async function formatEmployeeName(employeeId: number) {
    const { fullName } = await employeeRepository.findById(employeeId);
    return formatName(fullName);
};

export async function deleteCardById(id: number){
    await cardRepository.remove(id);
};