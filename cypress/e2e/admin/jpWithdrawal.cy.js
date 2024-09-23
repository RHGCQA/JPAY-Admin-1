import 'cypress-plugin-api'
import LoginTest from "../../pages/loginPages"
import JPWithdrawalTest from "../../pages/jpWithdrawal"
import { hash } from '../../functions/sha256Generator'
import { jpay_stage } from '../../stringHolders/apiEndpoint'
import { generateString } from '../../stringHolders/randomStringGenerator'
import { jpWithdrawalValidCreds, jpWithdrawalInvCreds } from "../../stringHolders/jpayCredentials"
import { invalidloginCredentials, validloginCredentials } from "../../stringHolders/loginCredentials"
import { JPDepositInvalidCredentials, JPDepositValidCredentials } from "../../stringHolders/jpayCredentials"
import { jpWithdrawalBatch, jpWithdrawalBatch2, jpWithdrawalBatch3 } from "../../functions/jpWithdrawBatch"
import responseDetails from "../../functions/jpWithdrawBatch"
import { formatDate, adjustDate } from '../../functions/dateConverter';
import { jpWithdrawalAuto, jpWithdrawalAuto2 } from '../../functions/jpWithdrawalAuto'

const login = new LoginTest()
const jpwithdrawal = new JPWithdrawalTest()


let emailAddress = validloginCredentials.stageEmailAddress
let merchantName = JPDepositValidCredentials.stageValidMerchantName
let password = validloginCredentials.stagePassword
const formatter = new Intl.NumberFormat('en-US');


