import 'cypress-plugin-api'
import { hash } from './sha256Generator'
import { jpay_stage } from '../stringHolders/apiEndpoint'
import { generateString } from '../stringHolders/randomStringGenerator'
import { jpWithdrawalValidCreds, jpWithdrawalInvCreds } from "../stringHolders/jpayCredentials"


//jpwithdrawal api credentials
let jpWithdrawalUrlEndpoint = jpay_stage.jpWithdrawalAuto
let merchantTransactionNumber = generateString(10)
let merchantTransactionNumber2 = generateString(11)
let merchantTransactionNumber3 = generateString(12)
let sig = jpWithdrawalValidCreds.stgKazMerchantID + merchantTransactionNumber + jpWithdrawalValidCreds.stgKazAccNum + jpWithdrawalValidCreds.stgKazEmailAdd + jpWithdrawalValidCreds.withdrawalAmount + "JP_WITHDRAWAL_REQUEST"
let sig2 = jpWithdrawalValidCreds.stgKazMerchantID + merchantTransactionNumber2 + jpWithdrawalValidCreds.stgKazAccNum + jpWithdrawalValidCreds.stgKazEmailAdd + jpWithdrawalValidCreds.withdrawalAmount + "JP_WITHDRAWAL_REQUEST"
let sig3 = jpWithdrawalValidCreds.stgKazMerchantID + merchantTransactionNumber3 + jpWithdrawalValidCreds.stgKazAccNum + jpWithdrawalValidCreds.stgKazEmailAdd + jpWithdrawalValidCreds.withdrawalAmount + "JP_WITHDRAWAL_REQUEST"
let signatureSha256 = hash(sig)
let signatureSha2562 = hash(sig2)
let signatureSha2563 = hash(sig3)


export const jpWithdrawalAuto = () => {
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
            account: jpWithdrawalValidCreds.account,
            name: jpWithdrawalValidCreds.name,
            amount: jpWithdrawalValidCreds.withdrawalAmount,
            callback_url: jpay_stage.beeceptorUrlAyaka,
            signature: signatureSha256,
            status: 'active'
        },
    })
}

export const jpWithdrawalAuto2 = () => {
    return cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
            'Content-type': 'application/json'
        },
        body: {
            merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
            merchant_transaction_number: merchantTransactionNumber2,
            bank_name: jpWithdrawalValidCreds.bankName,
            bank_code: jpWithdrawalValidCreds.bankCode,
            branch_name: jpWithdrawalValidCreds.branchName,
            branch_code: jpWithdrawalValidCreds.branchCode,
            account: jpWithdrawalValidCreds.account,
            name: jpWithdrawalValidCreds.name,
            amount: jpWithdrawalValidCreds.withdrawalAmount,
            callback_url: jpay_stage.beeceptorUrlAyaka,
            signature: signatureSha2562,
            status: 'active'
        },
    })
}



