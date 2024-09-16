var manualWithdrawalValidCredentials = {
    stageValidAccountNumber: "8840451493",
    stageValidMerchantName: "Kazuha Kadehara",
    bankName: "Sample Data",
    message: "Sample Data",
    adminNotes: "Sample Data",
    validAmount: Math.floor((Math.random(1000) * 999) + 1),
    JPYDebitCurrency: "2344",
    USDDebitCurrency: "2385",
    EURDebitCurrency: "2390",
    PHPDebitCurrency: "2389",
    GBPDebitCurrency: "2388",
    JPYCurrency: "JPY",
    USDCurrency: "USD",
    EURCurrency: "EUR",
    PHPCurrency: "PHP",
    GBPCurrency: "GBP",
    SearchTxnNumber: "transaction_number",
    SearchMerchantNumber: "merchant_number",
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