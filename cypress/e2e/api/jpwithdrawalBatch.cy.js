import 'cypress-plugin-api'
import { hash } from '../../functions/sha256Generator'
import { jpay_stage } from '../../stringHolders/apiEndpoint'
import { generateString } from '../../stringHolders/randomStringGenerator'
import {jpWithdrawalValidCreds, jpWithdrawalInvCreds} from "../../stringHolders/credentials"


let jpWithdrawalUrlEndpoint = jpay_stage.jpWithdrawalBatch
let merchantTransactionNumber = generateString(10)
let merchantTransactionNumber2 = generateString(11)
let sig = jpWithdrawalValidCreds.stgKazMerchantID + merchantTransactionNumber + jpWithdrawalValidCreds.stgKazAccNum + jpWithdrawalValidCreds.stgKazEmailAdd +  "WITHDRAWAL_REQUEST"
//let sig2 = merchantID + merchantTransactionNumber2 + accountID + emailAddress + payLoadType
let signatureSha256 = hash(sig)



describe('JPAY TESTING', () => {

it("should Create JP Withdrawal", () => {
    cy.request({
      method: 'POST',
      url: jpWithdrawalUrlEndpoint,
      headers: {
        'Content-type': 'application/json'
      },
      body:{
        merchant_number:jpWithdrawalValidCreds.stgKazAccNum,
        merchant_transaction_number: merchantTransactionNumber,
        bank_name: jpWithdrawalValidCreds.bankName,
        bank_code: jpWithdrawalValidCreds.bankCode,
        branch_name: jpWithdrawalValidCreds.branchName,
        branch_code: jpWithdrawalValidCreds.branchCode,
        account_number: jpWithdrawalValidCreds.accountNumber,
        account_holder_katakana: jpWithdrawalValidCreds.accountHolderKatakana,
        account_holder_kanji: jpWithdrawalValidCreds.accountHolderKanji,
        amount: jpWithdrawalValidCreds.withdrawalAmount,
        signature: signatureSha256,
        callback_url: jpay_stage.beeceptorUrlKazuha,
        status: 'active'
      },
    }).as('details')
        cy.get('@details').its('status').should('eq', 200)
        cy.get('@details').then((response) => {
        })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        });
})


it("should require merchant transaction number", () => {
    cy.request({
      method: 'POST',
      url: jpWithdrawalUrlEndpoint,
      headers: {
        'Content-type': 'application/json'
      },
      body:{
        merchant_number:jpWithdrawalValidCreds.stgKazAccNum,
        //merchant_transaction_number: merchantTransactionNumber,
        bank_name: jpWithdrawalValidCreds.bankName,
        bank_code: jpWithdrawalValidCreds.bankCode,
        branch_name: jpWithdrawalValidCreds.branchName,
        branch_code: jpWithdrawalValidCreds.branchCode,
        account_number: jpWithdrawalValidCreds.accountNumber,
        account_holder_katakana: jpWithdrawalValidCreds.accountHolderKatakana,
        account_holder_kanji: jpWithdrawalValidCreds.accountHolderKanji,
        amount: jpWithdrawalValidCreds.withdrawalAmount,
        signature: signatureSha256,
        callback_url: jpay_stage.beeceptorUrlKazuha,
        status: 'active'
      },
      failOnStatusCode: false
    }).as('details')
    cy.get('@details').its('status').should('eq', 400)
    cy.get('@details').then((response) => {
        expect(response.body).to.have.property('success', false)
        expect(response.body).to.have.property('message', 'Invalid request')
        expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
        let arraylength2= response.body.data.merchant_transaction_number.length
        expect(response.body.data.merchant_transaction_number.length).to.be.eq(arraylength2)
        for(let t=0 ;t<arraylength2; t++){
          expect(response.body.data.merchant_transaction_number[t]).to.eql("The merchant transaction number field is required.")
        }

    })
    cy.get('@details').then((response) => {
    cy.log(JSON.stringify(response.body))
        });
  })


