import 'cypress-plugin-api'
import { hash } from '../../functions/sha256Generator'
import { jpay_stage } from '../../stringHolders/apiEndpoint'
import { generateString } from '../../stringHolders/randomStringGenerator'
import {jpWithdrawalValidCreds, jpWithdrawalInvCreds} from "../../stringHolders/credentials"


let jpWithdrawalUrlEndpoint = jpay_stage.jpWithdrawalAuto
let merchantTransactionNumber = generateString(10)
let merchantTransactionNumber2 = generateString(11)
let sig = jpWithdrawalValidCreds.stgKazMerchantID + merchantTransactionNumber + jpWithdrawalValidCreds.stgKazAccNum + jpWithdrawalValidCreds.stgKazEmailAdd + jpWithdrawalValidCreds.withdrawalAmount + "JP_WITHDRAWAL_REQUEST"
let sig2 = jpWithdrawalValidCreds.stgKazMerchantID + merchantTransactionNumber2 + jpWithdrawalValidCreds.stgKazAccNum + jpWithdrawalValidCreds.stgKazEmailAdd + jpWithdrawalValidCreds.withdrawalAmount + "JP_WITHDRAWAL_REQUEST"
let signatureSha256 = hash(sig)
let signatureSha2562 = hash(sig2)

describe('JPAY TESTING', () => {
    
  
it("should create JP Withdrawal", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName ,
          bank_code: jpWithdrawalValidCreds.bankCode ,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          account: jpWithdrawalValidCreds.account,
          name: jpWithdrawalValidCreds.name,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          callback_url: jpay_stage.beeceptorUrlAyaka,
          signature: signatureSha256,
          status: 'active'
        },
        }).as('details')
          cy.get('@details').its('status').should('eq', 200)
          cy.get('@details').then((response) => {
              let res = response.body
              let att1 = res.id
              cy.log(att1)
              expect(response.body).to.have.property('success', true)
        })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        //cy.wait(60000)
        });
})


it("should test with missing merchant transaction number", () => {
  cy.request({
    method: 'POST',
    url: jpWithdrawalUrlEndpoint,
    headers: {
      'Content-type': 'application/json'
    },
    body:{
      merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
      //merchant_transaction_number: merchantTransactionNumber,
      bank_name: jpWithdrawalValidCreds.bankName ,
      bank_code: jpWithdrawalValidCreds.bankCode ,
      branch_name: jpWithdrawalValidCreds.branchName,
      branch_code: jpWithdrawalValidCreds.branchCode,
      account: jpWithdrawalValidCreds.account,
      name: jpWithdrawalValidCreds.name,
      amount: jpWithdrawalValidCreds.withdrawalAmount,
      callback_url: jpay_stage.beeceptorUrlAyaka,
      signature: signatureSha256,
      status: 'active'
    },
    failOnStatusCode: false
  }).as('details')
    cy.get('@details').its('status').should('eq', 400)
    cy.get('@details').then((response) => {
        expect(response.body).to.have.property('success', false)
        expect(response.body).to.have.property('message', 'Invalid request')
        expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
        //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
    })
    cy.get('@details').then((response) => {
    cy.log(JSON.stringify(response.body))
    });
  })


it("should test with missing bank name", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          //bank_name: jpWithdrawalValidCreds.bankName ,
          bank_code: jpWithdrawalValidCreds.bankCode ,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          account: jpWithdrawalValidCreds.account,
          name: jpWithdrawalValidCreds.name,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          callback_url: jpay_stage.beeceptorUrlAyaka,
          signature: signatureSha256,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
        cy.get('@details').its('status').should('eq', 400)
        cy.get('@details').then((response) => {
            expect(response.body).to.have.property('success', false)
            expect(response.body).to.have.property('message', 'Invalid request')
            expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
            //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
        })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        });
})


it("should test with missing bank code", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName ,
          //bank_code: jpWithdrawalValidCreds.bankCode ,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          account: jpWithdrawalValidCreds.account,
          name: jpWithdrawalValidCreds.name,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          callback_url: jpay_stage.beeceptorUrlAyaka,
          signature: signatureSha256,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
        cy.get('@details').its('status').should('eq', 400)
        cy.get('@details').then((response) => {
            expect(response.body).to.have.property('success', false)
            expect(response.body).to.have.property('message', 'Invalid request')
            expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
            //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
        })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        });
})


