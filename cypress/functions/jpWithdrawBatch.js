import 'cypress-plugin-api'
import { hash } from './sha256Generator'
import { jpay_stage } from '../stringHolders/apiEndpoint'
import { generateString } from '../stringHolders/randomStringGenerator'
import { jpWithdrawalValidCreds, jpWithdrawalInvCreds } from "../stringHolders/jpayCredentials"


//jpwithdrawal api credentials
let jpWithdrawalUrlEndpoint = jpay_stage.jpWithdrawalBatch
let merchantTransactionNumber = generateString(10)
let merchantTransactionNumber2 = generateString(11)
let merchantTransactionNumber3 = generateString(12)
let sig = jpWithdrawalValidCreds.stgKazMerchantID + merchantTransactionNumber + jpWithdrawalValidCreds.stgKazAccNum + jpWithdrawalValidCreds.stgKazEmailAdd + "WITHDRAWAL_REQUEST"
let sig2 = jpWithdrawalValidCreds.stgKazMerchantID + merchantTransactionNumber2 + jpWithdrawalValidCreds.stgKazAccNum + jpWithdrawalValidCreds.stgKazEmailAdd + "WITHDRAWAL_REQUEST"
let sig3 = jpWithdrawalValidCreds.stgKazMerchantID + merchantTransactionNumber3 + jpWithdrawalValidCreds.stgKazAccNum + jpWithdrawalValidCreds.stgKazEmailAdd + "WITHDRAWAL_REQUEST"
let signatureSha256 = hash(sig)
let signatureSha2562 = hash(sig2)
let signatureSha2563 = hash(sig3)


export const jpWithdrawalBatch = () => {
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


export const jpWithdrawalBatch2 = () => {
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
      account_number: jpWithdrawalValidCreds.accountNumber,
      account_holder_katakana: jpWithdrawalValidCreds.accountHolderKatakana,
      account_holder_kanji: jpWithdrawalValidCreds.accountHolderKanji,
      amount: jpWithdrawalValidCreds.withdrawalAmount,
      signature: signatureSha2562,
      callback_url: jpay_stage.beeceptorUrlKazuha,
      status: 'active'
    },
  })
}


export const jpWithdrawalBatch3 = () => {
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
      account_number: jpWithdrawalValidCreds.accountNumber,
      account_holder_katakana: jpWithdrawalValidCreds.accountHolderKatakana,
      account_holder_kanji: jpWithdrawalValidCreds.accountHolderKanji,
      amount: jpWithdrawalValidCreds.withdrawalAmount,
      signature: signatureSha2563,
      callback_url: jpay_stage.beeceptorUrlKazuha,
      status: 'active'
    },
  })
}



