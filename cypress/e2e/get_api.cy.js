/// <reference types="cypress" />

describe('List device specific', () => {

    it('List the especific device', () => {
        const device_id = "7"
        
       cy.getDeviceSpecific(device_id)
            .then((response) => {
            
                expect(response.status).equal(200)
                expect(response.body).not.empty
                expect(response.body.id).equal(device_id)
                //Pode validar assim também
                expect(response.body.id).equal(String(7))
                expect(response.body.data).not.empty
                expect(response.body.data.year).not.string   
                expect(response.body.data.year).equal(2019)   
                expect(response.body.data.price).equal(1849.99)   
    
            })
                

        })
    });

    it('Get inexistente device and failOnStatusCode must be false', () => {
        const device_id = "xpto"

        cy.getDeviceSpecific(device_id)
        .then((response) => {

//criando apelido
        }).as('getAllDevicesResult')

        //Arsserts
//Fazendo chamada apelido da request
        cy.get("@getAllDevicesResult")
            .then((response) => {
                expect(response.status).equal(404)
                expect(response.body.error).equal(`Oject with id=${device_id} was not found.`)
                

        })
    })


    it('Validate response body', () => {

        const device_id = "7"
        cy.request({
            method: "GET",
            url: `/objects/${device_id}`,
            //utilizado para falhar algumas requisições quando não são validas
            failOnStatusCode: false
    
    //criando apelido
            }).as('getAllDevicesResult')
    
            //Arsserts
    //Fazendo chamada apelido da request
            cy.get("@getAllDevicesResult")
                .then((response) => {
                    expect(response.status).equal(200)
                    expect(response.body).not.empty
                    expect(response.body.id).equal(device_id)
                    //Pode validar assim também
                    expect(response.body.id).equal(String(7))
                    expect(response.body.data).not.empty
                    expect(response.body.data.year).not.string   
                    expect(response.body.data.year).equal(2019)    
    
            })
    });
