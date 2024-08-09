
import { jpay_stage } from "../stringHolders/apiEndpoint"
import { JPWithdrawalValidCredentials } from "../stringHolders/credentials"
import { hash } from '../functions/sha256Generator'



class jpWithdraw {

    jpayWithdrawalBatch(){
        return cy.request({
            method: 'POST',
            url: jpay_stage.jpWithdrawalbatch,
            headers: {
              'Content-type': 'application/json'
            },
            body:{
                merchant_number: JPWithdrawalValidCredentials.merchantNumber,
                merchant_transaction_number: JPWithdrawalValidCredentials.merchantTransactionNumber,
                bank_name: JPWithdrawalValidCredentials.bankName ,
                bank_code: JPWithdrawalValidCredentials.bankCode ,
                branch_name: JPWithdrawalValidCredentials.branchName,
                branch_code: JPWithdrawalValidCredentials.branchCode,
                account_number: JPWithdrawalValidCredentials.accountNumber,
                account_holder_katakana: JPWithdrawalValidCredentials.accountHolderKatakana,
                account_holder_kanji: JPWithdrawalValidCredentials.accountHolderKanji,
                amount: JPWithdrawalValidCredentials.withdrawalAmount,
                signature: JPWithdrawalValidCredentials.signatureSha256,
                callback_url: JPWithdrawalValidCredentials.callbackUrl ,
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
              });
              //cy.wait(60000)
    }


}

module.exports = jpWithdraw