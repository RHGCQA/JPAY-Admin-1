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
let merchantTransactionNumber4 = generateString(10)
let merchantTransactionNumber5 = generateString(11)
let merchantTransactionNumber6 = generateString(12)
let merchantTransactionNumber7 = generateString(12)
let merchantTransactionNumber8 = generateString(12)
let merchantTransactionNumber9 = generateString(12)
let merchantTransactionNumber10 = generateString(12)
let merchantTransactionNumber11 = generateString(12)
let merchantTransactionNumber12 = generateString(12)
let sig = jpWithdrawalValidCreds.stgKazMerchantID + merchantTransactionNumber + jpWithdrawalValidCreds.stgKazAccNum + jpWithdrawalValidCreds.stgKazEmailAdd + jpWithdrawalValidCreds.withdrawalAmount + "JP_WITHDRAWAL_REQUEST"
let sig2 = jpWithdrawalValidCreds.stgKazMerchantID + merchantTransactionNumber2 + jpWithdrawalValidCreds.stgKazAccNum + jpWithdrawalValidCreds.stgKazEmailAdd + jpWithdrawalValidCreds.withdrawalAmount + "JP_WITHDRAWAL_REQUEST"
let sig3 = jpWithdrawalValidCreds.stgKazMerchantID + merchantTransactionNumber3 + jpWithdrawalValidCreds.stgKazAccNum + jpWithdrawalValidCreds.stgKazEmailAdd + jpWithdrawalValidCreds.withdrawalAmount + "JP_WITHDRAWAL_REQUEST"
let sig4 = jpWithdrawalValidCreds.stgKazMerchantID + merchantTransactionNumber4 + jpWithdrawalValidCreds.stgKazAccNum + jpWithdrawalValidCreds.stgKazEmailAdd + jpWithdrawalValidCreds.withdrawalAmount + "JP_WITHDRAWAL_REQUEST"
let sig5 = jpWithdrawalValidCreds.stgKazMerchantID + merchantTransactionNumber5 + jpWithdrawalValidCreds.stgKazAccNum + jpWithdrawalValidCreds.stgKazEmailAdd + jpWithdrawalValidCreds.withdrawalAmount + "JP_WITHDRAWAL_REQUEST"
let sig6 = jpWithdrawalValidCreds.stgKazMerchantID + merchantTransactionNumber6 + jpWithdrawalValidCreds.stgKazAccNum + jpWithdrawalValidCreds.stgKazEmailAdd + jpWithdrawalValidCreds.withdrawalAmount + "JP_WITHDRAWAL_REQUEST"
let sig7 = jpWithdrawalValidCreds.stgKazMerchantID + merchantTransactionNumber7 + jpWithdrawalValidCreds.stgKazAccNum + jpWithdrawalValidCreds.stgKazEmailAdd + jpWithdrawalValidCreds.withdrawalAmount + "JP_WITHDRAWAL_REQUEST"
let sig8 = jpWithdrawalValidCreds.stgKazMerchantID + merchantTransactionNumber8 + jpWithdrawalValidCreds.stgKazAccNum + jpWithdrawalValidCreds.stgKazEmailAdd + jpWithdrawalValidCreds.withdrawalAmount + "JP_WITHDRAWAL_REQUEST"
let sig9 = jpWithdrawalValidCreds.stgKazMerchantID + merchantTransactionNumber9 + jpWithdrawalValidCreds.stgKazAccNum + jpWithdrawalValidCreds.stgKazEmailAdd + jpWithdrawalValidCreds.withdrawalAmount + "JP_WITHDRAWAL_REQUEST"
let sig10 = jpWithdrawalValidCreds.stgKazMerchantID + merchantTransactionNumber10 + jpWithdrawalValidCreds.stgKazAccNum + jpWithdrawalValidCreds.stgKazEmailAdd + jpWithdrawalValidCreds.withdrawalAmount + "JP_WITHDRAWAL_REQUEST"
let sig11 = jpWithdrawalValidCreds.stgKazMerchantID + merchantTransactionNumber11 + jpWithdrawalValidCreds.stgKazAccNum + jpWithdrawalValidCreds.stgKazEmailAdd + jpWithdrawalValidCreds.withdrawalAmount + "JP_WITHDRAWAL_REQUEST"
let sig12 = jpWithdrawalValidCreds.stgKazMerchantID + merchantTransactionNumber12 + jpWithdrawalValidCreds.stgKazAccNum + jpWithdrawalValidCreds.stgKazEmailAdd + jpWithdrawalValidCreds.withdrawalAmount + "JP_WITHDRAWAL_REQUEST"
let signatureSha256 = hash(sig)
let signatureSha2562 = hash(sig2)
let signatureSha2563 = hash(sig3)
let signatureSha2564 = hash(sig4)
let signatureSha2565 = hash(sig5)
let signatureSha2566 = hash(sig6)
let signatureSha2567 = hash(sig7)
let signatureSha2568 = hash(sig8)
let signatureSha2569 = hash(sig9)
let signatureSha25610 = hash(sig10)
let signatureSha25611 = hash(sig11)
let signatureSha25612 = hash(sig12)


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

