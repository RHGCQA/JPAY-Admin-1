var manualDepositValidCredentials = {
    stageValidAccountNumber: "8840451493",
    stageValidMerchantName: "Kazuha Kadehara",
    stageBankName: "Sample Data",
    stageMerchantNotes: "Sample Data",
    stageAdminNotes: "Sample Data",
    stageValidAmount: Math.floor((Math.random(1000) * 99999) + 1),
    stageJPYCurrency: "JPY",
    stageUSDCurrency: "USD",
    stageEURCurrency: "EUR",
    stagePHPCurrency: "PHP",
    stageGBPCurrency: "GBP",
    stageSearchTxnNumber: "transaction_number",
    stageSearchMerchantNumber: "merchant_number",
    stageSearchMerchantName: "merchant_name",
    stageSearchBankName: "bank_name",
    }

var manualDepositInvalidCredentials = {
    stageInvalidAccountNumber: "8840451493Invalid",
    stageValidMerchantName: "Kazuha Kadehara",
    stageBankName: "Sample Data",
    stageMerchantNotes: "Sample Data",
    stageAdminNotes: "Sample Data",
    stageValidAmount: Math.floor((Math.random(1000) * 99999) + 1),
    stageJPYCurrency: "JPY",
    stageUSDCurrency: "USD",
    stageEURCurrency: "EUR",
    stagePHPCurrency: "PHP",
    stageGBPCurrency: "GBP",
    }

module.exports = {manualDepositValidCredentials, manualDepositInvalidCredentials }

