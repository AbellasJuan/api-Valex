import * as cardRepository from '../repositories/cardRepository.js';

export async function getAllCardsIfExist(){
    const card = await cardRepository.find();

    if(card.length === 0) throw {type: 'not_found', message:'card not found'}

    console.log('service:', card)

    return card;
};

export async function getCardByCardIdIfExist(id: number){
    const card = await cardRepository.findById(id);

    if(!card) throw {type: 'not_found', message:'card not found'}
    return card;
};