import { generateString } from '../stringHolders/randomStringGenerator'

let merchantTxnNumber = "JPW" + generateString(10)


var JPDepositValidCredentials = {
    stagevalidSID: "509999232",
    stageValidAccountNumber: "8840451493",
    stageValidMerchantName: "kazuha_1291121",
    stageValidTransferID: "2624319",
    stageValidUID: "test_kazuha_0001",
    stageAdminNotes: "Sample Data",
    validAmount: Math.floor((Math.random(1000) * 99999) + 1),
    JPYCurrency: "JPY",
    USDCurrency: "USD",
    EURCurrency: "EUR",
    PHPCurrency: "PHP",
    GBPCurrency: "GBP",
    stageSearchPaymentID: "payment_id",
    stageSearchTxnNumber: "transaction_number",
    stageSearchMerchantNumber: "merchant_number",
    stageSearchMerchantName: "merchant_name",
    stageSearchUID: "uid",
    stageSearchTransferID: "transfer_id",
    stageSearchMerchantTXN: "merchant_transaction_number",
    stageCompletedStatus: "completed",
    stageForConfirmationStatus: "for confirmation",
    stageYesCallbackStatus: "Yes",
    stageNoCallbackStatus: "No",
    stageManualAPIType: "manual",
    stageAutoAPIType: "auto"
}
var JPDepositInvalidCredentials = {
    invalidAccountNumber: "8840451493INVALID",
    invalidTransferID: "2624319INVALID",
    invalidUID: "test_kazuha_0001INVALID",
    emptyUID: '',
    emptyTransferID: '',
    emptyPaymentID: '',
    emptyAmount: '',
}

var JPWithdrawalValidCredentials = {
    stageAccountNumber: "8840451493",
    stageValidMerchantName: "Kazuha Kadehara",
    merchantID: "CRA378942",
    accountID: "8840451493",
    ayakaEmailAddress: "aya@mailinator.com",
    kazuhaEmailAddress: "kazuha@mailinator.com",
    withdrawalAmount: "10000",
    payloadType: "WITHDRAWAL_REQUEST",
    merchantNumber: "8840451493",
    bankName: "みずほ銀行",
    bankCode: "0001",
    branchName: "函館支店",
    branchCode: "735",
    accountNumber: "1134687",
    accountHolderKatakana: "カ）グローバルフィード",
    accountHolderKanji: "カ）グローバルフィード",
    merchantTxnNumber: merchantTxnNumber,
}

var JPWithdrawalInvalidCredentials = {
    invalidSignature: "09757fc63b6e3002cdecc37c3c9b5ff309039504f157735b60ff43e467c14ec",
    usedSignature: "f09757fc63b6e3002cdecc37c3c9b5ff309039504f157735b60ff43e467c14ec",
    threeDigitBankCode: "111",
    twoDigitBranchCode: "11",
    diffBranchCode: "111",
    diffBankCode: "2222",
    diffBranchName: "函館",
    diffBankName: "みず",
    sixDigitAccount: "123456",
    aboveFifteenMillAmount: "20000000",
    lessOneAmount: "0",
    invalidMerchantNumber: "92919122",
    hiraganaName: "函館支店",
    negativeValue: "14000000"
}


module.exports =    {JPDepositValidCredentials,
                    JPDepositInvalidCredentials,
                    JPWithdrawalValidCredentials,
                    JPWithdrawalInvalidCredentials,
                    JPDepositValidCredentials};