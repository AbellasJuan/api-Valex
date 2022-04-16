export function errorNotFound(entity: any, entityName: string){
    if(`${entity}`.length === 0 || !entity) throw {type: 'not_found', message:`${entityName} not found`};
};