it("should test with missing branch name", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName ,
          bank_code: jpWithdrawalValidCreds.bankCode ,
          //branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          account: jpWithdrawalValidCreds.account,
          name: jpWithdrawalValidCreds.name,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          callback_url: jpay_stage.beeceptorUrlAyaka,
          signature: signatureSha256,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
        cy.get('@details').its('status').should('eq', 400)
        cy.get('@details').then((response) => {
            expect(response.body).to.have.property('success', false)
            expect(response.body).to.have.property('message', 'Invalid request')
            expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
            //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
        })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        });
})


it("should test with missing branch code", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName ,
          bank_code: jpWithdrawalValidCreds.bankCode ,
          branch_name: jpWithdrawalValidCreds.branchName,
          //branch_code: jpWithdrawalValidCreds.branchCode,
          account: jpWithdrawalValidCreds.account,
          name: jpWithdrawalValidCreds.name,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          callback_url: jpay_stage.beeceptorUrlAyaka,
          signature: signatureSha256,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
        cy.get('@details').its('status').should('eq', 400)
        cy.get('@details').then((response) => {
            expect(response.body).to.have.property('success', false)
            expect(response.body).to.have.property('message', 'Invalid request')
            expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
            //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
        })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        });
})


it("should test with missing account", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName ,
          bank_code: jpWithdrawalValidCreds.bankCode ,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          //account: jpWithdrawalValidCreds.account,
          name: jpWithdrawalValidCreds.name,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          callback_url: jpay_stage.beeceptorUrlAyaka,
          signature: signatureSha256,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
        cy.get('@details').its('status').should('eq', 400)
        cy.get('@details').then((response) => {
            expect(response.body).to.have.property('success', false)
            expect(response.body).to.have.property('message', 'Invalid request')
            expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
            //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
        })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        });
})


it("should test with missing name", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName ,
          bank_code: jpWithdrawalValidCreds.bankCode ,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          account: jpWithdrawalValidCreds.account,
          //name: jpWithdrawalValidCreds.name,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          callback_url: jpay_stage.beeceptorUrlAyaka,
          signature: signatureSha256,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
        cy.get('@details').its('status').should('eq', 400)
        cy.get('@details').then((response) => {
            expect(response.body).to.have.property('success', false)
            expect(response.body).to.have.property('message', 'Invalid request')
            expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
            //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
        })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        });
})


it("should test with missing amount", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName ,
          bank_code: jpWithdrawalValidCreds.bankCode ,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          account: jpWithdrawalValidCreds.account,
          name: jpWithdrawalValidCreds.name,
          //amount: jpWithdrawalValidCreds.withdrawalAmount,
          callback_url: jpay_stage.beeceptorUrlAyaka,
          signature: signatureSha256,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
        cy.get('@details').its('status').should('eq', 400)
        cy.get('@details').then((response) => {
            expect(response.body).to.have.property('success', false)
            expect(response.body).to.have.property('message', 'Invalid request')
            expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
            //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
        })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        });
  })


it("should test with missing callback url", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName ,
          bank_code: jpWithdrawalValidCreds.bankCode ,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          account: jpWithdrawalValidCreds.account,
          name: jpWithdrawalValidCreds.name,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          //callback_url: jpay_stage.beeceptorUrlAyaka,
          signature: signatureSha256,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
          cy.get('@details').its('status').should('eq', 400)
          cy.get('@details').then((response) => {
              expect(response.body).to.have.property('success', false)
              expect(response.body).to.have.property('message', 'Invalid request')
              expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
              //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
          })
          cy.get('@details').then((response) => {
          cy.log(JSON.stringify(response.body))
          });
})


