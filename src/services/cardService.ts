import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import bcrypt from 'bcrypt';
import * as errorUtils from "../../utils/errorsUtils.js"
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";

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
    console.log('securityCode:', securityCode)
    const hashedSecurityCode = bcrypt.hashSync(securityCode, 10);
    return hashedSecurityCode;
};

export async function deleteCardById(id: number){
    await cardRepository.remove(id);
};

export async function activateCard(securityCode: string, password: string, originalCardId: number){
    const entityName = 'card';

    // Somente cartões cadastrados devem ser ativados
    const cardData = await cardRepository.findById(originalCardId);
    errorUtils.errorNotFound(cardData, entityName)

    // Somente cartões não expirados devem ser ativados
    const currentDate = dayjs().format("MM/YY");
    const expirationDate = cardData.expirationDate;
    const isWithinExpirationDate = dayjs(currentDate).isBefore(expirationDate);
    if(!isWithinExpirationDate) throw {type: 'unauthorized', message:'your card has expired'};

    // O CVC deverá ser recebido e verificado para garantir a segurança da requisição
    if(!bcrypt.compareSync(securityCode, cardData.securityCode)) throw {type: 'unauthorized', message:'CVV invalid'};
    
    // Cartões já ativados (com senha cadastrada) não devem poder ser ativados de novo
    if(cardData.password) throw {type: 'conflict', message:'card has been activated'};

    // A senha do cartão deverá ser persistida de forma criptografada por ser um dado sensível
    const hashedPassword = bcrypt.hashSync(password, 10);
    const cardDataValidated = {
        password: hashedPassword,
        originalCardId: originalCardId
    };

    // validar cartao
    await cardRepository.update(originalCardId, cardDataValidated);
};