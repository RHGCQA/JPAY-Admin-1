import LoginTest from "../pages/loginPages"
import manualDepositTest from "../pages/manualDepositPages"
import { validloginCredentials } from "../stringHolders/loginCredentials"
import { manualDepositValidCredentials, manualDepositInvalidCredentials } from "../stringHolders/manualDepositCredentials"
import { ManualDepositSuccessMessage } from "../stringHolders/successMessage"
import {manualDepositErrorMessage} from "../stringHolders/errorMessage"




const login = new LoginTest()
const deposit = new manualDepositTest()
  let emailAddress = validloginCredentials.stageEmailAddress
  let password = validloginCredentials.stagePassword
  let accountNumber = manualDepositValidCredentials.stageValidAccountNumber
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
        //deposit.getManualDepositAddNewModal().click()
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


    it("should create Manual Deposit with Missing All Required Fields", () => {
        login.getEmailAddressField().type(emailAddress)
        login.getPasswordField().type(password)
        login.getloginButton().click()
        deposit.getManualDepositFiat().click()
        deposit.getManualDepositPage().click()

    })

})