import {faker} from '@faker-js/faker';

export function FakeDataService(){

    const username = faker.internet.userName();
    const dataInicioPeriodo = faker.date.between({ from: "2024-02-01T00:00:00.000Z", to: "2024-02-28T00:00:00.000Z" })
    const dataFinalPeriodo = faker.date.between({ from: '2024-12-01T00:00:00.000Z', to: "2024-12-30T00:00:00.000Z" }) 
    const codigoIes = faker.number.int({min: 1, max: 999999999}).toString();

    return{username, dataInicioPeriodo, dataFinalPeriodo, codigoIes}

}