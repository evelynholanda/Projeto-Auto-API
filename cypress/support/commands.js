/// <reference types="cypress" />



Cypress.Commands.add('getDeviceSpecific', (device_id) => {

    cy.request({
        method: "GET",
        url: `/objects/${device_id}`,
        //utilizado para falhar algumas requisições quando não são validas
        failOnStatusCode: false
    }).then((response) => { return response })

    
})

Cypress.Commands.add('postDeviceSpecific', (body) => {

    cy.request({
        method: "POST",
        url: "/objects",
        // utilizado para não falhar algumas requisições quando não são válidas
        failOnStatusCode: false,
        body: body
    }).then((response) => { return response })

})

    