describe("JPAY Withdrawal TRANSACTION CHECKER", () => {
  beforeEach(() => {
    login.visit()

  })

  it("should create JP Withdrawal Batch and Check Callback Response ", () => {

    jpWithdrawalBatch().as('details')
    cy.get('@details').its('status').should('eq', 200)
    cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.body).to.have.property('success', true)
      let res = response.body.data

      login.getEmailAddressField().type(emailAddress)
      login.getPasswordField().type(password)
      login.getloginButton().click()
      jpwithdrawal.getFiatTransactions().click()
      jpwithdrawal.getJPWithdrawals().click()
      jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
      jpwithdrawal.getJPWithdrawalSearchFilter().select("Transaction Number").should('have.value', "transaction_number")
      jpwithdrawal.getJPWithdrawalSearchField().type(response.body.data.transaction_number)
      jpwithdrawal.getJPWithdrawalFilterButton().click()
      jpwithdrawal.getJPWithdrawalActionDropdown().click()
      jpwithdrawal.getJPWIthdrawalActionAddEdit().click()
      jpwithdrawal.getJPWithdrawalActionStatusDropdown().select("completed").should('have.value', "completed")
      jpwithdrawal.getJPWithdrawalActionsSave().click()
      jpwithdrawal.getJPWithdrawalActionDropdown().click()
      jpwithdrawal.getJPWIthdrawalActionAddEdit().click()
      jpwithdrawal.getJPWIthdrawalActionsCallbackResponse()
      jpwithdrawal.getJPWIthdrawalActionsCallbackResponse().then($callbackResp => {
        cy.writeFile("cypress/textDatas/callbackReponse.json", $callbackResp.val().toString());
      });
      cy.readFile("cypress/textDatas/callbackReponse.json").then((callbackContent) => {
        expect(callbackContent.transaction_number).to.eq(res.transaction_number)
        expect(callbackContent.merchant_transaction_number).to.eq(res.merchant_transaction_number)
        expect(callbackContent.application_date).to.eq(res.created_at)
        expect(callbackContent.bank_name).to.eq(res.bank_name)
        expect(callbackContent.bank_code).to.eq(res.bank_code)
        expect(callbackContent.branch_name).to.eq(res.branch_name)
        expect(callbackContent.branch_code).to.eq(res.branch_code)
        expect(callbackContent.account_type).to.eq(res.account_type)
        expect(callbackContent.account_number).to.eq(res.account_number)
        expect(callbackContent.account_holder_katakana).to.eq(res.account_holder_katakana)
        expect(callbackContent.account_holder_kanji).to.eq(res.account_holder_kanji)
        expect(callbackContent.amount).to.eq(res.amount + ".00")
        expect(callbackContent.fee).to.eq(res.fee + ".00")
        expect(callbackContent.callback_url).to.eq(res.callback_url)
        expect(callbackContent.signature).to.eq(res.signature)
      });
    });
  })


  it("should create JP Withdrawal Batch and Check JP Withdrawal Request Modal Details", () => {

    jpWithdrawalBatch2().as('details')
    cy.get('@details').its('status').should('eq', 200)
    cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.body).to.have.property('success', true)
      let res = response.body.data

      login.getEmailAddressField().type(emailAddress)
      login.getPasswordField().type(password)
      login.getloginButton().click()
      jpwithdrawal.getFiatTransactions().click()
      jpwithdrawal.getJPWithdrawals().click()
      jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
      jpwithdrawal.getJPWithdrawalSearchFilter().select("Transaction Number").should('have.value', "transaction_number")
      jpwithdrawal.getJPWithdrawalSearchField().type(response.body.data.transaction_number)
      jpwithdrawal.getJPWithdrawalFilterButton().click()
      jpwithdrawal.getJPWithdrawalActionDropdown().click()
      jpwithdrawal.getJPWIthdrawalActionAddEdit().click()
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.transaction_number)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.merchant_transaction_number)
      jpwithdrawal.getJPWithdrawalModalBodyDebitAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getJPWithdrawalModalBody().contains(formatter.format(res.fee) + ".00")
      jpwithdrawal.getJPWithdrawalModalBodyBeneficiaryAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.account_number)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.bank_name)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.bank_code)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.branch_name)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.branch_code)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.account_type)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.account_holder_katakana)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.account_holder_kanji)
      //cy.log(res.callback_url)
      //jpwithdrawal.getJPWithdrawalModalBodyCallbackUrl().contains(res.callback_url)
      jpwithdrawal.getJPWithdrawalActionStatusDropdown().contains("applying")
    });
  })

  it("should create JP Withdrawal Batch and Transactions Table Details", () => {

    jpWithdrawalBatch3().as('details')
    cy.get('@details').its('status').should('eq', 200)
    cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.body).to.have.property('success', true)
      let res = response.body.data

      login.getEmailAddressField().type(emailAddress)
      login.getPasswordField().type(password)
      login.getloginButton().click()
      jpwithdrawal.getFiatTransactions().click()
      jpwithdrawal.getJPWithdrawals().click()
      jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
      jpwithdrawal.getJPWithdrawalSearchFilter().select("Transaction Number").should('have.value', "transaction_number")
      jpwithdrawal.getJPWithdrawalSearchField().type(res.transaction_number)
      jpwithdrawal.getJPWithdrawalFilterButton().click()
      //const formattedDate = formatDate(res.created_at)
      cy.wait(5000)
      jpwithdrawal.getTransactionListTableMerchantNumber().contains(jpWithdrawalValidCreds.stgKazAccNum)
      jpwithdrawal.getTransactionListTableMerchantName().contains(jpWithdrawalValidCreds.stgValidMrchntName)
      jpwithdrawal.getTransactionListTableTxnNumber().contains(res.transaction_number)
      jpwithdrawal.getTransactionListTableMerchantTxnNumber().contains(res.merchant_transaction_number)
      jpwithdrawal.getTransactionListTableBankName().contains(res.bank_name)
      jpwithdrawal.getTransactionListTableBankCode().contains(res.bank_code)
      jpwithdrawal.getTransactionListTableBranchName().contains(res.branch_name)
      jpwithdrawal.getTransactionListTableBranchCode().contains(res.branch_code)
      jpwithdrawal.getTransactionListTableAccountType().contains(res.account_type)
      jpwithdrawal.getTransactionListTableAccountNumber().contains(res.account_number)
      jpwithdrawal.getTransactionListTableAccountHolderKatakana().contains(res.account_holder_katakana)
      jpwithdrawal.getTransactionListTableAccountHolderKanji().contains(res.account_holder_kanji)
      jpwithdrawal.getTransactionListTableAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getTransactionListTableFee().contains(formatter.format(res.fee) + ".00")
      jpwithdrawal.getTransactionListTableStatus().contains("applying")
      jpwithdrawal.getTransactionListTableCallbackStatus().contains("No")
      jpwithdrawal.getTransactionListTableAPIType().contains("Batch")
    });
  })

  it.only("should create JP Withdrawal Batch and Check Callback Response ", () => {

    jpWithdrawalAuto().as('details')
    cy.get('@details').its('status').should('eq', 200)
    cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.body).to.have.property('success', true)
      let res = response.body.data

      login.getEmailAddressField().type(emailAddress)
      login.getPasswordField().type(password)
      login.getloginButton().click()
      jpwithdrawal.getFiatTransactions().click()
      jpwithdrawal.getJPWithdrawals().click()
      jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
      jpwithdrawal.getJPWithdrawalSearchFilter().select("Transaction Number").should('have.value', "transaction_number")
      jpwithdrawal.getJPWithdrawalSearchField().type(response.body.data.transaction_number)
      jpwithdrawal.getJPWithdrawalFilterButton().click()
      jpwithdrawal.getJPWithdrawalActionDropdown().click()
      jpwithdrawal.getJPWIthdrawalActionAddEdit().click()
      jpwithdrawal.getJPWithdrawalActionStatusDropdown().select("completed").should('have.value', "completed")
      jpwithdrawal.getJPWithdrawalActionsSave().click()
      jpwithdrawal.getJPWithdrawalActionDropdown().click()
      jpwithdrawal.getJPWIthdrawalActionAddEdit().click()
      jpwithdrawal.getJPWIthdrawalActionsCallbackResponse()
      jpwithdrawal.getJPWIthdrawalActionsCallbackResponse().then($callbackResp => {
        cy.writeFile("cypress/textDatas/callbackReponse.json", $callbackResp.val().toString());
      });
      cy.readFile("cypress/textDatas/callbackReponse.json").then((callbackContent) => {
        expect(callbackContent.transaction_number).to.eq(res.transaction_number)
        expect(callbackContent.merchant_transaction_number).to.eq(res.merchant_transaction_number)
        expect(callbackContent.application_date).to.eq(res.application_date)
        expect(callbackContent.merchant_id).to.eq(res.merchant_id)
        expect(callbackContent.bank_name).to.eq(res.bank_name)
        expect(callbackContent.bank_code).to.eq(res.bank_code)
        expect(callbackContent.branch_name).to.eq(res.branch_name)
        expect(callbackContent.branch_code).to.eq(res.branch_code)
        expect(callbackContent.account_type).to.eq(res.account_type)
        expect(callbackContent.account_number).to.eq(res.account_number)
        expect(callbackContent.account).to.eq(res.account)
        expect(callbackContent.name).to.eq(res.name)
        expect(callbackContent.amount).to.eq(res.amount + ".00")
        expect(callbackContent.fee).to.eq(res.fee + ".00")
        expect(callbackContent.callback_url).to.eq(res.callback_url)
        expect(callbackContent.signature).to.eq(res.signature)
        cy.wait(60000)
      });
    });
  })

  it.only("should create JP Withdrawal Batch and Check JP Withdrawal Request Modal Details", () => {

    jpWithdrawalAuto2().as('details')
    cy.get('@details').its('status').should('eq', 200)
    cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.body).to.have.property('success', true)
      let res = response.body.data

      login.getEmailAddressField().type(emailAddress)
      login.getPasswordField().type(password)
      login.getloginButton().click()
      jpwithdrawal.getFiatTransactions().click()
      jpwithdrawal.getJPWithdrawals().click()
      jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
      jpwithdrawal.getJPWithdrawalSearchFilter().select("Transaction Number").should('have.value', "transaction_number")
      jpwithdrawal.getJPWithdrawalSearchField().type(response.body.data.transaction_number)
      jpwithdrawal.getJPWithdrawalFilterButton().click()
      jpwithdrawal.getJPWithdrawalActionDropdown().click()
      jpwithdrawal.getJPWIthdrawalActionAddEdit().click()
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.transaction_number)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.merchant_transaction_number)
      jpwithdrawal.getJPWithdrawalModalBodyDebitAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getJPWithdrawalModalBody().contains(formatter.format(res.fee) + ".00")
      jpwithdrawal.getJPWithdrawalModalBodyBeneficiaryAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.account_number)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.bank_name)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.bank_code)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.branch_name)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.branch_code)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.account_type)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.account_holder_katakana)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.account_holder_kanji)
      //cy.log(res.callback_url)
      //jpwithdrawal.getJPWithdrawalModalBodyCallbackUrl().contains(res.callback_url)
      jpwithdrawal.getJPWithdrawalActionStatusDropdown().contains("applying")
    });
  })


})