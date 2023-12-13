/// <reference types="cypress" />

describe('Update specific device', () => {

    const body_cadastro = require('../fixtures/cadastrar_device.json')
    it('Update especific device', () => {
       
        //COLOCANDO O BODY NO CORPO DA REQUEST SEM USAR FIXTURES
        const body_update = {
            "name": "S3",
            "data": {
                "year": 2021,
                "price": 1999.99,
                "CPU model": "Intel",
                "Hard disk size": "128 GB"
            }
        };

        // cadastrando dispositivo
        cy.request({
            method: "POST",
            url: "/objects",
            // utilizado para não falhar algumas requisições quando não são válidas
            failOnStatusCode: false,
            body: body_cadastro
        }).as('registerDevicesResult');

        // pegando resultado se for 200- cadastrado
        cy.get('@registerDevicesResult')
            .then((response_post) => {
                expect(response_post.status).equal(200);
                expect(response_post.body.name).equal(body_cadastro.name);

                // fazendo alteração dispositivo cadastrado
                cy.request({
                    method: "PUT",
                    url: `/objects/${response_post.body.id}`,
                    // utilizado para não falhar algumas requisições quando não são válidas
                    failOnStatusCode: false,
                    body: body_update
                }).as('updateDevicesResult');
                // não precisa passar body pq delete não tem

                // Validações
                cy.get('@updateDevicesResult')
                    .then((response_update) => {
                        expect(response_update.status).equal(200)
                        expect(response_update.body.name).equal(body_update.name)
                        expect(response_update.body.data.price).equal(body_update.data.price)
                        expect(response_update.body.data["CPU model"]).equal(body_update.data["CPU model"])
                    });
            });
    });
});




