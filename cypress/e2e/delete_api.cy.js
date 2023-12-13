/// <reference types="cypress" />

describe('Register and delete specific device', () => {
    it("Delete especific device", () => {
        const body = {
            "name": "Apple MacBook Pro 20",
            "data": {
                "year": 2023,
                "price": 5849.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "2 TB"
            }
        }

        // cadastrando dispositivo
        cy.postDeviceSpecific(body)
            .then((response_post) => {
                expect(response_post.status).equal(200)

                // fazendo requisição pra deletar dispositivo cadastrado
                cy.request({
                    method: "DELETE",
                    url: `/objects/${response_post.body.id}`,
                    // utilizado para não falhar algumas requisições quando não são válidas
                    failOnStatusCode: false,
                }).as('deleteDevicesResult')
                // não precisa passar body pq delete n tem

                // Validações
                cy.get('@deleteDevicesResult')
                    .then((response_delete) => {
                        expect(response_delete.status).equal(200)
                        expect(response_delete.body.message)
                            .equal(`Object with id = ${response_post.body.id} has been deleted.`)
                    });
            });
    });

    it('Error requests', () => {

        const id_inexistente = '123*-'

        cy.request({
            method: "DELETE",
            url: `/objects/${id_inexistente}`,
            // utilizado para não falhar algumas requisições quando não são válidas
            failOnStatusCode: false,
        }).as('deleteDevicesResult');
        // não precisa passar body pq delete n tem body

        // Validações
        cy.get('@deleteDevicesResult')
            .then((response_delete) => {
                expect(response_delete.status).equal(404);
                expect(response_delete.body.error).equal(`Object with id = ${id_inexistente} doesn't exist.`)
            })
    })
})
