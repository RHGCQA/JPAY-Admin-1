import LoginTest from "../pages/loginPages"
import { date_today } from "../stringHolders/dateGenerator"
import { generateString } from "../stringHolders/randomStringGenerator"
import { invalidloginCredentials, validloginCredentials } from "../stringHolders/loginCredentials"
import JPDepositTest from "../pages/jpDeposit"
import { JPDepositInvalidCredentials, JPDepositValidCredentials} from "../stringHolders/jpDepositCredentials"
import { JPDepositSuccessMessage } from "../stringHolders/successMessage"
import { jpDepositErrorMessage } from "../stringHolders/errorMessage"

 const jpDeposit = new JPDepositTest()
 const login = new LoginTest()
  let emailAddress = validloginCredentials.stageEmailAddress
  let merchantName = JPDepositValidCredentials.stageValidMerchantName
  let password = validloginCredentials.stagePassword
  let dateToday = date_today()
  let transactionNumber = generateString(15);
  let paymentIDJPY = dateToday + transactionNumber + 'JPY'
  let paymentIDJPY2 = dateToday + transactionNumber + 'JPY2'
  let paymentIDUSD= dateToday + transactionNumber + 'USD'
  let paymentIDPHP = dateToday + transactionNumber + 'PHP'
  let paymentIDGBP = dateToday + transactionNumber + 'GBP'
  let paymentIDEUR = dateToday + transactionNumber + 'EUR'
  let paymentIDInvalid = dateToday + transactionNumber + 'JPY' + 'invalid'
  let accountNumber = JPDepositValidCredentials.stageValidAccountNumber
  let invalidAccountNumber = JPDepositInvalidCredentials.stageInvalidAccountNumber
  let transferID = JPDepositValidCredentials.stageValidTransferID
  let uid = JPDepositValidCredentials.stageValidUID
  let amount = JPDepositValidCredentials.stageValidAmount
  let jpy = JPDepositValidCredentials.stageJPYCurrency
  let usd = JPDepositValidCredentials.stageUSDCurrency
  let gbp = JPDepositValidCredentials.stageGBPCurrency
  let eur = JPDepositValidCredentials.stageEURCurrency
  let php = JPDepositValidCredentials.stagePHPCurrency
  let paymentIDFilter = JPDepositValidCredentials.stageSearchPaymentID
  let txnNumberFilter = JPDepositValidCredentials.stageSearchTxnNumber
  let merchantNumberFilter = JPDepositValidCredentials.stageSearchMerchantNumber
  let merchantNameFilter = JPDepositValidCredentials.stageSearchMerchantName
  let UIDFilter = JPDepositValidCredentials.stageSearchUID
  let transferIDFilter = JPDepositValidCredentials.stageSearchTransferID
  let merchantTXNFilter = JPDepositValidCredentials.stageSearchMerchantTXN
  let adminNotes = JPDepositValidCredentials.stageAdminNotes
  let successMessage = JPDepositSuccessMessage.successJPDeposit
  let duplicatePaymentID = jpDepositErrorMessage.jpDepositDuplicatePaymentID
  let missingAccountNumberErrorMessage = jpDepositErrorMessage.jpDepositMissingAccountNumber
  let missingAmountErrorMessage = jpDepositErrorMessage.jpDepositMissingAmount
  let missingPaymentIDErrorMessage = jpDepositErrorMessage.jpDepositMissingPaymentID
  let missingTransferIDErrorMessage = jpDepositErrorMessage.jpDepositMissingTransferID
  let missingUIDErrorMessage = jpDepositErrorMessage.jpDepositMissingUID
  let missingReceivingCurrencyErrorMessage = jpDepositErrorMessage.jpDepositMissingReceivingCurrency
  let missingAdminNotesErrorMessage = jpDepositErrorMessage.jpDepositMissingAdminNote
  let merchantNotFoundErrorMessageCard = jpDepositErrorMessage.jpDepositMerchantNotFoundCard
  let merchantNotFoundErrorMessageAddNew = jpDepositErrorMessage.jpDepositMerchantNotFoundAddNewButton
  let merchantInvalidTransferID = jpDepositErrorMessage.jpDepositInvalidTransferIDError
  let invalidTransferID = JPDepositInvalidCredentials.stageInvalidTransferID
  let merchantInvalidUID = jpDepositErrorMessage.jpDepositInvalidUIDError
  let invalidUID = JPDepositInvalidCredentials.stageInvalidUID
  let completedFilter = JPDepositValidCredentials.stageCompletedStatus
  let forConfirmationFilter = JPDepositValidCredentials.stageForConfirmationStatus
  let yesCallbackFilter = JPDepositValidCredentials.stageYesCallbackStatus
  let noCallbackFilter = JPDepositValidCredentials.stageNoCallbackStatus
  let manualAPIFilter = JPDepositValidCredentials.stageManualAPIType
  let autoAPIFilter = JPDepositValidCredentials.stageAutoAPIType

 
 describe("Go to Site", () => {
   beforeEach(() => {
     login.visit()

    })
     
   it("should create JP Deposit JPY Currency", () => {
      login.getEmailAddressField().type(emailAddress)
      login.getPasswordField().type(password)
      login.getloginButton().click()
      jpDeposit.getFiatTransactions().click()
      jpDeposit.getJPDeposit().click()
      jpDeposit.getJPDepositTransactions().click()
      jpDeposit.getAddNewJPDepositButton().click()
      jpDeposit.getAccountNumberField().type(accountNumber)
      jpDeposit.getTransferIDField().type(transferID)
      jpDeposit.getUIDField().type(uid)
      jpDeposit.getAmountField().type(amount)
      jpDeposit.getPaymentIDField().type(paymentIDJPY)
      jpDeposit.getReceivingCurrencyDropdown().select(jpy).should('have.value', jpy)
      jpDeposit.getAdminNotedField().type(adminNotes)
      jpDeposit.getSaveJPDepositButton().click()
      jpDeposit.getSuccessMessageToast().contains(successMessage)
      jpDeposit.getJPDepositCard().contains(paymentIDJPY)
  })

    it("should create JP Deposit USD Currency", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getAddNewJPDepositButton().click()
        jpDeposit.getAccountNumberField().type(accountNumber)
        jpDeposit.getTransferIDField().type(transferID)
        jpDeposit.getUIDField().type(uid)
        jpDeposit.getAmountField().type(amount)
        jpDeposit.getPaymentIDField().type(paymentIDUSD)
        jpDeposit.getReceivingCurrencyDropdown().select(usd).should('have.value', usd)
        jpDeposit.getAdminNotedField().type(adminNotes)
        jpDeposit.getSaveJPDepositButton().click()
        jpDeposit.getSuccessMessageToast().contains(successMessage)
        jpDeposit.getJPDepositCard().contains(paymentIDUSD)
    })

    it("should create JP Deposit GBP Currency", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getAddNewJPDepositButton().click()
        jpDeposit.getAccountNumberField().type(accountNumber)
        jpDeposit.getTransferIDField().type(transferID)
        jpDeposit.getUIDField().type(uid)
        jpDeposit.getAmountField().type(amount)
        jpDeposit.getPaymentIDField().type(paymentIDGBP)
        jpDeposit.getReceivingCurrencyDropdown().select(gbp).should('have.value', gbp)
        jpDeposit.getAdminNotedField().type(adminNotes)
        jpDeposit.getSaveJPDepositButton().click()
        jpDeposit.getSuccessMessageToast().contains(successMessage)
        jpDeposit.getJPDepositCard().contains(paymentIDGBP)
    })

    it("should create JP Deposit PHP Currency", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getAddNewJPDepositButton().click()
        jpDeposit.getAccountNumberField().type(accountNumber)
        jpDeposit.getTransferIDField().type(transferID)
        jpDeposit.getUIDField().type(uid)
        jpDeposit.getAmountField().type(amount)
        jpDeposit.getPaymentIDField().type(paymentIDPHP)
        jpDeposit.getReceivingCurrencyDropdown().select(php).should('have.value', php)
        jpDeposit.getAdminNotedField().type(adminNotes)
        jpDeposit.getSaveJPDepositButton().click()
        jpDeposit.getSuccessMessageToast().contains(successMessage)
        jpDeposit.getJPDepositCard().contains(paymentIDPHP)
    })

    it("should create JP Deposit EUR Currency", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getAddNewJPDepositButton().click()
        jpDeposit.getAccountNumberField().type(accountNumber)
        jpDeposit.getTransferIDField().type(transferID)
        jpDeposit.getUIDField().type(uid)
        jpDeposit.getAmountField().type(amount)
        jpDeposit.getPaymentIDField().type(paymentIDEUR)
        jpDeposit.getReceivingCurrencyDropdown().select(eur).should('have.value', eur)
        jpDeposit.getAdminNotedField().type(adminNotes)
        jpDeposit.getSaveJPDepositButton().click()
        jpDeposit.getSuccessMessageToast().contains(successMessage)
        jpDeposit.getJPDepositCard().contains(paymentIDEUR)
    })

    it("should create JP Deposit with duplicate payment ID", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getAddNewJPDepositButton().click()
        jpDeposit.getAccountNumberField().type(accountNumber)
        jpDeposit.getTransferIDField().type(transferID)
        jpDeposit.getUIDField().type(uid)
        jpDeposit.getAmountField().type(amount)
        jpDeposit.getPaymentIDField().type(paymentIDEUR)
        jpDeposit.getReceivingCurrencyDropdown().select(eur).should('have.value', eur)
        jpDeposit.getAdminNotedField().type(adminNotes)
        jpDeposit.getSaveJPDepositButton().click()
        jpDeposit.getJPDepositDuplicateErrorMessage().contains(duplicatePaymentID)
    })

    it("should create JP Deposit with missing account number", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getAddNewJPDepositButton().click()
        //jpDeposit.getAccountNumberField().type(accountNumber)
        jpDeposit.getTransferIDField().type(transferID)
        jpDeposit.getUIDField().type(uid)
        jpDeposit.getAmountField().type(amount)
        jpDeposit.getPaymentIDField().type(paymentIDInvalid)
        jpDeposit.getReceivingCurrencyDropdown().select(jpy).should('have.value', jpy)
        jpDeposit.getAdminNotedField().type(adminNotes)
        jpDeposit.getSaveJPDepositButton().click()
        jpDeposit.getJPDepositMissingAccountNumber().contains(missingAccountNumberErrorMessage)
    })

    it("should create JP Deposit with missing amount", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getAddNewJPDepositButton().click()
        jpDeposit.getAccountNumberField().type(accountNumber)
        jpDeposit.getTransferIDField().type(transferID)
        jpDeposit.getUIDField().type(uid)
        //jpDeposit.getAmountField().type(amount)
        jpDeposit.getPaymentIDField().type(paymentIDInvalid)
        jpDeposit.getReceivingCurrencyDropdown().select(jpy).should('have.value', jpy)
        jpDeposit.getAdminNotedField().type(adminNotes)
        jpDeposit.getSaveJPDepositButton().click()
        jpDeposit.getJPDepositMissingAmount().contains(missingAmountErrorMessage)
    })

    it("should create JP Deposit with missing payment ID", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getAddNewJPDepositButton().click()
        jpDeposit.getAccountNumberField().type(accountNumber)
        jpDeposit.getTransferIDField().type(transferID)
        jpDeposit.getUIDField().type(uid)
        jpDeposit.getAmountField().type(amount)
        //jpDeposit.getPaymentIDField().type(paymentIDInvalid)
        jpDeposit.getReceivingCurrencyDropdown().select(jpy).should('have.value', jpy)
        jpDeposit.getAdminNotedField().type(adminNotes)
        jpDeposit.getSaveJPDepositButton().click()
        jpDeposit.getJPDepositMissingPaymentID().contains(missingPaymentIDErrorMessage)
    })

    it("should create JP Deposit with missing transfer ID", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getAddNewJPDepositButton().click()
        jpDeposit.getAccountNumberField().type(accountNumber)
        //jpDeposit.getTransferIDField().type(transferID)
        jpDeposit.getUIDField().type(uid)
        jpDeposit.getAmountField().type(amount)
        jpDeposit.getPaymentIDField().type(paymentIDInvalid)
        jpDeposit.getReceivingCurrencyDropdown().select(jpy).should('have.value', jpy)
        jpDeposit.getAdminNotedField().type(adminNotes)
        jpDeposit.getSaveJPDepositButton().click()
        jpDeposit.getJPDepositMissingTransferID().contains(missingTransferIDErrorMessage)
    })

    it("should create JP Deposit with missing UID", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getAddNewJPDepositButton().click()
        jpDeposit.getAccountNumberField().type(accountNumber)
        jpDeposit.getTransferIDField().type(transferID)
        //jpDeposit.getUIDField().type(uid)
        jpDeposit.getAmountField().type(amount)
        jpDeposit.getPaymentIDField().type(paymentIDInvalid)
        jpDeposit.getReceivingCurrencyDropdown().select(jpy).should('have.value', jpy)
        jpDeposit.getAdminNotedField().type(adminNotes)
        jpDeposit.getSaveJPDepositButton().click()
        jpDeposit.getJPDepositMissingUID().contains(missingUIDErrorMessage)
    })

    it("should create JP Deposit with missing receiving currency", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getAddNewJPDepositButton().click()
        jpDeposit.getAccountNumberField().type(accountNumber)
        jpDeposit.getTransferIDField().type(transferID)
        jpDeposit.getUIDField().type(uid)
        jpDeposit.getAmountField().type(amount)
        jpDeposit.getPaymentIDField().type(paymentIDInvalid)
        //jpDeposit.getReceivingCurrencyDropdown().select(jpy).should('have.value', jpy)
        jpDeposit.getAdminNotedField().type(adminNotes)
        jpDeposit.getSaveJPDepositButton().click()
        jpDeposit.getJPDepositMissingReceivingCurrency().contains(missingReceivingCurrencyErrorMessage)
    })

    it("should create JP Deposit with missing admin notes", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getAddNewJPDepositButton().click()
        jpDeposit.getAccountNumberField().type(accountNumber)
        jpDeposit.getTransferIDField().type(transferID)
        jpDeposit.getUIDField().type(uid)
        jpDeposit.getAmountField().type(amount)
        jpDeposit.getPaymentIDField().type(paymentIDInvalid)
        jpDeposit.getReceivingCurrencyDropdown().select(jpy).should('have.value', jpy)
        //jpDeposit.getAdminNotedField().type(adminNotes)
        jpDeposit.getSaveJPDepositButton().click()
        jpDeposit.getJPDepositMissingAdminNotes().contains(missingAdminNotesErrorMessage)
    })

    it("should create JP Deposit with missing all fields", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getAddNewJPDepositButton().click()
        jpDeposit.getSaveJPDepositButton().click()
        jpDeposit.getJPDepositMissingAccountNumber().contains(missingAccountNumberErrorMessage)
        jpDeposit.getJPDepositMissingAmount().contains(missingAmountErrorMessage)
        jpDeposit.getJPDepositMissingPaymentID().contains(missingPaymentIDErrorMessage)
        jpDeposit.getJPDepositMissingTransferID().contains(missingTransferIDErrorMessage)
        jpDeposit.getJPDepositMissingReceivingCurrency().contains(missingReceivingCurrencyErrorMessage)
        jpDeposit.getJPDepositMissingUID().contains(missingUIDErrorMessage)
        jpDeposit.getJPDepositMissingAdminNotes().contains(missingAdminNotesErrorMessage)
    })

    it("should create JP Deposit with invalid account number add new searching", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getAddNewJPDepositButton().click()
        jpDeposit.getAccountNumberField().type(invalidAccountNumber)
        jpDeposit.getJPDepositAddNewCard().click()
        jpDeposit.getJPDepositMerchantNotFoundErrorMessageCard().contains(merchantNotFoundErrorMessageCard)
    })

    it("should create JP Deposit with invalid account number add new saving", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getAddNewJPDepositButton().click()
        jpDeposit.getTransferIDField().type(transferID)
        jpDeposit.getUIDField().type(uid)
        jpDeposit.getAmountField().type(amount)
        jpDeposit.getPaymentIDField().type(paymentIDInvalid)
        jpDeposit.getReceivingCurrencyDropdown().select(jpy).should('have.value', jpy)
        jpDeposit.getAdminNotedField().type(adminNotes)
        jpDeposit.getAccountNumberField().type(invalidAccountNumber)
        jpDeposit.getJPDepositAddNewCard().click()
        jpDeposit.getJPDepositMerchantNotFoundErrorMessageCard().contains(merchantNotFoundErrorMessageCard)
        jpDeposit.getJPDepositMerchantNotFoundErrorMessageOkButton().click()
        jpDeposit.getSaveJPDepositButton().click()
        jpDeposit.getJPDepositMerchantNotFoundErrorMessageAddNewButton().contains(merchantNotFoundErrorMessageAddNew)
    })

    it("should create JP Deposit with invalid transfer ID", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getAddNewJPDepositButton().click()
        jpDeposit.getTransferIDField().type(invalidTransferID)
        jpDeposit.getUIDField().type(uid)
        jpDeposit.getAmountField().type(amount)
        jpDeposit.getPaymentIDField().type(paymentIDInvalid)
        jpDeposit.getReceivingCurrencyDropdown().select(jpy).should('have.value', jpy)
        jpDeposit.getAdminNotedField().type(adminNotes)
        jpDeposit.getAccountNumberField().type(accountNumber)
        jpDeposit.getSaveJPDepositButton().click()
        jpDeposit.getJPDepositTransferIDErrorMessage().contains(merchantInvalidTransferID)
    })

    it("should create JP Deposit with invalid UID", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getAddNewJPDepositButton().click()
        jpDeposit.getTransferIDField().type(transferID)
        jpDeposit.getUIDField().type(invalidUID)
        jpDeposit.getAmountField().type(amount)
        jpDeposit.getPaymentIDField().type(paymentIDInvalid)
        jpDeposit.getReceivingCurrencyDropdown().select(jpy).should('have.value', jpy)
        jpDeposit.getAdminNotedField().type(adminNotes)
        jpDeposit.getAccountNumberField().type(accountNumber)
        jpDeposit.getSaveJPDepositButton().click()
        jpDeposit.getJPDepositUIDErrorMessage().contains(merchantInvalidUID)
    })

    it("should create JP Deposit with invalid UID", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getAddNewJPDepositButton().click()
        jpDeposit.getTransferIDField().type(transferID)
        jpDeposit.getUIDField().type(invalidUID)
        jpDeposit.getAmountField().type(amount)
        jpDeposit.getPaymentIDField().type(paymentIDInvalid)
        jpDeposit.getReceivingCurrencyDropdown().select(jpy).should('have.value', jpy)
        jpDeposit.getAdminNotedField().type(adminNotes)
        jpDeposit.getAccountNumberField().type(accountNumber)
        jpDeposit.getSaveJPDepositButton().click()
        jpDeposit.getJPDepositUIDErrorMessage().contains(merchantInvalidUID)
    })

    it("should create JP Deposit JPY Currency and Lift to Completed", () => {
      login.getEmailAddressField().type(emailAddress)
      login.getPasswordField().type(password)
      login.getloginButton().click()
      jpDeposit.getFiatTransactions().click()
      jpDeposit.getJPDeposit().click()
      jpDeposit.getJPDepositTransactions().click()
      jpDeposit.getAddNewJPDepositButton().click()
      jpDeposit.getAccountNumberField().type(accountNumber)
      jpDeposit.getTransferIDField().type(transferID)
      jpDeposit.getUIDField().type(uid)
      jpDeposit.getAmountField().type(amount)
      jpDeposit.getPaymentIDField().type(paymentIDJPY2)
      jpDeposit.getReceivingCurrencyDropdown().select(jpy).should('have.value', jpy)
      jpDeposit.getAdminNotedField().type(adminNotes)
      jpDeposit.getSaveJPDepositButton().click()
      jpDeposit.getSuccessMessageToast().contains(successMessage)
      jpDeposit.getJPDepositCard().contains(paymentIDJPY2)
      jpDeposit.getJPDepositShowFilterMenu().click()
      jpDeposit.getJPDepositSearchFilter().select(paymentIDFilter).should('have.value', paymentIDFilter )
      jpDeposit.getJPDepositSearchFilterField().type(paymentIDJPY2)
      jpDeposit.getJPDepositFilterButton().click()
      jpDeposit.getJPDepositSelectAllCheckbox().click()
      jpDeposit.getJPDepositUpdateAllToCompletedButton().click()
      jpDeposit.getJPDepositYesConfirmationButton().click()
    })

    it("should filter using Transaction Number", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getJPDepositShowFilterMenu().click()
        jpDeposit.getJPDepositSearchFilter().select(paymentIDFilter).should('have.value', paymentIDFilter)
        jpDeposit.getJPDepositSearchFilterField().type(paymentIDJPY2)
        jpDeposit.getJPDepositFilterButton().click()
        jpDeposit.getJPDepositCard().contains(paymentIDJPY2)
        jpDeposit.getJPDepositTransactionNumberonList().first().then($txnNumber => {
            let jpDepTxnNumber = $txnNumber.text()
            cy.log(jpDepTxnNumber)
            cy.wrap(jpDepTxnNumber).as('jpDepTxnNumber')
        })
        jpDeposit.getJPDepositResetButton().click()
        cy.get('@jpDepTxnNumber').then(jpDepTxnNumber => { cy.log(jpDepTxnNumber)
        jpDeposit.getJPDepositSearchFilter().select(txnNumberFilter).should('have.value', txnNumberFilter )
        jpDeposit.getJPDepositSearchFilterField().type(jpDepTxnNumber)
        jpDeposit.getJPDepositFilterButton().click()
        jpDeposit.getJPDepositCard().contains(jpDepTxnNumber)
        })
    })

    it("should filter using Merchant Number", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getJPDepositShowFilterMenu().click()
        jpDeposit.getJPDepositSearchFilter().select(merchantNumberFilter).should('have.value', merchantNumberFilter)
        jpDeposit.getJPDepositSearchFilterField().type(accountNumber)
        jpDeposit.getJPDepositFilterButton().click()
        jpDeposit.getJPDepositCard().contains(accountNumber)
        cy.wait(1000)
        jpDeposit.getJPDepositLastPageButton().click()
        cy.wait(1000)
        jpDeposit.getJPDepositCard().contains(accountNumber)
    })

    it("should filter using Merchant Name", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getJPDepositShowFilterMenu().click()
        jpDeposit.getJPDepositSearchFilter().select(merchantNameFilter).should('have.value', merchantNameFilter)
        jpDeposit.getJPDepositSearchFilterField().type(merchantName)
        jpDeposit.getJPDepositFilterButton().click()
        jpDeposit.getJPDepositCard().contains(merchantName)
        cy.wait(1000)
        jpDeposit.getJPDepositLastPageButton().click()
        cy.wait(1000)
        jpDeposit.getJPDepositCard().contains(merchantName)
    })

    it("should filter using UID", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getJPDepositShowFilterMenu().click()
        jpDeposit.getJPDepositSearchFilter().select(UIDFilter).should('have.value', UIDFilter)
        jpDeposit.getJPDepositSearchFilterField().type(uid)
        jpDeposit.getJPDepositFilterButton().click()
        jpDeposit.getJPDepositCard().contains(uid)
        cy.wait(1000)
        jpDeposit.getJPDepositLastPageButton().click()
        cy.wait(1000)
        jpDeposit.getJPDepositCard().contains(uid)
    })

    it("should filter using Transfer ID", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getJPDepositShowFilterMenu().click()
        jpDeposit.getJPDepositSearchFilter().select(transferIDFilter).should('have.value', transferIDFilter)
        jpDeposit.getJPDepositSearchFilterField().type(transferID)
        jpDeposit.getJPDepositFilterButton().click()
        jpDeposit.getJPDepositCard().contains(transferID)
        cy.wait(1000)
        jpDeposit.getJPDepositLastPageButton().click()
        cy.wait(1000)
        jpDeposit.getJPDepositCard().contains(transferID)
    })

    it("should filter using Completed Filter", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getJPDepositShowFilterMenu().click()
        jpDeposit.getJPDepositStatusFilter().select(completedFilter).should('have.value', completedFilter)
        jpDeposit.getJPDepositFilterButton().click()
        jpDeposit.getJPDepositCard().contains(completedFilter)
        cy.wait(1000)
        jpDeposit.getJPDepositLastPageButton().click()
        cy.wait(1000)
        jpDeposit.getJPDepositCard().contains(completedFilter)
    })

    it("should filter using Yes Callback Filter", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getJPDepositShowFilterMenu().click()
        jpDeposit.getCallbackStatusFilter().select(yesCallbackFilter).should('have.value', 1)
        jpDeposit.getJPDepositFilterButton().click()
        jpDeposit.getJPDepositCard().contains(yesCallbackFilter)
        cy.wait(1000)
        jpDeposit.getJPDepositLastPageButton().click()
        cy.wait(1000)
        jpDeposit.getJPDepositCard().contains(1)
    })

    it("should filter using No Callback Filter", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getJPDepositShowFilterMenu().click()
        jpDeposit.getCallbackStatusFilter().select(noCallbackFilter).should('have.value', 0)
        jpDeposit.getJPDepositFilterButton().click()
        jpDeposit.getJPDepositCard().contains(noCallbackFilter)
        cy.wait(1000)
        jpDeposit.getJPDepositLastPageButton().click()
        cy.wait(1000)
        jpDeposit.getJPDepositCard().contains(0)
    })

    it("should filter using Manual API Type Filter", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getJPDepositShowFilterMenu().click()
        jpDeposit.getAPITypeFilter().select(manualAPIFilter).should('have.value', manualAPIFilter)
        jpDeposit.getJPDepositFilterButton().click()
        jpDeposit.getJPDepositCard().contains("Manual")
        cy.wait(1000)
        jpDeposit.getJPDepositLastPageButton().click()
        cy.wait(1000)
        jpDeposit.getJPDepositCard().contains("Manual")
    })

    it("should filter using Auto API Type Filter", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getJPDepositShowFilterMenu().click()
        jpDeposit.getAPITypeFilter().select(autoAPIFilter).should('have.value', autoAPIFilter)
        jpDeposit.getJPDepositFilterButton().click()
        jpDeposit.getJPDepositCard().contains("Auto")
        cy.wait(1000)
        jpDeposit.getJPDepositLastPageButton().click()
        cy.wait(1000)
        jpDeposit.getJPDepositCard().contains("Auto")
    })

    it("should filter using Date From Filter", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getJPDepositShowFilterMenu().click()
        jpDeposit.getDateFromFilter().type(dateToday)
        jpDeposit.getJPDepositFilterButton().click()
    })

    it("should filter using Date To Filter", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getJPDepositShowFilterMenu().click()
        jpDeposit.getDateToFilter().type(dateToday)
        jpDeposit.getJPDepositFilterButton().click()
    })

    it("should filter using Date From and To Filter", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getJPDepositShowFilterMenu().click()
        jpDeposit.getDateFromFilter().type(dateToday)
        jpDeposit.getDateToFilter().type(dateToday)
        jpDeposit.getJPDepositFilterButton().click()
    })

    it("should filter using Processed Date From Filter", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getJPDepositShowFilterMenu().click()
        jpDeposit.getProcessedDateFromFilter().type(dateToday)
        jpDeposit.getJPDepositFilterButton().click()
    })

    it("should filter using Processed Date To Filter", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getJPDepositShowFilterMenu().click()
        jpDeposit.getProcessedDateToFilter().type(dateToday)
        jpDeposit.getJPDepositFilterButton().click()
    })

    it("should filter using Processed Date From and To Filter", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        jpDeposit.getFiatTransactions().click()
        jpDeposit.getJPDeposit().click()
        jpDeposit.getJPDepositTransactions().click()
        jpDeposit.getJPDepositShowFilterMenu().click()
        jpDeposit.getProcessedDateFromFilter().type(dateToday)
        jpDeposit.getProcessedDateToFilter().type(dateToday)
        jpDeposit.getJPDepositFilterButton().click()
    })


  




})