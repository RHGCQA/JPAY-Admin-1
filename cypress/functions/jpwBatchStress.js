import 'cypress-plugin-api'
import { hash } from './sha256Generator'
import { jpay_stage } from '../stringHolders/apiEndpoint'
import { generateString } from '../stringHolders/randomStringGenerator'
import { jpWithdrawalValidCreds } from "../stringHolders/jpayCredentials"

function jpWithdrawalBatchStrs() {

    let jpWithdrawalUrlEndpoint = jpay_stage.jpWithdrawalBatch
    let merchantTransactionNumber = generateString(10)
    let sig = jpWithdrawalValidCreds.stgKazMerchantID + merchantTransactionNumber + jpWithdrawalValidCreds.stgKazAccNum + jpWithdrawalValidCreds.stgKazEmailAdd + "WITHDRAWAL_REQUEST"
    let signatureSha256 = hash(sig)

    return cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
            'Content-type': 'application/json'
        },
        body: {
            merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
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
    })
}
module.exports = jpWithdrawalBatchStrs;



