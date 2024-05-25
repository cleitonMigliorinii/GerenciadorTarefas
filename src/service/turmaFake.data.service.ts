import {faker} from '@faker-js/faker';

export function FakeDataService(){

    const username = faker.internet.userName();
    const dataInicial = faker.date.between({ from: '2024-02-01T00:00:00.000Z', to: '2024-02-31T00:00:00.000Z' })
    const dataFinal = faker.date.between({ from: '2024-12-01T00:00:00.000Z', to: '2024-12-31T00:00:00.000Z' }) 

    return{username, dataInicial, dataFinal}

}