export const jpWithdrawalAuto3 = () => {
    return cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
            'Content-type': 'application/json'
        },
        body: {
            merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
            merchant_transaction_number: merchantTransactionNumber3,
            bank_name: jpWithdrawalValidCreds.bankName,
            bank_code: jpWithdrawalValidCreds.bankCode,
            branch_name: jpWithdrawalValidCreds.branchName,
            branch_code: jpWithdrawalValidCreds.branchCode,
            account: jpWithdrawalValidCreds.account,
            name: jpWithdrawalValidCreds.name,
            amount: jpWithdrawalValidCreds.withdrawalAmount,
            callback_url: jpay_stage.beeceptorUrlAyaka,
            signature: signatureSha2563,
            status: 'active'
        },
    })
}

export const jpWithdrawalAuto4 = () => {
    return cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
            'Content-type': 'application/json'
        },
        body: {
            merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
            merchant_transaction_number: merchantTransactionNumber4,
            bank_name: jpWithdrawalValidCreds.bankName,
            bank_code: jpWithdrawalValidCreds.bankCode,
            branch_name: jpWithdrawalValidCreds.branchName,
            branch_code: jpWithdrawalValidCreds.branchCode,
            account: jpWithdrawalValidCreds.account,
            name: jpWithdrawalValidCreds.name,
            amount: jpWithdrawalValidCreds.withdrawalAmount,
            callback_url: jpay_stage.beeceptorUrlAyaka,
            signature: signatureSha2564,
            status: 'active'
        },
    })
}

export const jpWithdrawalAuto5 = () => {
    return cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
            'Content-type': 'application/json'
        },
        body: {
            merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
            merchant_transaction_number: merchantTransactionNumber5,
            bank_name: jpWithdrawalValidCreds.bankName,
            bank_code: jpWithdrawalValidCreds.bankCode,
            branch_name: jpWithdrawalValidCreds.branchName,
            branch_code: jpWithdrawalValidCreds.branchCode,
            account: jpWithdrawalValidCreds.account,
            name: jpWithdrawalValidCreds.name,
            amount: jpWithdrawalValidCreds.withdrawalAmount,
            callback_url: jpay_stage.beeceptorUrlAyaka,
            signature: signatureSha2565,
            status: 'active'
        },
    })
}

export const jpWithdrawalAuto6 = () => {
    return cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
            'Content-type': 'application/json'
        },
        body: {
            merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
            merchant_transaction_number: merchantTransactionNumber6,
            bank_name: jpWithdrawalValidCreds.bankName,
            bank_code: jpWithdrawalValidCreds.bankCode,
            branch_name: jpWithdrawalValidCreds.branchName,
            branch_code: jpWithdrawalValidCreds.branchCode,
            account: jpWithdrawalValidCreds.account,
            name: jpWithdrawalValidCreds.name,
            amount: jpWithdrawalValidCreds.withdrawalAmount,
            callback_url: jpay_stage.beeceptorUrlAyaka,
            signature: signatureSha2566,
            status: 'active'
        },
    })
}

export const jpWithdrawalAuto7 = () => {
    return cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
            'Content-type': 'application/json'
        },
        body: {
            merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
            merchant_transaction_number: merchantTransactionNumber7,
            bank_name: jpWithdrawalValidCreds.bankName,
            bank_code: jpWithdrawalValidCreds.bankCode,
            branch_name: jpWithdrawalValidCreds.branchName,
            branch_code: jpWithdrawalValidCreds.branchCode,
            account: jpWithdrawalValidCreds.account,
            name: jpWithdrawalValidCreds.name,
            amount: jpWithdrawalValidCreds.withdrawalAmount,
            callback_url: jpay_stage.beeceptorUrlAyaka,
            signature: signatureSha2567,
            status: 'active'
        },
    })
}