it("should require bank name", () => {
    cy.request({
      method: 'POST',
      url: jpWithdrawalUrlEndpoint,
      headers: {
        'Content-type': 'application/json'
      },
      body:{
        merchant_number:jpWithdrawalValidCreds.stgKazAccNum,
        merchant_transaction_number: merchantTransactionNumber,
        //bank_name: jpWithdrawalValidCreds.bankName,
        bank_code: jpWithdrawalValidCreds.bankCode,
        branch_name: jpWithdrawalValidCreds.branchName,
        branch_code: jpWithdrawalValidCreds.branchCode,
        account_number: jpWithdrawalValidCreds.accountNumber,
        account_holder_katakana: jpWithdrawalValidCreds.accountHolderKatakana,
        account_holder_kanji: jpWithdrawalValidCreds.accountHolderKanji,
        amount: jpWithdrawalValidCreds.withdrawalAmount,
        signature: signatureSha256,
        callback_url: jpay_stage.beeceptorUrlKazuha,
        status: 'active'
      },
      failOnStatusCode: false
    }).as('details')
    cy.get('@details').its('status').should('eq', 400)
    cy.get('@details').then((response) => {
        expect(response.body).to.have.property('success', false)
        expect(response.body).to.have.property('message', 'Invalid request')
        expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')

        let arraylength2= response.body.data.bank_name.length
        expect(response.body.data.bank_name.length).to.be.eq(arraylength2)
        for(let t=0 ;t<arraylength2; t++){
          expect(response.body.data.bank_name[t]).to.eql("The bank name field is required.")
        }
      })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
      });
})


it("should require bank code", () => {
    cy.request({
      method: 'POST',
      url: jpWithdrawalUrlEndpoint,
      headers: {
        'Content-type': 'application/json'
      },
      body:{
        merchant_number:jpWithdrawalValidCreds.stgKazAccNum,
        merchant_transaction_number: merchantTransactionNumber,
        bank_name: jpWithdrawalValidCreds.bankName,
        //bank_code: jpWithdrawalValidCreds.bankCode,
        branch_name: jpWithdrawalValidCreds.branchName,
        branch_code: jpWithdrawalValidCreds.branchCode,
        account_number: jpWithdrawalValidCreds.accountNumber,
        account_holder_katakana: jpWithdrawalValidCreds.accountHolderKatakana,
        account_holder_kanji: jpWithdrawalValidCreds.accountHolderKanji,
        amount: jpWithdrawalValidCreds.withdrawalAmount,
        signature: signatureSha256,
        callback_url: jpay_stage.beeceptorUrlKazuha,
        status: 'active'
      },
      failOnStatusCode: false
    }).as('details')
    cy.get('@details').its('status').should('eq', 400)
    cy.get('@details').then((response) => {
        expect(response.body).to.have.property('success', false)
        expect(response.body).to.have.property('message', 'Invalid request')
        expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')

        let arraylength2= response.body.data.bank_code.length
        expect(response.body.data.bank_code.length).to.be.eq(arraylength2)
        for(let t=0 ;t<arraylength2; t++){
          expect(response.body.data.bank_code[t]).to.eql("The bank code field is required.")
        }
        })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        });
})


it("should require branch name", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number:jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName,
          bank_code: jpWithdrawalValidCreds.bankCode,
          //branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          account_number: jpWithdrawalValidCreds.accountNumber,
          account_holder_katakana: jpWithdrawalValidCreds.accountHolderKatakana,
          account_holder_kanji: jpWithdrawalValidCreds.accountHolderKanji,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          signature: signatureSha256,
          callback_url: jpay_stage.beeceptorUrlKazuha,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')

          let arraylength2= response.body.data.branch_name.length
          expect(response.body.data.branch_name.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.branch_name[t]).to.eql("The branch name field is required.")
          }
        })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        });
})


