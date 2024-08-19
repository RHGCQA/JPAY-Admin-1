import LoginTest from "../../pages/loginPages"
import { date_today } from "../../stringHolders/dateGenerator"
import manualDepositTest from "../../pages/manualDepositPages"
import { validloginCredentials } from "../../stringHolders/loginCredentials"
import { manualDepositValidCredentials, manualDepositInvalidCredentials } from "../../stringHolders/manualDepositCredentials"
import { ManualDepositSuccessMessage } from "../../stringHolders/successMessage"
import {manualDepositErrorMessage} from "../../stringHolders/errorMessage"





const login = new LoginTest()
const deposit = new manualDepositTest()

  let emailAddress = validloginCredentials.stageEmailAddress
  let password = validloginCredentials.stagePassword
  let accountNumber = manualDepositValidCredentials.stageValidAccountNumber
  let merchantName = manualDepositValidCredentials.stageValidMerchantName
  let invalidAccountNumber = manualDepositInvalidCredentials.stageInvalidAccountNumber
  let jpy = manualDepositValidCredentials.stageJPYCurrency
  let usd = manualDepositValidCredentials.stageUSDCurrency
  let eur = manualDepositValidCredentials.stageEURCurrency
  let gbp = manualDepositValidCredentials.stageGBPCurrency
  let php = manualDepositValidCredentials.stagePHPCurrency
  let amount = manualDepositValidCredentials.stageValidAmount
  let bankName = manualDepositValidCredentials.stageBankName
  let merchantNotes = manualDepositValidCredentials.stageMerchantNotes
  let adminNotes = manualDepositValidCredentials.stageAdminNotes
  let addNewDepositSuccessMessage = ManualDepositSuccessMessage.successManualDeposit
  let invalidAccountErrorMessage = manualDepositErrorMessage.manualDepositInvalidAccountNumber
  let missingAccountNumberError = manualDepositErrorMessage.manualDepositMissingAccountNumber
  let missingCurrencyError = manualDepositErrorMessage.manualDepositMissingCurrency
  let missingAmountError = manualDepositErrorMessage.manualDepositMissingAmount
  let missingBankNameError = manualDepositErrorMessage.manualDepositMissingBankName
  let missingMerchantNotesError = manualDepositErrorMessage.manualDepositMissingMerchantNotes
  let missingAdminNotesError = manualDepositErrorMessage.manualDepositMissingAdminNotes
  let txnNumberFilter = manualDepositValidCredentials.stageSearchTxnNumber
  let merchantNumberFilter = manualDepositValidCredentials.stageSearchMerchantNumber
  let merchantNameFilter = manualDepositValidCredentials.stageSearchMerchantName
  let bankNameFilter = manualDepositValidCredentials.stageSearchBankName
  let dateToday = date_today()


