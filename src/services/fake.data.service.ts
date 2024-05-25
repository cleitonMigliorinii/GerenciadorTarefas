

import { faker } from '@faker-js/faker';

export function FakeDataService() {

    const username = faker.internet.userName();
    const email = faker.internet.email();
    const cnpj = faker.number.int({ min: 10000000000000, max: 99999999999999 }).toString()

    const nome = faker.internet.userName();
    const professor = faker.internet.userName();
    const coordenador = faker.internet.userName();

    return { username, email, cnpj, nome, professor, coordenador }
}