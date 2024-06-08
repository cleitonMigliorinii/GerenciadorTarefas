import {faker} from '@faker-js/faker';

export function FakeDataService(){

    const username = faker.internet.userName();
    const email = faker.internet.email();
    const cnpj = faker.number.int({min: 10000000000000, max: 99999999999999}).toString();
    const dataCriacao = faker.date.between({ from: '2024-05-01T00:00:00.000Z', to: '2024-05-01T00:00:00.000Z' }) 
    return{username, email, cnpj, dataCriacao}

}