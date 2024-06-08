

import { faker } from '@faker-js/faker';

export function FakeDataService() {

    const empresa = faker.company.name();
    const cnpj = faker.number.int({min : 10000000000000, max: 99999999999999}).toString()
    
    const RA = FakeRA()

    const nome =  faker.person.fullName()
    .replace(/Mr. /g, '')
    .replace(/Ms. /g, '')
    .replace(/Dr. /g, '')
    .replace(/Mrs. /g, '')
    .replace(/mr. /g, '')
    .replace(/ms. /g, '')
    .replace(/dr. /g, '')
    .replace(/mrs. /g, '')

    const senha = faker.internet.password()
    
    const email = FakeEmail(nome, RA);

    const telefone = FakeTelefone()
    const tipoUser = fakeTipoUser()
    const turma = fakeTurma()
    const situacao = fakeSituacao()

    return {empresa, cnpj, RA, nome, senha, email, telefone, tipoUser, turma, situacao}
}

function FakeRA() {

    let ano = faker.number.int({min : 2018, max: 2024}).toString()
    let sequencial = faker.number.int({ min: 0, max: 999999 }).toString().padStart(6, '0');

    const RA = ano + sequencial;

    return RA

}

function FakeEmail(nome: string, ra: string) {

    const username = nome.replace(/ /g, '.').toLowerCase();

    const empresa = faker.company.name()
    .replace(/ /g, '')
    .replace(/-/g, '')
    .toLowerCase();

    const email = username+ra+`@aluno${empresa}.com`

    return email
}

function FakeTelefone() {

    let dd = faker.number.int({min : 10, max: 70}).toString()
    let numero = faker.number.int({min : 10000000, max: 99999999}).toString()

    const telefone = dd + "9" + numero

    return telefone

}

function fakeTipoUser() {

    const randomNumber = Math.random();

    if (randomNumber < 0.1) {
        return "Professor";
    } else {
        return "Aluno";
    }

}

function fakeTurma() {

    const { v4: uuidv4 } = require('uuid');

    return uuidv4();

}

function fakeSituacao() {

    const randomNumber = Math.random();

    if (randomNumber < 0.1) {
        return false;
    } else {
        return true;
    }

}