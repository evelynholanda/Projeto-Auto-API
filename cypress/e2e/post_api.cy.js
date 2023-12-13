/// <reference types="cypress" />

describe('Register devices', () => {

    const payload = require('../fixtures/cadastrar_device.json')

    it("Register especific device", () => {
        const dataAtual = (new Date().toISOString().slice(0, 16));


        cy.postDeviceSpecific(payload)
        .then((response) => {
            expect(response.status).equal(200);
            expect(response.body.name).not.empty;
            expect(response.body.name).equal("Apple MacBook Pro 20");
            expect(response.body.createdAt).not.empty;
            // validando a data do createdAt
            expect(response.body.createdAt.slice(0, 16)).to.equal(dataAtual);
        });
    });

    it("Error Register especific device no data", () => {
        cy.postDeviceSpecific('')
        .then((response) => {
            expect(response.status).equal(400);

            // validando a data do createdAt
        });
    });

    it("Empty Object for Register especific device", () => {
        cy.request({
            method: "POST",
            url: "/objects",
            // utilizado para não falhar algumas requisições quando não são válidas
            failOnStatusCode: false,
            body: {}
            //UTILIZANDO ALIAS AO INVES DE COMANDO CUSTOMIZADO
        }).as('registerDevicesResult');

        // Validates
        cy.get('@registerDevicesResult').then((response) => {
            expect(response.status).equal(200);

            // validando a data do createdAt
        });
    });
});
