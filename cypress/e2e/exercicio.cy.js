/// <reference types="cypress" />

describe('Create devices', () => {
    it("Create especific device", () => {
        const dataAtual = (new Date().toISOString().slice(0, 16));

        const body = {
            "name": "Apple MacBook Pro 20",
            "data": {
                "year": 2023,
                "price": 5849.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "2 TB"
            }
        };

        cy.request({
            method: "POST",
            url: "/objects",
            // utilizado para não falhar algumas requisições quando não são válidas
            failOnStatusCode: false,
            body: body
        }).as('registerDevicesResult');

        // Validates
        cy.get('@registerDevicesResult').then((response) => {
            expect(response.status).equal(200);
            expect(response.body.name).not.empty;
            expect(response.body.name).equal("Apple MacBook Pro 20");
            expect(response.body.createdAt).not.empty;
            // validando a data do createdAt
            expect(response.body.createdAt.slice(0, 16)).to.equal(dataAtual);
        });
    })
});