it("should test with missing signature", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName ,
          bank_code: jpWithdrawalValidCreds.bankCode ,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          account: jpWithdrawalValidCreds.account,
          name: jpWithdrawalValidCreds.name,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          callback_url: jpay_stage.beeceptorUrlAyaka,
          //signature: signatureSha256,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
          cy.get('@details').its('status').should('eq', 400)
          cy.get('@details').then((response) => {
              expect(response.body).to.have.property('success', false)
              expect(response.body).to.have.property('message', 'Invalid request')
              expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
              //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
          })
          cy.get('@details').then((response) => {
          cy.log(JSON.stringify(response.body))
          });
})


it("should test bank code must be 4 digits", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName ,
          bank_code: jpWithdrawalInvCreds.threeDigitBankCode,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          account: jpWithdrawalValidCreds.account,
          name: jpWithdrawalValidCreds.name,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          callback_url: jpay_stage.beeceptorUrlAyaka,
          signature: signatureSha256,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
          cy.get('@details').its('status').should('eq', 400)
          cy.get('@details').then((response) => {
              expect(response.body).to.have.property('success', false)
              expect(response.body).to.have.property('message', 'Invalid request')
              expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
              //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
          })
          cy.get('@details').then((response) => {
          cy.log(JSON.stringify(response.body))
          });
})


it("should test branch code must be 3 digits", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName ,
          bank_code: jpWithdrawalInvCreds.threeDigitBankCode,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalInvCreds.twoDigitBranchCode,
          account: jpWithdrawalValidCreds.account,
          name: jpWithdrawalValidCreds.name,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          callback_url: jpay_stage.beeceptorUrlAyaka,
          signature: signatureSha256,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
          cy.get('@details').its('status').should('eq', 400)
          cy.get('@details').then((response) => {
              expect(response.body).to.have.property('success', false)
              expect(response.body).to.have.property('message', 'Invalid request')
              expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
              //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
        })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        });
})


it("should test account number must be 7 digits", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName ,
          bank_code: jpWithdrawalValidCreds.bankCode ,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          account: jpWithdrawalInvCreds.sixDigitAccount,
          name: jpWithdrawalValidCreds.name,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          callback_url: jpay_stage.beeceptorUrlAyaka,
          signature: signatureSha256,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
          cy.get('@details').its('status').should('eq', 400)
          cy.get('@details').then((response) => {
              expect(response.body).to.have.property('success', false)
              expect(response.body).to.have.property('message', 'Invalid request')
              expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
              //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
        })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        });
})


it("should test amount should not be greater  than 15000000", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName ,
          bank_code: jpWithdrawalValidCreds.bankCode ,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          account: jpWithdrawalValidCreds.account,
          name: jpWithdrawalValidCreds.name,
          amount: jpWithdrawalInvCreds.aboveTenMillAmout,
          callback_url: jpay_stage.beeceptorUrlAyaka,
          signature: signatureSha256,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
          cy.get('@details').its('status').should('eq', 400)
          cy.get('@details').then((response) => {
              expect(response.body).to.have.property('success', false)
              expect(response.body).to.have.property('message', 'Invalid request')
              expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
              //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
          })
          cy.get('@details').then((response) => {
          cy.log(JSON.stringify(response.body))
          });
})


it("should test less than one thousand", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName ,
          bank_code: jpWithdrawalValidCreds.bankCode ,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          account: jpWithdrawalValidCreds.account,
          name: jpWithdrawalValidCreds.name,
          amount: jpWithdrawalValidCreds.lessOneThouAmount,
          callback_url: jpay_stage.beeceptorUrlAyaka,
          signature: signatureSha256,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
          cy.get('@details').its('status').should('eq', 400)
          cy.get('@details').then((response) => {
              expect(response.body).to.have.property('success', false)
              expect(response.body).to.have.property('message', 'Invalid request')
              expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
              //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
          })
          cy.get('@details').then((response) => {
          cy.log(JSON.stringify(response.body))
          });
})


it("should test invalid signature", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName ,
          bank_code: jpWithdrawalValidCreds.bankCode ,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          account: jpWithdrawalValidCreds.account,
          name: jpWithdrawalValidCreds.name,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          callback_url: jpay_stage.beeceptorUrlAyaka,
          signature: jpWithdrawalInvCreds.invalidSignature,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
        cy.get('@details').its('status').should('eq', 400)
        cy.get('@details').then((response) => {
            expect(response.body).to.have.property('success', false)
            expect(response.body).to.have.property('message', 'Invalid Signature')
            expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-003')
            //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
        })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        });
})


