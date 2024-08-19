import { date_today} from "../../stringHolders/dateGenerator";
import { generateString } from "../../stringHolders/randomStringGenerator";
import { jpay_stage } from "../../stringHolders/apiEndpoint";
import {JPDepositValidCredentials} from "../../stringHolders/credentials"


var dateToday = date_today();
let payID = generateString(15);
let payID2 = generateString(15);
let paymentID = dateToday + payID
let paymentID2 = dateToday + payID2

let depositParams = jpay_stage.jpDeposit + paymentID + "/" + JPDepositValidCredentials.validAmount + "@" 
                    + JPDepositValidCredentials.stageValidUID + ";" +JPDepositValidCredentials.stageValidTransferID



describe('JPAY TESTING', () => {


it("should jp deposit", () => {
    cy.request({
        method: 'GET',
        url: depositParams,
        headers: {
            'Content-type': 'application/json'
        },
        body:{

        },
        }).as('details')
            cy.get('@details').its('status').should('eq', 200)
            cy.get('@details').then((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.body).to.have.property('success', true)
        });
    //cy.wait(2000)
})

it("should have uid", () => {
    cy.request({
        method: 'GET',
        url: jpay_stage.jpDeposit + paymentID2 + "/" + JPDepositValidCredentials.validAmount + "@" 
        + ' ' + ";" +JPDepositValidCredentials.stageValidTransferID,
        headers: {
            'Content-type': 'application/json'
        },
        body:{

        },
        failOnStatusCode: false
        }).as('details')
            cy.get('@details').its('status').should('eq', 400)
            cy.get('@details').then((response) => {
            expect(response.body).to.have.property('success', false)
            expect(response.body).to.have.property('success', false)
            expect(response.body).to.have.property('message', "Some parameters are missing.")
            expect(response.body).to.have.property('error_code', "E-GENERATE-007")  
        });

})

it("should have amount", () => {
    cy.request({
        method: 'GET',
        url: jpay_stage.jpDeposit + paymentID2 + "/" + '' + "@" 
        + JPDepositValidCredentials.stageValidUID + ";" +JPDepositValidCredentials.stageValidTransferID,
        headers: {
          'Content-type': 'application/json'
        },
        body:{

      },
      failOnStatusCode: false
      }).as('details')
          cy.get('@details').its('status').should('eq', 400)
          cy.get('@details').then((response) => {
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', "Missing amount.")
          expect(response.body).to.have.property('error_code', "E-DEPOSIT-024")  
      });
})

it("should have transfer ID", () => {
    cy.request({
        method: 'GET',
        url: jpay_stage.jpDeposit + paymentID2 + "/" + JPDepositValidCredentials.validAmount + "@" 
        + JPDepositValidCredentials.stageValidUID + ";" +  ' ',
        headers: {
            'Content-type': 'application/json'
        },
        body:{

        },
        failOnStatusCode: false
        }).as('details')
            cy.get('@details').its('status').should('eq', 400)
            cy.get('@details').then((response) => {
            expect(response.body).to.have.property('success', false)
            expect(response.body).to.have.property('success', false)
            expect(response.body).to.have.property('message', "Some parameters are missing.")
            expect(response.body).to.have.property('error_code', "E-GENERATE-007")  
        });
})

it("should have duplicate paymentID", () => {
    cy.request({
        method: 'GET',
        url: depositParams,
        headers: {
            'Content-type': 'application/json'
        },
        body:{

        },
        failOnStatusCode: false
        }).as('details')
            cy.get('@details').its('status').should('eq', 400)
            cy.get('@details').then((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.body).to.have.property('success', false)
            expect(response.body).to.have.property('message', "Duplicate payment id")
            expect(response.body).to.have.property('error_code', "E-DEPOSIT-008") 
        });
})

it("should have invalid transferID", () => {
    cy.request({
        method: 'GET',
        url: jpay_stage.jpDeposit + paymentID2 + "/" + JPDepositValidCredentials.validAmount + "@" 
        + JPDepositValidCredentials.stageValidUID + ";" +JPDepositValidCredentials.stageValidTransferID + "invalid",
        headers: {
            'Content-type': 'application/json'
        },
        body:{

        },
        failOnStatusCode: false
        }).as('details')
            cy.get('@details').its('status').should('eq', 400)
            cy.get('@details').then((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.body).to.have.property('success', false)
            expect(response.body).to.have.property('message', "Invalid UID and/or Transfer ID.")
            expect(response.body).to.have.property('error_code', "E-DEPOSIT-026") 
        });
})

it("should have invalid UID", () => {
    cy.request({
        method: 'GET',
        url: jpay_stage.jpDeposit + paymentID2 + "/" + JPDepositValidCredentials.validAmount + "@" 
        + JPDepositValidCredentials.stageValidUID + "invalid" + ";" +JPDepositValidCredentials.stageValidTransferID,
        headers: {
            'Content-type': 'application/json'
        },
        body:{

        },
        failOnStatusCode: false
        }).as('details')
            cy.get('@details').its('status').should('eq', 400)
            cy.get('@details').then((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.body).to.have.property('success', false)
            expect(response.body).to.have.property('message', "Invalid UID and/or Transfer ID.")
            expect(response.body).to.have.property('error_code', "E-DEPOSIT-026") 
        });
})

it("should have amount with decimal", () => {
    cy.request({
        method: 'GET',
        url: jpay_stage.jpDeposit + paymentID2 + "/" + 100.101 + "@" 
        + JPDepositValidCredentials.stageValidUID + ";" +JPDepositValidCredentials.stageValidTransferID,
        headers: {
            'Content-type': 'application/json'
        },
        body:{

        },
        failOnStatusCode: false
        }).as('details')
            cy.get('@details').its('status').should('eq', 400)
            cy.get('@details').then((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.body).to.have.property('success', false)
            expect(response.body).to.have.property('message', "Invalid amount, should be whole number only.")
            expect(response.body).to.have.property('error_code', "E-DEPOSIT-028") 
        });
})

it("should have no data available", () => {
    cy.request({
        method: 'GET',
        url: jpay_stage.jpDepositNoData + paymentID2 + "/" + JPDepositValidCredentials.validAmount + "@" 
        + JPDepositValidCredentials.stageValidUID + ";" +JPDepositValidCredentials.stageValidTransferID,
        headers: {
            'Content-type': 'application/json'
        },
        body:{

        },
        failOnStatusCode: false
        }).as('details')
            cy.get('@details').its('status').should('eq', 400)
            cy.get('@details').then((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.body).to.have.property('success', false)
            expect(response.body).to.have.property('message', "No Data available")
            expect(response.body).to.have.property('error_code', "E-DEPOSIT-003") 
        });
})


})
