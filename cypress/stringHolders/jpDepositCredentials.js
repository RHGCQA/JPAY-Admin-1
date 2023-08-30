var JPDepositValidCredentials = {
    stageValidAccountNumber: "8840451493",
    stageValidMerchantName: "Kazuha Kadehara",
    stageValidTransferID: "2624319",
    stageValidUID: "test_kazuha_0001",
    stageAdminNotes: "Sample Data",
    stageValidAmount: Math.floor((Math.random(1000) * 99999) + 1),
    stageJPYCurrency: "JPY",
    stageUSDCurrency: "USD",
    stageEURCurrency: "EUR",
    stagePHPCurrency: "PHP",
    stageGBPCurrency: "GBP",
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
    stageInvalidAccountNumber: "8840451493INVALID",
    stageInvalidTransferID: "2624319INVALID",
    stageInvalidUID: "test_kazuha_0001INVALID",
}

module.exports = {JPDepositValidCredentials,JPDepositInvalidCredentials};