it("should require account number", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number:jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName,
          bank_code: jpWithdrawalValidCreds.bankCode,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          //account_number: jpWithdrawalValidCreds.accountNumber,
          account_holder_katakana: jpWithdrawalValidCreds.accountHolderKatakana,
          account_holder_kanji: jpWithdrawalValidCreds.accountHolderKanji,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          signature: signatureSha256,
          callback_url: jpay_stage.beeceptorUrlKazuha,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
          let arraylength2= response.body.data.account_number.length
          expect(response.body.data.account_number.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
          expect(response.body.data.account_number[t]).to.eql("The account number field is required.")
          }
        })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        });
})


it("should require account holder katakana", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number:jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName,
          bank_code: jpWithdrawalValidCreds.bankCode,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          account_number: jpWithdrawalValidCreds.accountNumber,
          //account_holder_katakana: jpWithdrawalValidCreds.accountHolderKatakana,
          account_holder_kanji: jpWithdrawalValidCreds.accountHolderKanji,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          signature: signatureSha256,
          callback_url: jpay_stage.beeceptorUrlKazuha,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
          let arraylength2= response.body.data.account_holder_katakana.length
          expect(response.body.data.account_holder_katakana.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.account_holder_katakana[t]).to.eql("The account holder katakana field is required.")
          }
      })
      cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
      });
})


it("should require account holder kanji", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number:jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName,
          bank_code: jpWithdrawalValidCreds.bankCode,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          account_number: jpWithdrawalValidCreds.accountNumber,
          account_holder_katakana: jpWithdrawalValidCreds.accountHolderKatakana,
          //account_holder_kanji: jpWithdrawalValidCreds.accountHolderKanji,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          signature: signatureSha256,
          callback_url: jpay_stage.beeceptorUrlKazuha,
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
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')

          let arraylength2= response.body.data.account_holder_kanji.length
          expect(response.body.data.account_holder_kanji.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.account_holder_kanji[t]).to.eql("The account holder kanji field is required.")
          }
      })
      cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
          });
})


it("should require withdrawal amount", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number:jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName,
          bank_code: jpWithdrawalValidCreds.bankCode,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          account_number: jpWithdrawalValidCreds.accountNumber,
          account_holder_katakana: jpWithdrawalValidCreds.accountHolderKatakana,
          account_holder_kanji: jpWithdrawalValidCreds.accountHolderKanji,
          //amount: jpWithdrawalValidCreds.withdrawalAmount,
          signature: signatureSha256,
          callback_url: jpay_stage.beeceptorUrlKazuha,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
          let arraylength2= response.body.data.amount.length
          expect(response.body.data.amount.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.amount[t]).to.eql("The amount field is required.")
          }
      })
      cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
      });
})


it("should require signature", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number:jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName,
          bank_code: jpWithdrawalValidCreds.bankCode,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          account_number: jpWithdrawalValidCreds.accountNumber,
          account_holder_katakana: jpWithdrawalValidCreds.accountHolderKatakana,
          account_holder_kanji: jpWithdrawalValidCreds.accountHolderKanji,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          //signature: signatureSha256,
          callback_url: jpay_stage.beeceptorUrlKazuha,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
          let arraylength2= response.body.data.signature.length
          expect(response.body.data.signature.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.signature[t]).to.eql("The signature field is required.")
          }
        })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        });
})


it("should have 3 digits branch code", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number:jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName,
          bank_code: jpWithdrawalValidCreds.bankCode,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalInvCreds.twoDigitBranchCode,
          account_number: jpWithdrawalValidCreds.accountNumber,
          account_holder_katakana: jpWithdrawalValidCreds.accountHolderKatakana,
          account_holder_kanji: jpWithdrawalValidCreds.accountHolderKanji,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          signature: signatureSha256,
          callback_url: jpay_stage.beeceptorUrlKazuha,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
          let arraylength2= response.body.data.branch_code.length
          expect(response.body.data.branch_code.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.branch_code[t]).to.eql("The branch code must be 3 digits.")
          }
        })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        });
})