describe("Go to Site", () => {
    beforeEach(() => {
      login.visit()
 
     })
      
    it("should create Manual Deposit JPY Currency", () => {
       login.getEmailAddressField().type(emailAddress)
       login.getPasswordField().type(password)
       login.getloginButton().click()
       deposit.getManualDepositFiat().click()
       deposit.getManualDepositPage().click()
       deposit.getAddNewManualDeposit().click({force : true})
       deposit.getManualDepositAccountNumberField().type(accountNumber)
       deposit.getManualDepositAddNewModal().click()
       deposit.getManualDepositCurrencyDropdown().select(jpy).should('have.value', jpy)
       deposit.getmanualDepositAmountField().type(amount)
       deposit.getManualDepositBankNameField().type(bankName)
       deposit.getManualDepositMerchantNotesField().type(merchantNotes)
       deposit.getManualDepositAdminNotes().type(adminNotes)
       deposit.getManualDepositSaveButton().click()
       deposit.getManualDepositAddNewSuccessMessage().contains(addNewDepositSuccessMessage)
   })

    it("should create Manual Deposit USD Currency", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getAddNewManualDeposit().click({force : true})
        deposit.getManualDepositAccountNumberField().type(accountNumber)
        deposit.getManualDepositAddNewModal().click()
        deposit.getManualDepositCurrencyDropdown().select(usd).should('have.value', usd)
        deposit.getmanualDepositAmountField().type(amount)
        deposit.getManualDepositBankNameField().type(bankName)
        deposit.getManualDepositMerchantNotesField().type(merchantNotes)
        deposit.getManualDepositAdminNotes().type(adminNotes)
        deposit.getManualDepositSaveButton().click()
        deposit.getManualDepositAddNewSuccessMessage().contains(addNewDepositSuccessMessage)
    })

    it("should create Manual Deposit EUR Currency", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getAddNewManualDeposit().click({force : true})
        deposit.getManualDepositAccountNumberField().type(accountNumber)
        deposit.getManualDepositAddNewModal().click()
        deposit.getManualDepositCurrencyDropdown().select(eur).should('have.value', eur)
        deposit.getmanualDepositAmountField().type(amount)
        deposit.getManualDepositBankNameField().type(bankName)
        deposit.getManualDepositMerchantNotesField().type(merchantNotes)
        deposit.getManualDepositAdminNotes().type(adminNotes)
        deposit.getManualDepositSaveButton().click()
        deposit.getManualDepositAddNewSuccessMessage().contains(addNewDepositSuccessMessage)
    })

    it("should create Manual Deposit PHP Currency", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getAddNewManualDeposit().click({force : true})
        deposit.getManualDepositAccountNumberField().type(accountNumber)
        deposit.getManualDepositAddNewModal().click()
        deposit.getManualDepositCurrencyDropdown().select(php).should('have.value', php)
        deposit.getmanualDepositAmountField().type(amount)
        deposit.getManualDepositBankNameField().type(bankName)
        deposit.getManualDepositMerchantNotesField().type(merchantNotes)
        deposit.getManualDepositAdminNotes().type(adminNotes)
        deposit.getManualDepositSaveButton().click()
        deposit.getManualDepositAddNewSuccessMessage().contains(addNewDepositSuccessMessage)
    })

    it("should create Manual Deposit GBP Currency", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getAddNewManualDeposit().click({force : true})
        deposit.getManualDepositAccountNumberField().type(accountNumber)
        deposit.getManualDepositAddNewModal().click()
        deposit.getManualDepositCurrencyDropdown().select(gbp).should('have.value', gbp)
        deposit.getmanualDepositAmountField().type(amount)
        deposit.getManualDepositBankNameField().type(bankName)
        deposit.getManualDepositMerchantNotesField().type(merchantNotes)
        deposit.getManualDepositAdminNotes().type(adminNotes)
        deposit.getManualDepositSaveButton().click()
        deposit.getManualDepositAddNewSuccessMessage().contains(addNewDepositSuccessMessage)
    })

    it("should create Manual Deposit GBP Currency", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getAddNewManualDeposit().click({force : true})
        deposit.getManualDepositAccountNumberField().type(accountNumber)
        deposit.getManualDepositAddNewModal().click()
        deposit.getManualDepositCurrencyDropdown().select(gbp).should('have.value', gbp)
        deposit.getmanualDepositAmountField().type(amount)
        deposit.getManualDepositBankNameField().type(bankName)
        deposit.getManualDepositMerchantNotesField().type(merchantNotes)
        deposit.getManualDepositAdminNotes().type(adminNotes)
        deposit.getManualDepositSaveButton().click()
        deposit.getManualDepositAddNewSuccessMessage().contains(addNewDepositSuccessMessage)
    })

    it("should create Manual Deposit with Invalid Account Number", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getAddNewManualDeposit().click({force : true})
        deposit.getManualDepositAccountNumberField().type(invalidAccountNumber)
        deposit.getManualDepositAddNewModal().click()
        deposit.getManualDepositInvalidAccountErrorMessage().contains(invalidAccountErrorMessage)
    })

    it("should create Manual Deposit with Invalid Account Number using Save Button", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getAddNewManualDeposit().click({force : true})
        deposit.getManualDepositCurrencyDropdown().select(gbp).should('have.value', gbp)
        deposit.getmanualDepositAmountField().type(amount)
        deposit.getManualDepositBankNameField().type(bankName)
        deposit.getManualDepositMerchantNotesField().type(merchantNotes)
        deposit.getManualDepositAdminNotes().type(adminNotes)
        deposit.getManualDepositAccountNumberField().type(invalidAccountNumber)
        deposit.getManualDepositSaveButton().click()
        deposit.getManualDepositInvalidAccountErrorMessage().contains(invalidAccountErrorMessage)
    })

    it("should create Manual Deposit with Missing Account Number", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getAddNewManualDeposit().click({force : true})
        //deposit.getManualDepositAccountNumberField().type(accountNumber)
        deposit.getManualDepositAddNewModal().click()
        deposit.getManualDepositCurrencyDropdown().select(jpy).should('have.value', jpy)
        deposit.getmanualDepositAmountField().type(amount)
        deposit.getManualDepositBankNameField().type(bankName)
        deposit.getManualDepositMerchantNotesField().type(merchantNotes)
        deposit.getManualDepositAdminNotes().type(adminNotes)
        deposit.getManualDepositSaveButton().click()
        deposit.getManualDepositMissingAccountNumberError().contains(missingAccountNumberError)
    })

    it("should create Manual Deposit with Missing Currency", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getAddNewManualDeposit().click({force : true})
        deposit.getManualDepositAccountNumberField().type(accountNumber)
        deposit.getManualDepositAddNewModal().click()
        //deposit.getManualDepositCurrencyDropdown().select(jpy).should('have.value', jpy)
        deposit.getmanualDepositAmountField().type(amount)
        deposit.getManualDepositBankNameField().type(bankName)
        deposit.getManualDepositMerchantNotesField().type(merchantNotes)
        deposit.getManualDepositAdminNotes().type(adminNotes)
        deposit.getManualDepositSaveButton().click()
        deposit.getManualDepositMissingCurrencyErrorMessage().contains(missingCurrencyError)
    })

    it("should create Manual Deposit with Missing Amount", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getAddNewManualDeposit().click({force : true})
        deposit.getManualDepositAccountNumberField().type(accountNumber)
        deposit.getManualDepositAddNewModal().click()
        deposit.getManualDepositCurrencyDropdown().select(jpy).should('have.value', jpy)
        //deposit.getmanualDepositAmountField().type(amount)
        deposit.getManualDepositBankNameField().type(bankName)
        deposit.getManualDepositMerchantNotesField().type(merchantNotes)
        deposit.getManualDepositAdminNotes().type(adminNotes)
        deposit.getManualDepositSaveButton().click()
        deposit.getManualDepositMissingAmountErrorMessage().contains(missingAmountError)
    })

    it("should create Manual Deposit with Missing Bank Name", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getAddNewManualDeposit().click({force : true})
        deposit.getManualDepositAccountNumberField().type(accountNumber)
        deposit.getManualDepositAddNewModal().click()
        deposit.getManualDepositCurrencyDropdown().select(jpy).should('have.value', jpy)
        deposit.getmanualDepositAmountField().type(amount)
        //deposit.getManualDepositBankNameField().type(bankName)
        deposit.getManualDepositMerchantNotesField().type(merchantNotes)
        deposit.getManualDepositAdminNotes().type(adminNotes)
        deposit.getManualDepositSaveButton().click()
        deposit.getManualDepositMissingBankNameErrorMessage().contains(missingBankNameError)
    })

    it("should create Manual Deposit with Missing Merchant Notes", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getAddNewManualDeposit().click({force : true})
        deposit.getManualDepositAccountNumberField().type(accountNumber)
        deposit.getManualDepositAddNewModal().click()
        deposit.getManualDepositCurrencyDropdown().select(jpy).should('have.value', jpy)
        deposit.getmanualDepositAmountField().type(amount)
        deposit.getManualDepositBankNameField().type(bankName)
        //deposit.getManualDepositMerchantNotesField().type(merchantNotes)
        deposit.getManualDepositAdminNotes().type(adminNotes)
        deposit.getManualDepositSaveButton().click()
        deposit.getManualDepositMissingMerchantNotesErrorMessage().contains(missingMerchantNotesError)
    })

    it("should create Manual Deposit with Missing Admin Notes", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getAddNewManualDeposit().click({force : true})
        deposit.getManualDepositAccountNumberField().type(accountNumber)
        deposit.getManualDepositAddNewModal().click()
        deposit.getManualDepositCurrencyDropdown().select(jpy).should('have.value', jpy)
        deposit.getmanualDepositAmountField().type(amount)
        deposit.getManualDepositBankNameField().type(bankName)
        deposit.getManualDepositMerchantNotesField().type(merchantNotes)
        //deposit.getManualDepositAdminNotes().type(adminNotes)
        deposit.getManualDepositSaveButton().click()
        deposit.getManualDepositMissingAdminNotesErrorMessage().contains(missingAdminNotesError)
    })

    it("should create Manual Deposit with Missing All Required Fields", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getAddNewManualDeposit().click({force : true})
        deposit.getManualDepositSaveButton().click()
        deposit.getManualDepositMissingAccountNumberError().contains(missingAccountNumberError)
        deposit.getManualDepositMissingCurrencyErrorMessage().contains(missingCurrencyError)
        deposit.getManualDepositMissingAmountErrorMessage().contains(missingAmountError)
        deposit.getManualDepositMissingBankNameErrorMessage().contains(missingBankNameError)
        deposit.getManualDepositMissingMerchantNotesErrorMessage().contains(missingMerchantNotesError)
        deposit.getManualDepositMissingAdminNotesErrorMessage().contains(missingAdminNotesError)
    })

    it("should filter Transactions using Transaction Number", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getManualDepositShowFilterMenu().click()
        deposit.getManualDepositSearchFilterField().type(accountNumber)
        deposit.getManualDepositTransactionNumberonList().first().then($txnNumber => {
            let manualDepTxnNumber = $txnNumber.text()
            cy.log(manualDepTxnNumber)
            cy.wrap(manualDepTxnNumber).as('manualDepTxnNumber')
        })
        deposit.getManualDepositResetButton().click()
        cy.get('@manualDepTxnNumber').then(manualDepTxnNumber => { cy.log(manualDepTxnNumber)
        deposit.getManualDepositSearchFilter().select(txnNumberFilter).should('have.value', txnNumberFilter )
        deposit.getManualDepositSearchFilterField().type(manualDepTxnNumber)
        deposit.getManualDepositFilterButton().click()
        deposit.getManualDepositCard().contains(manualDepTxnNumber)
    })
    })

    it("should filter Transactions using Merchant Number", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getManualDepositShowFilterMenu().click()
        deposit.getManualDepositSearchFilter().select(merchantNumberFilter).should('have.value', merchantNumberFilter)
        deposit.getManualDepositSearchFilterField().type(accountNumber)
        deposit.getManualDepositFilterButton().click()
        deposit.getManualDepositLastPage().click()
        cy.wait(2000)
        deposit.getManualDepositListCard().contains(accountNumber)
    })

    it("should filter Transactions using Merchant Name", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getManualDepositShowFilterMenu().click()
        deposit.getManualDepositSearchFilter().select(merchantNameFilter).should('have.value', merchantNameFilter)
        deposit.getManualDepositSearchFilterField().type(merchantName)
        deposit.getManualDepositFilterButton().click()
        deposit.getManualDepositLastPage().click()
        cy.wait(2000)
        deposit.getManualDepositListCard().contains(merchantName)
    })

    it("should filter Transactions using Bank Name", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getManualDepositShowFilterMenu().click()
        deposit.getManualDepositSearchFilter().select(bankNameFilter).should('have.value', bankNameFilter)
        deposit.getManualDepositSearchFilterField().type(bankName)
        deposit.getManualDepositFilterButton().click()
        deposit.getManualDepositLastPage().click()
        cy.wait(2000)
        deposit.getManualDepositListCard().contains(bankName)
    })

    it("should filter Transactions using JPY Currency", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getManualDepositShowFilterMenu().click()
        deposit.getManualDepositFilterButton().click()
        deposit.getManualDepositCurrencyFilter().select(jpy).should('have.value', jpy)
        deposit.getManualDepositFilterButton().click()
        deposit.getManualDepositLastPage().click()
        cy.wait(2000)
        deposit.getManualDepositListCard().contains(jpy)
    })

    it("should filter Transactions using USD Currency", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getManualDepositShowFilterMenu().click()
        deposit.getManualDepositFilterButton().click()
        deposit.getManualDepositCurrencyFilter().select(usd).should('have.value', usd)
        deposit.getManualDepositFilterButton().click()
        deposit.getManualDepositLastPage().click()
        cy.wait(2000)
        deposit.getManualDepositListCard().contains(usd)
    })

    it("should filter Transactions using EUR Currency", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getManualDepositShowFilterMenu().click()
        deposit.getManualDepositFilterButton().click()
        deposit.getManualDepositCurrencyFilter().select(eur).should('have.value', eur)
        deposit.getManualDepositFilterButton().click()
        deposit.getManualDepositLastPage().click()
        cy.wait(2000)
        deposit.getManualDepositListCard().contains(eur)
    })

    it("should filter Transactions using PHP Currency", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getManualDepositShowFilterMenu().click()
        deposit.getManualDepositFilterButton().click()
        deposit.getManualDepositCurrencyFilter().select(php).should('have.value', php)
        deposit.getManualDepositFilterButton().click()
        deposit.getManualDepositLastPage().click()
        cy.wait(2000)
        deposit.getManualDepositListCard().contains(php)
    })

    it("should filter Transactions using GBP Currency", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getManualDepositShowFilterMenu().click()
        deposit.getManualDepositFilterButton().click()
        deposit.getManualDepositCurrencyFilter().select(gbp).should('have.value', gbp)
        deposit.getManualDepositFilterButton().click()
        deposit.getManualDepositLastPage().click()
        cy.wait(2000)
        deposit.getManualDepositListCard().contains(gbp)
    })

    it("should filter Transactions using Date From", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getManualDepositShowFilterMenu().click()
        deposit.getDateFromFilter().type(dateToday)
        deposit.getManualDepositFilterButton().click()
    })

    it("should filter Transactions using Date To", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getManualDepositShowFilterMenu().click()
        deposit.getDateToFilter().type(dateToday)
        deposit.getManualDepositFilterButton().click()
    })

    it("should filter Transactions using Date To", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()
        deposit.getManualDepositShowFilterMenu().click()
        deposit.getDateFromFilter().type(dateToday)
        deposit.getDateToFilter().type(dateToday)
        deposit.getManualDepositFilterButton().click()
    })

})