it("should test signature must be unique", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName ,
          bank_code: jpWithdrawalValidCreds.bankCode ,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          account: jpWithdrawalValidCreds.account,
          name: jpWithdrawalValidCreds.name,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          callback_url: jpay_stage.beeceptorUrlAyaka,
          signature: signatureSha256,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
        cy.get('@details').its('status').should('eq', 400)
        cy.get('@details').then((response) => {
            expect(response.body).to.have.property('success', false)
            expect(response.body).to.have.property('message', 'Signature already exist, signature must be unique')
            expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-004')
            //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
        })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        });
})


it("should test merchant not found", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: jpWithdrawalInvCreds.invalidMerchantNumber,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName ,
          bank_code: jpWithdrawalValidCreds.bankCode ,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          account: jpWithdrawalValidCreds.account,
          name: jpWithdrawalValidCreds.name,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          callback_url: jpay_stage.beeceptorUrlAyaka,
          signature: signatureSha256,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
        cy.get('@details').its('status').should('eq', 404)
        cy.get('@details').then((response) => {
            expect(response.body).to.have.property('success', false)
            expect(response.body).to.have.property('message', 'Merchant not found')
            expect(response.body).to.have.property('code', 'E-GLOBAL-002')
            //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
        })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        });
})


it("should test different branch name", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName ,
          bank_code: jpWithdrawalValidCreds.bankCode ,
          branch_name: jpWithdrawalInvCreds.diffBranchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          account: jpWithdrawalValidCreds.account,
          name: jpWithdrawalValidCreds.name,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          callback_url: jpay_stage.beeceptorUrlAyaka,
          signature: signatureSha2562,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
        cy.get('@details').its('status').should('eq', 400)
        cy.get('@details').then((response) => {
            expect(response.body).to.have.property('success', false)
            expect(response.body).to.have.property('message', 'Branch Name and Branch Code do not match.')
            expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-014')
            //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
        })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        });
})


it("should test different branch code", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName ,
          bank_code: jpWithdrawalValidCreds.bankCode ,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalInvCreds.diffBranchCode,
          account: jpWithdrawalValidCreds.account,
          name: jpWithdrawalValidCreds.name,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          callback_url: jpay_stage.beeceptorUrlAyaka,
          signature: signatureSha2562,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
        cy.get('@details').its('status').should('eq', 400)
        cy.get('@details').then((response) => {
            let res = response.body
            let att1 = res.id
            cy.log(att1)
            expect(response.body).to.have.property('success', false)
            expect(response.body).to.have.property('message', 'Branch Name and Branch Code do not match.')
            expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-014')
            //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
        })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        });
})


it("should test different bank name", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalInvCreds.diffBankName ,
          bank_code: jpWithdrawalValidCreds.bankCode ,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          account: jpWithdrawalValidCreds.account,
          name: jpWithdrawalValidCreds.name,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          callback_url: jpay_stage.beeceptorUrlAyaka,
          signature: signatureSha2562,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
        cy.get('@details').its('status').should('eq', 400)
        cy.get('@details').then((response) => {
            let res = response.body
            let att1 = res.id
            cy.log(att1)
            expect(response.body).to.have.property('success', false)
            expect(response.body).to.have.property('message', 'Bank Name and Bank Code do not match.')
            expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-013')
            //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
        })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        });
})


it("should test different bank code", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName ,
          bank_code: jpWithdrawalInvCreds.diffBankCode ,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          account: jpWithdrawalValidCreds.account,
          name: jpWithdrawalValidCreds.name,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          callback_url: jpay_stage.beeceptorUrlAyaka,
          signature: signatureSha2562,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
        cy.get('@details').its('status').should('eq', 400)
        cy.get('@details').then((response) => {
            let res = response.body
            let att1 = res.id
            cy.log(att1)
            expect(response.body).to.have.property('success', false)
            expect(response.body).to.have.property('message', 'Bank Name and Bank Code do not match.')
            expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-013')
            //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
        })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        });
})

})