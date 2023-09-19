var manualWithdrawalValidCredentials = {
    stageValidAccountNumber: "8840451493",
    stageValidMerchantName: "Kazuha Kadehara",
    stageBankName: "Sample Data",
    stageMessage: "Sample Data",
    stageAdminNotes: "Sample Data",
    stageValidAmount: Math.floor((Math.random(1000) * 99999) + 1),
    stageJPYDebitCurrency: "1426",
    stageUSDDebitCurrency: "1913",
    stageEURDebitCurrency: "1916",
    stagePHPDebitCurrency: "1914",
    stageGBPDebitCurrency: "1915",
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

    var manualWithdrawalInvalidCredentials = {
        stageInvalidAccountNumber: "8840451493Invalid",
        stageValidMerchantName: "Kazuha Kadehara",
        stageBankName: "Sample Data",
        stageMerchantNotes: "Sample Data",
        stageAdminNotes: "Sample Data",
        stageValidAmount: Math.floor((Math.random(1000) * 99999) + 1),
        }

 module.exports = {manualWithdrawalValidCredentials, manualWithdrawalInvalidCredentials }