export const jpWithdrawalAuto8 = () => {
    return cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
            'Content-type': 'application/json'
        },
        body: {
            merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
            merchant_transaction_number: merchantTransactionNumber8,
            bank_name: jpWithdrawalValidCreds.bankName,
            bank_code: jpWithdrawalValidCreds.bankCode,
            branch_name: jpWithdrawalValidCreds.branchName,
            branch_code: jpWithdrawalValidCreds.branchCode,
            account: jpWithdrawalValidCreds.account,
            name: jpWithdrawalValidCreds.name,
            amount: jpWithdrawalValidCreds.withdrawalAmount,
            callback_url: jpay_stage.beeceptorUrlAyaka,
            signature: signatureSha2568,
            status: 'active'
        },
    })
}

export const jpWithdrawalAuto9 = () => {
    return cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
            'Content-type': 'application/json'
        },
        body: {
            merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
            merchant_transaction_number: merchantTransactionNumber9,
            bank_name: jpWithdrawalValidCreds.bankName,
            bank_code: jpWithdrawalValidCreds.bankCode,
            branch_name: jpWithdrawalValidCreds.branchName,
            branch_code: jpWithdrawalValidCreds.branchCode,
            account: jpWithdrawalValidCreds.account,
            name: jpWithdrawalValidCreds.name,
            amount: jpWithdrawalValidCreds.withdrawalAmount,
            callback_url: jpay_stage.beeceptorUrlAyaka,
            signature: signatureSha2569,
            status: 'active'
        },
    })
}

export const jpWithdrawalAuto10 = () => {
    return cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
            'Content-type': 'application/json'
        },
        body: {
            merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
            merchant_transaction_number: merchantTransactionNumber10,
            bank_name: jpWithdrawalValidCreds.bankName,
            bank_code: jpWithdrawalValidCreds.bankCode,
            branch_name: jpWithdrawalValidCreds.branchName,
            branch_code: jpWithdrawalValidCreds.branchCode,
            account: jpWithdrawalValidCreds.account,
            name: jpWithdrawalValidCreds.name,
            amount: jpWithdrawalValidCreds.withdrawalAmount,
            callback_url: jpay_stage.beeceptorUrlAyaka,
            signature: signatureSha25610,
            status: 'active'
        },
    })
}

export const jpWithdrawalAuto11 = () => {
    return cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
            'Content-type': 'application/json'
        },
        body: {
            merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
            merchant_transaction_number: merchantTransactionNumber11,
            bank_name: jpWithdrawalValidCreds.bankName,
            bank_code: jpWithdrawalValidCreds.bankCode,
            branch_name: jpWithdrawalValidCreds.branchName,
            branch_code: jpWithdrawalValidCreds.branchCode,
            account: jpWithdrawalValidCreds.account,
            name: jpWithdrawalValidCreds.name,
            amount: jpWithdrawalValidCreds.withdrawalAmount,
            callback_url: jpay_stage.beeceptorUrlAyaka,
            signature: signatureSha25611,
            status: 'active'
        },
    })
}

export const jpWithdrawalAuto12 = () => {
    return cy.request({
        method: 'POST',
        url: jpWithdrawalUrlEndpoint,
        headers: {
            'Content-type': 'application/json'
        },
        body: {
            merchant_number: jpWithdrawalValidCreds.stgKazAccNum,
            merchant_transaction_number: merchantTransactionNumber12,
            bank_name: jpWithdrawalValidCreds.bankName,
            bank_code: jpWithdrawalValidCreds.bankCode,
            branch_name: jpWithdrawalValidCreds.branchName,
            branch_code: jpWithdrawalValidCreds.branchCode,
            account: jpWithdrawalValidCreds.account,
            name: jpWithdrawalValidCreds.name,
            amount: jpWithdrawalValidCreds.withdrawalAmount,
            callback_url: jpay_stage.beeceptorUrlAyaka,
            signature: signatureSha25612,
            status: 'active'
        },
    })
}







