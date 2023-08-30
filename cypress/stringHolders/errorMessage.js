import { JPDepositInvalidCredentials, JPDepositValidCredentials } from "./jpDepositCredentials";

let invalidTransferID = JPDepositInvalidCredentials.stageInvalidTransferID
let validUID = JPDepositValidCredentials.stageValidUID
let validTransferID = JPDepositValidCredentials.stageValidTransferID
let invalidUID = JPDepositInvalidCredentials.stageInvalidUID

var loginErrorMessage = {
    invalidPasswordorEmail: "E-USER-001 - Invalid username or password"
}
var jpDepositErrorMessage = {
    jpDepositDuplicatePaymentID: "E-DEPOSIT-008 - Duplicate payment id",
    jpDepositMissingAccountNumber: "Account Number is required",
    jpDepositMissingAmount: "Amount should be greater than zero.",
    jpDepositMissingPaymentID: "Payment ID is required",
    jpDepositMissingTransferID: "Transfer ID is required",
    jpDepositMissingUID: "UID is required",
    jpDepositMissingAdminNote: "Admin Note is required",
    jpDepositMissingReceivingCurrency: "Receiving Currency is required",
    jpDepositMerchantNotFoundCard: "E-MERCHANT-404 - Merchant not found.",
    jpDepositMerchantNotFoundAddNewButton: "E-DEPOSIT-010 - Merchant not found.",
    jpDepositInvalidTransferIDError: "E-DEPOSIT-500 - Transfer ID not found " + invalidTransferID + " UID: " + validUID,
    jpDepositInvalidUIDError: "E-DEPOSIT-500 - Transfer ID not found " + validTransferID + " UID: " + invalidUID,
}

var manualDepositErrorMessage = {
    manualDepositInvalidAccountNumber: "E-MERCHANT-404 - Merchant not found."

}

module.exports = {loginErrorMessage , jpDepositErrorMessage, manualDepositErrorMessage };