it("should have 4 digits bank code", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number:jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName,
          bank_code: jpWithdrawalInvCreds.threeDigitBankCode,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalValidCreds.branchCode,
          account_number: jpWithdrawalValidCreds.accountNumber,
          account_holder_katakana: jpWithdrawalValidCreds.accountHolderKatakana,
          account_holder_kanji: jpWithdrawalValidCreds.accountHolderKanji,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          signature: signatureSha256,
          callback_url: jpay_stage.beeceptorUrlKazuha,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {

          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
          let arraylength2= response.body.data.bank_code.length
          expect(response.body.data.bank_code.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.bank_code[t]).to.eql("The bank code must be 4 digits.")
          }
        })
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        });
})


it("should have 7 digits account number", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number:jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName,
          bank_code: jpWithdrawalInvCreds.threeDigitBankCode,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalInvCreds.twoDigitBranchCode,
          account_number: jpWithdrawalInvCreds.sixDigitAccount,
          account_holder_katakana: jpWithdrawalValidCreds.accountHolderKatakana,
          account_holder_kanji: jpWithdrawalValidCreds.accountHolderKanji,
          amount: jpWithdrawalValidCreds.withdrawalAmount,
          signature: signatureSha256,
          callback_url: jpay_stage.beeceptorUrlKazuha,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {

          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
          let arraylength2= response.body.data.account_number.length
          expect(response.body.data.account_number.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.account_number[t]).to.eql("The account number must be 7 digits")
          }
          })
          cy.get('@details').then((response) => {
          cy.log(JSON.stringify(response.body))
          });
})


it("should have amount not greater than 15000000", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number:jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName,
          bank_code: jpWithdrawalInvCreds.threeDigitBankCode,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalInvCreds.twoDigitBranchCode,
          account_number: jpWithdrawalInvCreds.sixDigitAccount,
          account_holder_katakana: jpWithdrawalValidCreds.accountHolderKatakana,
          account_holder_kanji: jpWithdrawalValidCreds.accountHolderKanji,
          amount: jpWithdrawalInvCreds.aboveFifteenMillAmount,
          signature: signatureSha256,
          callback_url: jpay_stage.beeceptorUrlKazuha,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
          let arraylength2= response.body.data.amount.length
          expect(response.body.data.amount.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.amount[t]).to.eql("Amount should not be greater than 15,000,000")
          }
        })  
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
        });
})


it("should have amount not less than 1", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number:jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName,
          bank_code: jpWithdrawalInvCreds.threeDigitBankCode,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalInvCreds.twoDigitBranchCode,
          account_number: jpWithdrawalInvCreds.sixDigitAccount,
          account_holder_katakana: jpWithdrawalValidCreds.accountHolderKatakana,
          account_holder_kanji: jpWithdrawalValidCreds.accountHolderKanji,
          amount: jpWithdrawalInvCreds.lessOneAmount,
          signature: signatureSha256,
          callback_url: jpay_stage.beeceptorUrlKazuha,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
          let arraylength2= response.body.data.amount.length
          expect(response.body.data.amount.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.amount[t]).to.eql("Amount should not be less than 1,000.")
          }
      })
      cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
      });
})

it("should have negative value result", () => {
      cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number:jpWithdrawalValidCreds.stgKazAccNum,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: jpWithdrawalValidCreds.bankName,
          bank_code: jpWithdrawalInvCreds.threeDigitBankCode,
          branch_name: jpWithdrawalValidCreds.branchName,
          branch_code: jpWithdrawalInvCreds.twoDigitBranchCode,
          account_number: jpWithdrawalInvCreds.sixDigitAccount,
          account_holder_katakana: jpWithdrawalValidCreds.accountHolderKatakana,
          account_holder_kanji: jpWithdrawalValidCreds.accountHolderKanji,
          amount: jpWithdrawalInvCreds.negativeValue,
          signature: signatureSha256,
          callback_url: jpay_stage.beeceptorUrlKazuha,
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
          expect(response.body).to.have.property('message', 'Result will generate a negative value')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-005')
      })
      cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
          });
})


})