import 'cypress-plugin-api'
import LoginTest from "../../pages/loginPages"
import JPWithdrawalTest from "../../pages/jpWithdrawal"
import parsePapa from "../../functions/paparseCsv"
import { jpWithdrawalValidCreds } from "../../stringHolders/jpayCredentials"
import { validloginCredentials } from "../../stringHolders/loginCredentials"
import { JPDepositValidCredentials } from "../../stringHolders/jpayCredentials"
import {
  jpWithdrawalBatch, jpWithdrawalBatch2, jpWithdrawalBatch3,
  jpWithdrawalBatch4, jpWithdrawalBatch5, jpWithdrawalBatch6
} from "../../functions/jpWithdrawBatch"
import {
  jpWithdrawalAuto, jpWithdrawalAuto2, jpWithdrawalAuto3,
  jpWithdrawalAuto4, jpWithdrawalAuto5, jpWithdrawalAuto6,
  jpWithdrawalAuto7, jpWithdrawalAuto8, jpWithdrawalAuto9,
  jpWithdrawalAuto10, jpWithdrawalAuto11, jpWithdrawalAuto12
} from '../../functions/jpWithdrawalAuto'
import MerchantsTest from '../../pages/merchants'
import jpWithdrawalBatchStrs from "../../functions/jpwBatchStress"
import { date_today } from "../../stringHolders/dateGenerator";
import { JPWithdrawalScsMsg } from "../../stringHolders/successMessage"

function isHalfWidth(char) {
  return /[\uFF61-\uFF9F]+$/.test(char);
}

function isFullWidth(char) {
  return /[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFFEF\u4E00-\u9FFF\u3400-\u4DBF]+$/.test(char);
}

parsePapa();
const login = new LoginTest()
const jpwithdrawal = new JPWithdrawalTest()
const merchants = new MerchantsTest()
const formatter = new Intl.NumberFormat('en-US');
let emailAddress = validloginCredentials.stageEmailAddress
let merchantName = JPDepositValidCredentials.stageValidMerchantName
let password = validloginCredentials.stagePassword
var dateToday = date_today();


describe("JPAY WITHDRAWAL TRANSACTION CHECKER", () => {
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
      cy.wait(5000)
      //jpwithdrawal.getTransactionListTable().contains("Action").click()
      jpwithdrawal.getJPWithdrawalActionDropdown().click({ force: true })
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
      cy.wait(5000)
      jpwithdrawal.getJPWithdrawalActionDropdown().click({ force: true })
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

  it("should create JP Withdrawal Auto and Check Callback Response ", () => {


    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    merchants.getMerchants().click()
    merchants.getFilterButton().click()
    merchants.getMerchantNumber().type(jpWithdrawalValidCreds.stgKazAccNum)
    merchants.getFilterMerchantButton().click()
    cy.wait(2000)
    merchants.getCloseFilter().click()
    merchants.getActionsDropdown().click()
    merchants.getIntegrationActionsDropdown().click()
    merchants.getIntegrationsAbatchCheckBox().uncheck({ force: true })
    merchants.getIntegrationsSaveButton().click()
    cy.wait(2000)
    jpWithdrawalAuto().as('details')
    cy.get('@details').its('status').should('eq', 200)
    cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.body).to.have.property('success', true)
      let res = response.body.data
      jpwithdrawal.getFiatTransactions().click()
      jpwithdrawal.getJPWithdrawals().click()
      jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
      jpwithdrawal.getJPWithdrawalSearchFilter().select("Transaction Number").should('have.value', "transaction_number")
      jpwithdrawal.getJPWithdrawalSearchField().type(response.body.data.transaction_number)
      jpwithdrawal.getJPWithdrawalFilterButton().click()
      cy.wait(10000)
      jpwithdrawal.getJPWithdrawalActionDropdown().click({ force: true })
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
        jpwithdrawal.getJPWithdrawaModalBackButton().click()
        cy.wait(2000)
        jpwithdrawal.getJPWithdrawalReload().click()
        cy.wait(10000)
        jpwithdrawal.getTransactionListTableCallbackStatus().contains("Yes")
        jpwithdrawal.getTransactionListTableStatus().contains("completed")
        cy.wait(60000)
      });
    });
  })

  it("should create JP Withdrawal Auto and Check JP Withdrawal Request Modal Details", () => {


    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    merchants.getMerchants().click()
    merchants.getFilterButton().click()
    merchants.getMerchantNumber().type(jpWithdrawalValidCreds.stgKazAccNum)
    merchants.getFilterMerchantButton().click()
    cy.wait(2000)
    merchants.getCloseFilter().click()
    merchants.getActionsDropdown().click()
    merchants.getIntegrationActionsDropdown().click()
    merchants.getIntegrationsAbatchCheckBox().uncheck({ force: true })
    merchants.getIntegrationsSaveButton().click()
    cy.wait(2000)
    jpWithdrawalAuto2().as('details')
    cy.get('@details').its('status').should('eq', 200)
    cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.body).to.have.property('success', true)
      let res = response.body.data
      jpwithdrawal.getFiatTransactions().click()
      jpwithdrawal.getJPWithdrawals().click()
      jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
      jpwithdrawal.getJPWithdrawalSearchFilter().select("Transaction Number").should('have.value', "transaction_number")
      jpwithdrawal.getJPWithdrawalSearchField().type(response.body.data.transaction_number)
      jpwithdrawal.getJPWithdrawalFilterButton().click()
      cy.wait(5000)
      jpwithdrawal.getJPWithdrawalActionDropdown().click({ force: true })
      jpwithdrawal.getJPWIthdrawalActionAddEdit().click()
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.transaction_number)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.merchant_transaction_number)
      jpwithdrawal.getJPWithdrawalModalBodyDebitAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getJPWithdrawalModalBody().contains(formatter.format(res.fee) + ".00")
      jpwithdrawal.getJPWithdrawalModalBodyBeneficiaryAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.account)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.bank_name)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.bank_code)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.branch_name)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.branch_code)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.name)
      //cy.log(res.callback_url)
      //jpwithdrawal.getJPWithdrawalModalBodyCallbackUrl().contains(res.callback_url)
      jpwithdrawal.getJPWithdrawalActionStatusDropdown().contains("applying")
      cy.wait(60000)
    });
  })

  it("should create JP Withdrawal Auto and Transactions Table Details", () => {

    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    merchants.getMerchants().click()
    merchants.getFilterButton().click()
    merchants.getMerchantNumber().type(jpWithdrawalValidCreds.stgKazAccNum)
    merchants.getFilterMerchantButton().click()
    cy.wait(2000)
    merchants.getCloseFilter().click()
    merchants.getActionsDropdown().click()
    merchants.getIntegrationActionsDropdown().click()
    merchants.getIntegrationsAbatchCheckBox().uncheck({ force: true })
    merchants.getIntegrationsSaveButton().click()
    cy.wait(2000)
    jpWithdrawalAuto3().as('details')
    cy.get('@details').its('status').should('eq', 200)
    cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.body).to.have.property('success', true)
      let res = response.body.data
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
      jpwithdrawal.getTransactionListTableAccountNumber().contains(res.account)
      jpwithdrawal.getTransactionListTableAccountHolderKatakana().contains(res.name)
      jpwithdrawal.getTransactionListTableAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getTransactionListTableFee().contains(formatter.format(res.fee) + ".00")
      jpwithdrawal.getTransactionListTableStatus().contains("applying")
      jpwithdrawal.getTransactionListTableCallbackStatus().contains("No")
      jpwithdrawal.getTransactionListTableAPIType().contains("Auto")
    });
  })

  it("should create JP Withdrawal A-Batch and Check Callback Response ", () => {
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    merchants.getMerchants().click()
    merchants.getFilterButton().click()
    merchants.getMerchantNumber().type(jpWithdrawalValidCreds.stgKazAccNum)
    merchants.getFilterMerchantButton().click()
    cy.wait(2000)
    merchants.getCloseFilter().click()
    merchants.getActionsDropdown().click()
    merchants.getIntegrationActionsDropdown().click()
    merchants.getIntegrationsAbatchCheckBox().check({ force: true }).should('be.checked')
    merchants.getIntegrationsSaveButton().click()
    cy.wait(2000)
    jpWithdrawalAuto4().as('details')
    cy.get('@details').its('status').should('eq', 200)
    cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.body).to.have.property('success', true)
      let res = response.body.data
      jpwithdrawal.getFiatTransactions().click()
      jpwithdrawal.getJPWithdrawals().click()
      jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
      jpwithdrawal.getJPWithdrawalSearchFilter().select("Transaction Number").should('have.value', "transaction_number")
      jpwithdrawal.getJPWithdrawalSearchField().type(response.body.data.transaction_number)
      jpwithdrawal.getJPWithdrawalFilterButton().click()
      cy.wait(5000)
      jpwithdrawal.getJPWithdrawalActionDropdown().click({ force: true })
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
        jpwithdrawal.getJPWithdrawaModalBackButton().click()
        cy.wait(5000)
        jpwithdrawal.getJPWithdrawalReload().click()
        jpwithdrawal.getTransactionListTableAccountHolderKanji().contains("A-Batch")
        jpwithdrawal.getTransactionListTableCallbackStatus().contains("Yes")
        jpwithdrawal.getTransactionListTableStatus().contains("completed")
        jpwithdrawal.getTransactionListTableAPIType().contains("A-Batch")
      });
    });
  })

  it("should create JP Withdrawal A-Batch and Check JP Withdrawal Request Modal Details", () => {
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    merchants.getMerchants().click()
    merchants.getFilterButton().click()
    merchants.getMerchantNumber().type(jpWithdrawalValidCreds.stgKazAccNum)
    merchants.getFilterMerchantButton().click()
    cy.wait(2000)
    merchants.getCloseFilter().click()
    merchants.getActionsDropdown().click()
    merchants.getIntegrationActionsDropdown().click()
    merchants.getIntegrationsAbatchCheckBox().check({ force: true }).should('be.checked')
    merchants.getIntegrationsSaveButton().click()
    cy.wait(2000)
    jpWithdrawalAuto5().as('details')
    cy.get('@details').its('status').should('eq', 200)
    cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.body).to.have.property('success', true)
      let res = response.body.data
      jpwithdrawal.getFiatTransactions().click()
      jpwithdrawal.getJPWithdrawals().click()
      jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
      jpwithdrawal.getJPWithdrawalSearchFilter().select("Transaction Number").should('have.value', "transaction_number")
      jpwithdrawal.getJPWithdrawalSearchField().type(response.body.data.transaction_number)
      jpwithdrawal.getJPWithdrawalFilterButton().click()
      cy.wait(5000)
      jpwithdrawal.getJPWithdrawalActionDropdown().click({ force: true })
      jpwithdrawal.getJPWIthdrawalActionAddEdit().click()
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.transaction_number)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.merchant_transaction_number)
      jpwithdrawal.getJPWithdrawalModalBodyDebitAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getJPWithdrawalModalBody().contains(formatter.format(res.fee) + ".00")
      jpwithdrawal.getJPWithdrawalModalBodyBeneficiaryAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.account)
      jpwithdrawal.getTransactionListTableAccountHolderKanji().contains("A-Batch")
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.bank_name)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.bank_code)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.branch_name)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.branch_code)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.name)
      jpwithdrawal.getJPWithdrawalActionStatusDropdown().contains("applying")
      jpwithdrawal.getTransactionListTableAPIType().contains("A-Batch")
    });
  })

  it("should create JP Withdrawal A-Batch and Transactions Table Details", () => {
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    merchants.getMerchants().click()
    merchants.getFilterButton().click()
    merchants.getMerchantNumber().type(jpWithdrawalValidCreds.stgKazAccNum)
    merchants.getFilterMerchantButton().click()
    cy.wait(2000)
    merchants.getCloseFilter().click()
    merchants.getActionsDropdown().click()
    merchants.getIntegrationActionsDropdown().click()
    merchants.getIntegrationsAbatchCheckBox().check({ force: true }).should('be.checked')
    merchants.getIntegrationsSaveButton().click()
    cy.wait(2000)
    jpWithdrawalAuto6().as('details')
    cy.get('@details').its('status').should('eq', 200)
    cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.body).to.have.property('success', true)
      let res = response.body.data
      jpwithdrawal.getFiatTransactions().click()
      jpwithdrawal.getJPWithdrawals().click()
      jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
      jpwithdrawal.getJPWithdrawalSearchFilter().select("Transaction Number").should('have.value', "transaction_number")
      jpwithdrawal.getJPWithdrawalSearchField().type(res.transaction_number)
      jpwithdrawal.getJPWithdrawalFilterButton().click()
      cy.wait(5000)
      jpwithdrawal.getTransactionListTableMerchantNumber().contains(jpWithdrawalValidCreds.stgKazAccNum)
      jpwithdrawal.getTransactionListTableMerchantName().contains(jpWithdrawalValidCreds.stgValidMrchntName)
      jpwithdrawal.getTransactionListTableTxnNumber().contains(res.transaction_number)
      jpwithdrawal.getTransactionListTableMerchantTxnNumber().contains(res.merchant_transaction_number)
      jpwithdrawal.getTransactionListTableBankName().contains(res.bank_name)
      jpwithdrawal.getTransactionListTableBankCode().contains(res.bank_code)
      jpwithdrawal.getTransactionListTableBranchName().contains(res.branch_name)
      jpwithdrawal.getTransactionListTableBranchCode().contains(res.branch_code)
      jpwithdrawal.getTransactionListTableAccountNumber().contains(res.account)
      jpwithdrawal.getTransactionListTableAccountHolderKanji().contains("A-Batch")
      jpwithdrawal.getTransactionListTableAccountHolderKatakana().contains(res.name)
      jpwithdrawal.getTransactionListTableAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getTransactionListTableFee().contains(formatter.format(res.fee) + ".00")
      jpwithdrawal.getTransactionListTableStatus().contains("applying")
      jpwithdrawal.getTransactionListTableCallbackStatus().contains("No")
      jpwithdrawal.getTransactionListTableAPIType().contains("A-Batch")

    });
  })

})

describe("JPAY WITHDRAWAL COMPUTATION", () => {
  beforeEach(() => {
    login.visit()
  })

  it("should Compute all transactions and check calculations", () => {
    let totalAmount = 0;
    let totalFee = 0;
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    jpwithdrawal.getFiatTransactions().click()
    jpwithdrawal.getJPWithdrawals().click()
    jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
    jpwithdrawal.getJPWithdrawalSearchFilter().select("Merchant Number").should('have.value', "merchant_number")
    jpwithdrawal.getJPWithdrawalSearchField().type(JPDepositValidCredentials.stageValidAccountNumber)
    jpwithdrawal.getJPWithdrawalFilterButton().click()
    jpwithdrawal.getJPWithdrawalExportButton().click()
    jpwithdrawal.getJPWithdrawalExportConfirmation().click()
    cy.wait(20000)
    cy.task('findAndRenameLatestFile', {
      directoryPath: 'cypress/downloads',
      newFileName: 'jpWithdrawalExport.csv'
    }).then((message) => {
      cy.log(message);
      cy.parseCsv('cypress/downloads/jpWithdrawalExport.csv').then((jsonData) => {
        let totalTxns = jsonData.length
        for (let x = 0; totalTxns > x; x++) {
          const am = jsonData[x]["Amount"].replace(/,/g, '');
          const fe = jsonData[x]["Fee"].replace(/,/g, '');
          totalAmount += parseFloat(am);
          totalFee += parseFloat(fe)
        }
        cy.log("Fee:" + totalFee + " Amount " + totalAmount)
        jpwithdrawal.getJPWithdrawalTotalTransactions().contains(totalTxns)
        jpwithdrawal.getJPWithdrawalTotalFee().contains("JPY " + formatter.format(totalFee) + ".00")
        jpwithdrawal.getJPWithdrawalTotalAmount().contains("JPY " + formatter.format(totalAmount) + ".00")
      });
    })
    cy.task('deleteFile', 'cypress/downloads/jpWithdrawalExport.csv').then((message) => {
      cy.log(message);
    });
  })

  it("should Compute all Batch transactions and check calculations - ALL APPLYING", () => {
    let totalAmount = 0;
    let totalFee = 0;
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    jpwithdrawal.getFiatTransactions().click()
    jpwithdrawal.getJPWithdrawals().click()
    jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
    jpwithdrawal.getJPWithdrawalSearchFilter().select("Merchant Number").should('have.value', "merchant_number")
    jpwithdrawal.getJPWithdrawalSearchField().type(JPDepositValidCredentials.stageValidAccountNumber)
    jpwithdrawal.getJPWithdrawalStatusFilter().select("applying").should('have.value', "applying")
    jpwithdrawal.getJPWithdrawalAPITypeFilter().select("batch").should('have.value', "batch")
    jpwithdrawal.getJPWithdrawalFilterButton().click()
    jpwithdrawal.getJPWithdrawalExportButton().click()
    jpwithdrawal.getJPWithdrawalExportConfirmation().click()
    cy.wait(5000)
    cy.task('findAndRenameLatestFile', {
      directoryPath: 'cypress/downloads',
      newFileName: 'jpWithdrawalExport.csv'
    }).then((message) => {
      cy.log(message);
      cy.parseCsv('cypress/downloads/jpWithdrawalExport.csv').then((jsonData) => {
        let totalTxns = jsonData.length
        for (let x = 0; totalTxns > x; x++) {
          const am = jsonData[x]["Amount"].replace(/,/g, '');
          const fe = jsonData[x]["Fee"].replace(/,/g, '');
          totalAmount += parseFloat(am);
          totalFee += parseFloat(fe)
        }
        cy.log("Fee:" + totalFee + " Amount " + totalAmount)
        jpwithdrawal.getJPWithdrawalTotalTransactions().contains(totalTxns)
        jpwithdrawal.getJPWithdrawalTotalFee().contains("JPY " + formatter.format(totalFee) + ".00")
        jpwithdrawal.getJPWithdrawalTotalAmount().contains("JPY " + formatter.format(totalAmount) + ".00")
      });
    })
    cy.task('deleteFile', 'cypress/downloads/jpWithdrawalExport.csv').then((message) => {
      cy.log(message);
    });
  })

  it("should Compute all Auto transactions and check calculations - ALL APPLYING", () => {
    let totalAmount = 0;
    let totalFee = 0;
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    jpwithdrawal.getFiatTransactions().click()
    jpwithdrawal.getJPWithdrawals().click()
    jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
    jpwithdrawal.getJPWithdrawalSearchFilter().select("Merchant Number").should('have.value', "merchant_number")
    jpwithdrawal.getJPWithdrawalSearchField().type(JPDepositValidCredentials.stageValidAccountNumber)
    jpwithdrawal.getJPWithdrawalStatusFilter().select("applying").should('have.value', "applying")
    jpwithdrawal.getJPWithdrawalAPITypeFilter().select("auto").should('have.value', "auto")
    jpwithdrawal.getJPWithdrawalFilterButton().click()
    jpwithdrawal.getJPWithdrawalExportButton().click()
    jpwithdrawal.getJPWithdrawalExportConfirmation().click()
    cy.wait(5000)
    cy.task('findAndRenameLatestFile', {
      directoryPath: 'cypress/downloads',
      newFileName: 'jpWithdrawalExport.csv'
    }).then((message) => {
      cy.log(message);
      cy.parseCsv('cypress/downloads/jpWithdrawalExport.csv').then((jsonData) => {
        let totalTxns = jsonData.length
        for (let x = 0; totalTxns > x; x++) {
          const am = jsonData[x]["Amount"].replace(/,/g, '');
          const fe = jsonData[x]["Fee"].replace(/,/g, '');
          totalAmount += parseFloat(am);
          totalFee += parseFloat(fe)
        }
        cy.log("Fee:" + totalFee + " Amount " + totalAmount)
        jpwithdrawal.getJPWithdrawalTotalTransactions().contains(totalTxns)
        jpwithdrawal.getJPWithdrawalTotalFee().contains("JPY " + formatter.format(totalFee) + ".00")
        jpwithdrawal.getJPWithdrawalTotalAmount().contains("JPY " + formatter.format(totalAmount) + ".00")
      });
    })
    cy.task('deleteFile', 'cypress/downloads/jpWithdrawalExport.csv').then((message) => {
      cy.log(message);
    });
  })

  it("should Compute all A-Batch transactions and check calculations - ALL APPLYING", () => {
    let totalAmount = 0;
    let totalFee = 0;
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    jpwithdrawal.getFiatTransactions().click()
    jpwithdrawal.getJPWithdrawals().click()
    jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
    jpwithdrawal.getJPWithdrawalSearchFilter().select("Merchant Number").should('have.value', "merchant_number")
    jpwithdrawal.getJPWithdrawalSearchField().type(JPDepositValidCredentials.stageValidAccountNumber)
    jpwithdrawal.getJPWithdrawalStatusFilter().select("applying").should('have.value', "applying")
    jpwithdrawal.getJPWithdrawalAPITypeFilter().select("abatch").should('have.value', "abatch")
    jpwithdrawal.getJPWithdrawalFilterButton().click()
    jpwithdrawal.getJPWithdrawalExportButton().click()
    jpwithdrawal.getJPWithdrawalExportConfirmation().click()
    cy.wait(5000)
    cy.task('findAndRenameLatestFile', {
      directoryPath: 'cypress/downloads',
      newFileName: 'jpWithdrawalExport.csv'
    }).then((message) => {
      cy.log(message);
      cy.parseCsv('cypress/downloads/jpWithdrawalExport.csv').then((jsonData) => {
        let totalTxns = jsonData.length
        for (let x = 0; totalTxns > x; x++) {
          const am = jsonData[x]["Amount"].replace(/,/g, '');
          const fe = jsonData[x]["Fee"].replace(/,/g, '');
          totalAmount += parseFloat(am);
          totalFee += parseFloat(fe)
        }
        cy.log("Fee:" + totalFee + " Amount " + totalAmount)
        jpwithdrawal.getJPWithdrawalTotalTransactions().contains(totalTxns)
        jpwithdrawal.getJPWithdrawalTotalFee().contains("JPY " + formatter.format(totalFee) + ".00")
        jpwithdrawal.getJPWithdrawalTotalAmount().contains("JPY " + formatter.format(totalAmount) + ".00")
      });
    })
    cy.task('deleteFile', 'cypress/downloads/jpWithdrawalExport.csv').then((message) => {
      cy.log(message);
    });
  })

  it("should Compute all Batch transactions and check calculations - ALL COMPLETED", () => {
    let totalAmount = 0;
    let totalFee = 0;
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    jpwithdrawal.getFiatTransactions().click()
    jpwithdrawal.getJPWithdrawals().click()
    jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
    jpwithdrawal.getJPWithdrawalSearchFilter().select("Merchant Number").should('have.value', "merchant_number")
    jpwithdrawal.getJPWithdrawalSearchField().type(JPDepositValidCredentials.stageValidAccountNumber)
    jpwithdrawal.getJPWithdrawalStatusFilter().select("completed").should('have.value', "completed")
    jpwithdrawal.getJPWithdrawalAPITypeFilter().select("batch").should('have.value', "batch")
    jpwithdrawal.getJPWithdrawalFilterButton().click()
    jpwithdrawal.getJPWithdrawalExportButton().click()
    jpwithdrawal.getJPWithdrawalExportConfirmation().click()
    cy.wait(5000)
    cy.task('findAndRenameLatestFile', {
      directoryPath: 'cypress/downloads',
      newFileName: 'jpWithdrawalExport.csv'
    }).then((message) => {
      cy.log(message);
      cy.parseCsv('cypress/downloads/jpWithdrawalExport.csv').then((jsonData) => {
        let totalTxns = jsonData.length
        for (let x = 0; totalTxns > x; x++) {
          const am = jsonData[x]["Amount"].replace(/,/g, '');
          const fe = jsonData[x]["Fee"].replace(/,/g, '');
          totalAmount += parseFloat(am);
          totalFee += parseFloat(fe)
        }
        cy.log("Fee:" + totalFee + " Amount " + totalAmount)
        jpwithdrawal.getJPWithdrawalTotalTransactions().contains(totalTxns)
        jpwithdrawal.getJPWithdrawalTotalFee().contains("JPY " + formatter.format(totalFee) + ".00")
        jpwithdrawal.getJPWithdrawalTotalAmount().contains("JPY " + formatter.format(totalAmount) + ".00")
      });
    })
    cy.task('deleteFile', 'cypress/downloads/jpWithdrawalExport.csv').then((message) => {
      cy.log(message);
    });
  })

  it("should Compute all Auto transactions and check calculations - ALL COMPLETED", () => {
    let totalAmount = 0;
    let totalFee = 0;
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    jpwithdrawal.getFiatTransactions().click()
    jpwithdrawal.getJPWithdrawals().click()
    jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
    jpwithdrawal.getJPWithdrawalSearchFilter().select("Merchant Number").should('have.value', "merchant_number")
    jpwithdrawal.getJPWithdrawalSearchField().type(JPDepositValidCredentials.stageValidAccountNumber)
    jpwithdrawal.getJPWithdrawalStatusFilter().select("completed").should('have.value', "completed")
    jpwithdrawal.getJPWithdrawalAPITypeFilter().select("auto").should('have.value', "auto")
    jpwithdrawal.getJPWithdrawalFilterButton().click()
    jpwithdrawal.getJPWithdrawalExportButton().click()
    jpwithdrawal.getJPWithdrawalExportConfirmation().click()
    cy.wait(5000)
    cy.task('findAndRenameLatestFile', {
      directoryPath: 'cypress/downloads',
      newFileName: 'jpWithdrawalExport.csv'
    }).then((message) => {
      cy.log(message);
      cy.parseCsv('cypress/downloads/jpWithdrawalExport.csv').then((jsonData) => {
        let totalTxns = jsonData.length
        for (let x = 0; totalTxns > x; x++) {
          const am = jsonData[x]["Amount"].replace(/,/g, '');
          const fe = jsonData[x]["Fee"].replace(/,/g, '');
          totalAmount += parseFloat(am);
          totalFee += parseFloat(fe)
        }
        cy.log("Fee:" + totalFee + " Amount " + totalAmount)
        jpwithdrawal.getJPWithdrawalTotalTransactions().contains(totalTxns)
        jpwithdrawal.getJPWithdrawalTotalFee().contains("JPY " + formatter.format(totalFee) + ".00")
        jpwithdrawal.getJPWithdrawalTotalAmount().contains("JPY " + formatter.format(totalAmount) + ".00")
      });
    })
    cy.task('deleteFile', 'cypress/downloads/jpWithdrawalExport.csv').then((message) => {
      cy.log(message);
    });
  })

  it("should Compute all A-Batch transactions and check calculations - ALL COMPLETED", () => {
    let totalAmount = 0;
    let totalFee = 0;
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    jpwithdrawal.getFiatTransactions().click()
    jpwithdrawal.getJPWithdrawals().click()
    jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
    jpwithdrawal.getJPWithdrawalSearchFilter().select("Merchant Number").should('have.value', "merchant_number")
    jpwithdrawal.getJPWithdrawalSearchField().type(JPDepositValidCredentials.stageValidAccountNumber)
    jpwithdrawal.getJPWithdrawalStatusFilter().select("completed").should('have.value', "completed")
    jpwithdrawal.getJPWithdrawalAPITypeFilter().select("abatch").should('have.value', "abatch")
    jpwithdrawal.getJPWithdrawalFilterButton().click()
    jpwithdrawal.getJPWithdrawalExportButton().click()
    jpwithdrawal.getJPWithdrawalExportConfirmation().click()
    cy.wait(5000)
    cy.task('findAndRenameLatestFile', {
      directoryPath: 'cypress/downloads',
      newFileName: 'jpWithdrawalExport.csv'
    }).then((message) => {
      cy.log(message);
      cy.parseCsv('cypress/downloads/jpWithdrawalExport.csv').then((jsonData) => {
        let totalTxns = jsonData.length
        for (let x = 0; totalTxns > x; x++) {
          const am = jsonData[x]["Amount"].replace(/,/g, '');
          const fe = jsonData[x]["Fee"].replace(/,/g, '');
          totalAmount += parseFloat(am);
          totalFee += parseFloat(fe)
        }
        cy.log("Fee:" + totalFee + " Amount " + totalAmount)
        jpwithdrawal.getJPWithdrawalTotalTransactions().contains(totalTxns)
        jpwithdrawal.getJPWithdrawalTotalFee().contains("JPY " + formatter.format(totalFee) + ".00")
        jpwithdrawal.getJPWithdrawalTotalAmount().contains("JPY " + formatter.format(totalAmount) + ".00")
      });
    })
    cy.task('deleteFile', 'cypress/downloads/jpWithdrawalExport.csv').then((message) => {
      cy.log(message);
    });
  })

  it("should Compute all Batch transactions and check calculations - ALL PROCESSING", () => {
    let totalAmount = 0;
    let totalFee = 0;
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    jpwithdrawal.getFiatTransactions().click()
    jpwithdrawal.getJPWithdrawals().click()
    jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
    jpwithdrawal.getJPWithdrawalSearchFilter().select("Merchant Number").should('have.value', "merchant_number")
    jpwithdrawal.getJPWithdrawalSearchField().type(JPDepositValidCredentials.stageValidAccountNumber)
    jpwithdrawal.getJPWithdrawalStatusFilter().select("processing").should('have.value', "processing")
    jpwithdrawal.getJPWithdrawalAPITypeFilter().select("batch").should('have.value', "batch")
    jpwithdrawal.getJPWithdrawalFilterButton().click()
    jpwithdrawal.getJPWithdrawalExportButton().click()
    jpwithdrawal.getJPWithdrawalExportConfirmation().click()
    cy.wait(5000)
    cy.task('findAndRenameLatestFile', {
      directoryPath: 'cypress/downloads',
      newFileName: 'jpWithdrawalExport.csv'
    }).then((message) => {
      cy.log(message);
      cy.parseCsv('cypress/downloads/jpWithdrawalExport.csv').then((jsonData) => {
        let totalTxns = jsonData.length
        for (let x = 0; totalTxns > x; x++) {
          const am = jsonData[x]["Amount"].replace(/,/g, '');
          const fe = jsonData[x]["Fee"].replace(/,/g, '');
          totalAmount += parseFloat(am);
          totalFee += parseFloat(fe)
        }
        cy.log("Fee:" + totalFee + " Amount " + totalAmount)
        jpwithdrawal.getJPWithdrawalTotalTransactions().contains(totalTxns)
        jpwithdrawal.getJPWithdrawalTotalFee().contains("JPY " + formatter.format(totalFee) + ".00")
        jpwithdrawal.getJPWithdrawalTotalAmount().contains("JPY " + formatter.format(totalAmount) + ".00")
      });
    })
    cy.task('deleteFile', 'cypress/downloads/jpWithdrawalExport.csv').then((message) => {
      cy.log(message);
    });
  })

  it("should Compute all Auto transactions and check calculations - ALL PROCESSING", () => {
    let totalAmount = 0;
    let totalFee = 0;
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    jpwithdrawal.getFiatTransactions().click()
    jpwithdrawal.getJPWithdrawals().click()
    jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
    jpwithdrawal.getJPWithdrawalSearchFilter().select("Merchant Number").should('have.value', "merchant_number")
    jpwithdrawal.getJPWithdrawalSearchField().type(JPDepositValidCredentials.stageValidAccountNumber)
    jpwithdrawal.getJPWithdrawalStatusFilter().select("processing").should('have.value', "processing")
    jpwithdrawal.getJPWithdrawalAPITypeFilter().select("auto").should('have.value', "auto")
    jpwithdrawal.getJPWithdrawalFilterButton().click()
    jpwithdrawal.getJPWithdrawalExportButton().click()
    jpwithdrawal.getJPWithdrawalExportConfirmation().click()
    cy.wait(5000)
    cy.task('findAndRenameLatestFile', {
      directoryPath: 'cypress/downloads',
      newFileName: 'jpWithdrawalExport.csv'
    }).then((message) => {
      cy.log(message);
      cy.parseCsv('cypress/downloads/jpWithdrawalExport.csv').then((jsonData) => {
        let totalTxns = jsonData.length
        for (let x = 0; totalTxns > x; x++) {
          const am = jsonData[x]["Amount"].replace(/,/g, '');
          const fe = jsonData[x]["Fee"].replace(/,/g, '');
          totalAmount += parseFloat(am);
          totalFee += parseFloat(fe)
        }
        cy.log("Fee:" + totalFee + " Amount " + totalAmount)
        jpwithdrawal.getJPWithdrawalTotalTransactions().contains(totalTxns)
        jpwithdrawal.getJPWithdrawalTotalFee().contains("JPY " + formatter.format(totalFee) + ".00")
        jpwithdrawal.getJPWithdrawalTotalAmount().contains("JPY " + formatter.format(totalAmount) + ".00")
      });
    })
    cy.task('deleteFile', 'cypress/downloads/jpWithdrawalExport.csv').then((message) => {
      cy.log(message);
    });
  })

  it("should Compute all A-Batch transactions and check calculations - ALL PROCESSING", () => {
    let totalAmount = 0;
    let totalFee = 0;
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    jpwithdrawal.getFiatTransactions().click()
    jpwithdrawal.getJPWithdrawals().click()
    jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
    jpwithdrawal.getJPWithdrawalSearchFilter().select("Merchant Number").should('have.value', "merchant_number")
    jpwithdrawal.getJPWithdrawalSearchField().type(JPDepositValidCredentials.stageValidAccountNumber)
    jpwithdrawal.getJPWithdrawalStatusFilter().select("processing").should('have.value', "processing")
    jpwithdrawal.getJPWithdrawalAPITypeFilter().select("abatch").should('have.value', "abatch")
    jpwithdrawal.getJPWithdrawalFilterButton().click()
    jpwithdrawal.getJPWithdrawalExportButton().click()
    jpwithdrawal.getJPWithdrawalExportConfirmation().click()
    cy.wait(5000)
    cy.task('findAndRenameLatestFile', {
      directoryPath: 'cypress/downloads',
      newFileName: 'jpWithdrawalExport.csv'
    }).then((message) => {
      cy.log(message);
      cy.parseCsv('cypress/downloads/jpWithdrawalExport.csv').then((jsonData) => {
        let totalTxns = jsonData.length
        for (let x = 0; totalTxns > x; x++) {
          const am = jsonData[x]["Amount"].replace(/,/g, '');
          const fe = jsonData[x]["Fee"].replace(/,/g, '');
          totalAmount += parseFloat(am);
          totalFee += parseFloat(fe)
        }
        cy.log("Fee:" + totalFee + " Amount " + totalAmount)
        jpwithdrawal.getJPWithdrawalTotalTransactions().contains(totalTxns)
        jpwithdrawal.getJPWithdrawalTotalFee().contains("JPY " + formatter.format(totalFee) + ".00")
        jpwithdrawal.getJPWithdrawalTotalAmount().contains("JPY " + formatter.format(totalAmount) + ".00")
      });
    })
    cy.task('deleteFile', 'cypress/downloads/jpWithdrawalExport.csv').then((message) => {
      cy.log(message);
    });
  })

  it("should Compute all Batch transactions and check calculations - ALL CANCELED", () => {
    let totalAmount = 0;
    let totalFee = 0;
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    jpwithdrawal.getFiatTransactions().click()
    jpwithdrawal.getJPWithdrawals().click()
    jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
    jpwithdrawal.getJPWithdrawalSearchFilter().select("Merchant Number").should('have.value', "merchant_number")
    jpwithdrawal.getJPWithdrawalSearchField().type(JPDepositValidCredentials.stageValidAccountNumber)
    jpwithdrawal.getJPWithdrawalStatusFilter().select("canceled").should('have.value', "canceled")
    jpwithdrawal.getJPWithdrawalAPITypeFilter().select("batch").should('have.value', "batch")
    jpwithdrawal.getJPWithdrawalFilterButton().click()
    jpwithdrawal.getJPWithdrawalExportButton().click()
    jpwithdrawal.getJPWithdrawalExportConfirmation().click()
    cy.wait(5000)
    cy.task('findAndRenameLatestFile', {
      directoryPath: 'cypress/downloads',
      newFileName: 'jpWithdrawalExport.csv'
    }).then((message) => {
      cy.log(message);
      cy.parseCsv('cypress/downloads/jpWithdrawalExport.csv').then((jsonData) => {
        let totalTxns = jsonData.length
        for (let x = 0; totalTxns > x; x++) {
          const am = jsonData[x]["Amount"].replace(/,/g, '');
          const fe = jsonData[x]["Fee"].replace(/,/g, '');
          totalAmount += parseFloat(am);
          totalFee += parseFloat(fe)
        }
        cy.log("Fee:" + totalFee + " Amount " + totalAmount)
        jpwithdrawal.getJPWithdrawalTotalTransactions().contains(totalTxns)
        jpwithdrawal.getJPWithdrawalTotalFee().contains("JPY " + formatter.format(totalFee) + ".00")
        jpwithdrawal.getJPWithdrawalTotalAmount().contains("JPY " + formatter.format(totalAmount) + ".00")
      });
    })
    cy.task('deleteFile', 'cypress/downloads/jpWithdrawalExport.csv').then((message) => {
      cy.log(message);
    });
  })

  it("should Compute all Auto transactions and check calculations - ALL CANCELED", () => {
    let totalAmount = 0;
    let totalFee = 0;
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    jpwithdrawal.getFiatTransactions().click()
    jpwithdrawal.getJPWithdrawals().click()
    jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
    jpwithdrawal.getJPWithdrawalSearchFilter().select("Merchant Number").should('have.value', "merchant_number")
    jpwithdrawal.getJPWithdrawalSearchField().type(JPDepositValidCredentials.stageValidAccountNumber)
    jpwithdrawal.getJPWithdrawalStatusFilter().select("canceled").should('have.value', "canceled")
    jpwithdrawal.getJPWithdrawalAPITypeFilter().select("auto").should('have.value', "auto")
    jpwithdrawal.getJPWithdrawalFilterButton().click()
    jpwithdrawal.getJPWithdrawalExportButton().click()
    jpwithdrawal.getJPWithdrawalExportConfirmation().click()
    cy.wait(5000)
    cy.task('findAndRenameLatestFile', {
      directoryPath: 'cypress/downloads',
      newFileName: 'jpWithdrawalExport.csv'
    }).then((message) => {
      cy.log(message);
      cy.parseCsv('cypress/downloads/jpWithdrawalExport.csv').then((jsonData) => {
        let totalTxns = jsonData.length
        for (let x = 0; totalTxns > x; x++) {
          const am = jsonData[x]["Amount"].replace(/,/g, '');
          const fe = jsonData[x]["Fee"].replace(/,/g, '');
          totalAmount += parseFloat(am);
          totalFee += parseFloat(fe)
        }
        cy.log("Fee:" + totalFee + " Amount " + totalAmount)
        jpwithdrawal.getJPWithdrawalTotalTransactions().contains(totalTxns)
        jpwithdrawal.getJPWithdrawalTotalFee().contains("JPY " + formatter.format(totalFee) + ".00")
        jpwithdrawal.getJPWithdrawalTotalAmount().contains("JPY " + formatter.format(totalAmount) + ".00")
      });
    })
    cy.task('deleteFile', 'cypress/downloads/jpWithdrawalExport.csv').then((message) => {
      cy.log(message);
    });
  })

  it("should Compute all A-Batch transactions and check calculations - ALL CANCELED", () => {
    let totalAmount = 0;
    let totalFee = 0;
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    jpwithdrawal.getFiatTransactions().click()
    jpwithdrawal.getJPWithdrawals().click()
    jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
    jpwithdrawal.getJPWithdrawalSearchFilter().select("Merchant Number").should('have.value', "merchant_number")
    jpwithdrawal.getJPWithdrawalSearchField().type(JPDepositValidCredentials.stageValidAccountNumber)
    jpwithdrawal.getJPWithdrawalStatusFilter().select("canceled").should('have.value', "canceled")
    jpwithdrawal.getJPWithdrawalAPITypeFilter().select("abatch").should('have.value', "abatch")
    jpwithdrawal.getJPWithdrawalFilterButton().click()
    jpwithdrawal.getJPWithdrawalExportButton().click()
    jpwithdrawal.getJPWithdrawalExportConfirmation().click()
    cy.wait(5000)
    cy.task('findAndRenameLatestFile', {
      directoryPath: 'cypress/downloads',
      newFileName: 'jpWithdrawalExport.csv'
    }).then((message) => {
      cy.log(message);
      cy.parseCsv('cypress/downloads/jpWithdrawalExport.csv').then((jsonData) => {
        let totalTxns = jsonData.length
        for (let x = 0; totalTxns > x; x++) {
          const am = jsonData[x]["Amount"].replace(/,/g, '');
          const fe = jsonData[x]["Fee"].replace(/,/g, '');
          totalAmount += parseFloat(am);
          totalFee += parseFloat(fe)
        }
        cy.log("Fee:" + totalFee + " Amount " + totalAmount)
        jpwithdrawal.getJPWithdrawalTotalTransactions().contains(totalTxns)
        jpwithdrawal.getJPWithdrawalTotalFee().contains("JPY " + formatter.format(totalFee) + ".00")
        jpwithdrawal.getJPWithdrawalTotalAmount().contains("JPY " + formatter.format(totalAmount) + ".00")
      });
    })
    cy.task('deleteFile', 'cypress/downloads/jpWithdrawalExport.csv').then((message) => {
      cy.log(message);
    });
  })

  it("should Compute all Batch transactions and check calculations - ALL REFUNDED", () => {
    let totalAmount = 0;
    let totalFee = 0;
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    jpwithdrawal.getFiatTransactions().click()
    jpwithdrawal.getJPWithdrawals().click()
    jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
    jpwithdrawal.getJPWithdrawalSearchFilter().select("Merchant Number").should('have.value', "merchant_number")
    jpwithdrawal.getJPWithdrawalSearchField().type(JPDepositValidCredentials.stageValidAccountNumber)
    jpwithdrawal.getJPWithdrawalStatusFilter().select("refunded").should('have.value', "refunded")
    jpwithdrawal.getJPWithdrawalAPITypeFilter().select("batch").should('have.value', "batch")
    jpwithdrawal.getJPWithdrawalFilterButton().click()
    jpwithdrawal.getJPWithdrawalExportButton().click()
    jpwithdrawal.getJPWithdrawalExportConfirmation().click()
    cy.wait(5000)
    cy.task('findAndRenameLatestFile', {
      directoryPath: 'cypress/downloads',
      newFileName: 'jpWithdrawalExport.csv'
    }).then((message) => {
      cy.log(message);
      cy.parseCsv('cypress/downloads/jpWithdrawalExport.csv').then((jsonData) => {
        let totalTxns = jsonData.length
        for (let x = 0; totalTxns > x; x++) {
          const am = jsonData[x]["Amount"].replace(/,/g, '');
          const fe = jsonData[x]["Fee"].replace(/,/g, '');
          totalAmount += parseFloat(am);
          totalFee += parseFloat(fe)
        }
        cy.log("Fee:" + totalFee + " Amount " + totalAmount)
        jpwithdrawal.getJPWithdrawalTotalTransactions().contains(totalTxns)
        jpwithdrawal.getJPWithdrawalTotalFee().contains("JPY " + formatter.format(totalFee) + ".00")
        jpwithdrawal.getJPWithdrawalTotalAmount().contains("JPY " + formatter.format(totalAmount) + ".00")
      });
    })
    cy.task('deleteFile', 'cypress/downloads/jpWithdrawalExport.csv').then((message) => {
      cy.log(message);
    });
  })

  it("should Compute all Auto transactions and check calculations - ALL REFUNDED", () => {
    let totalAmount = 0;
    let totalFee = 0;
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    jpwithdrawal.getFiatTransactions().click()
    jpwithdrawal.getJPWithdrawals().click()
    jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
    jpwithdrawal.getJPWithdrawalSearchFilter().select("Merchant Number").should('have.value', "merchant_number")
    jpwithdrawal.getJPWithdrawalSearchField().type(JPDepositValidCredentials.stageValidAccountNumber)
    jpwithdrawal.getJPWithdrawalStatusFilter().select("refunded").should('have.value', "refunded")
    jpwithdrawal.getJPWithdrawalAPITypeFilter().select("auto").should('have.value', "auto")
    jpwithdrawal.getJPWithdrawalFilterButton().click()
    jpwithdrawal.getJPWithdrawalExportButton().click()
    jpwithdrawal.getJPWithdrawalExportConfirmation().click()
    cy.wait(5000)
    cy.task('findAndRenameLatestFile', {
      directoryPath: 'cypress/downloads',
      newFileName: 'jpWithdrawalExport.csv'
    }).then((message) => {
      cy.log(message);
      cy.parseCsv('cypress/downloads/jpWithdrawalExport.csv').then((jsonData) => {
        let totalTxns = jsonData.length
        for (let x = 0; totalTxns > x; x++) {
          const am = jsonData[x]["Amount"].replace(/,/g, '');
          const fe = jsonData[x]["Fee"].replace(/,/g, '');
          totalAmount += parseFloat(am);
          totalFee += parseFloat(fe)
        }
        cy.log("Fee:" + totalFee + " Amount " + totalAmount)
        jpwithdrawal.getJPWithdrawalTotalTransactions().contains(totalTxns)
        jpwithdrawal.getJPWithdrawalTotalFee().contains("JPY " + formatter.format(totalFee) + ".00")
        jpwithdrawal.getJPWithdrawalTotalAmount().contains("JPY " + formatter.format(totalAmount) + ".00")
      });
    })
    cy.task('deleteFile', 'cypress/downloads/jpWithdrawalExport.csv').then((message) => {
      cy.log(message);
    });
  })

  it("should Compute all A-Batch transactions and check calculations - ALL REFUNDED", () => {
    let totalAmount = 0;
    let totalFee = 0;
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    jpwithdrawal.getFiatTransactions().click()
    jpwithdrawal.getJPWithdrawals().click()
    jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
    jpwithdrawal.getJPWithdrawalSearchFilter().select("Merchant Number").should('have.value', "merchant_number")
    jpwithdrawal.getJPWithdrawalSearchField().type(JPDepositValidCredentials.stageValidAccountNumber)
    jpwithdrawal.getJPWithdrawalStatusFilter().select("refunded").should('have.value', "refunded")
    jpwithdrawal.getJPWithdrawalAPITypeFilter().select("abatch").should('have.value', "abatch")
    jpwithdrawal.getJPWithdrawalFilterButton().click()
    jpwithdrawal.getJPWithdrawalExportButton().click()
    jpwithdrawal.getJPWithdrawalExportConfirmation().click()
    cy.wait(5000)
    cy.task('findAndRenameLatestFile', {
      directoryPath: 'cypress/downloads',
      newFileName: 'jpWithdrawalExport.csv'
    }).then((message) => {
      cy.log(message);
      cy.parseCsv('cypress/downloads/jpWithdrawalExport.csv').then((jsonData) => {
        let totalTxns = jsonData.length
        for (let x = 0; totalTxns > x; x++) {
          const am = jsonData[x]["Amount"].replace(/,/g, '');
          const fe = jsonData[x]["Fee"].replace(/,/g, '');
          totalAmount += parseFloat(am);
          totalFee += parseFloat(fe)
        }
        cy.log("Fee:" + totalFee + " Amount " + totalAmount)
        jpwithdrawal.getJPWithdrawalTotalTransactions().contains(totalTxns)
        jpwithdrawal.getJPWithdrawalTotalFee().contains("JPY " + formatter.format(totalFee) + ".00")
        jpwithdrawal.getJPWithdrawalTotalAmount().contains("JPY " + formatter.format(totalAmount) + ".00")
      });
    })
    cy.task('deleteFile', 'cypress/downloads/jpWithdrawalExport.csv').then((message) => {
      cy.log(message);
    });
  })

})

describe("JPAY WITHDRAWAL UPDATE STATUS", () => {
  beforeEach(() => {
    login.visit()
  })

  it("should Update Batch Transaction to Canceled", () => {
    let totalAmount = 0;
    let totalFee = 0;

    jpWithdrawalBatch4().as('details')
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
      cy.wait(5000)
      //jpwithdrawal.getTransactionListTable().contains("Action").click()
      jpwithdrawal.getJPWithdrawalActionDropdown().click({ force: true })
      jpwithdrawal.getJPWIthdrawalActionAddEdit().click()
      jpwithdrawal.getJPWithdrawalActionStatusDropdown().select("canceled").should('have.value', "canceled")
      jpwithdrawal.getJPWithdrawalActionsSave().click()
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
      jpwithdrawal.getTransactionListTableStatus().contains("canceled")
      jpwithdrawal.getTransactionListTableCallbackStatus().contains("No")
      jpwithdrawal.getTransactionListTableAPIType().contains("Batch")
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
        jpwithdrawal.getJPWithdrawalActionStatusDropdown().contains("canceled")
      });
    })
  })

  it("should Update Batch Transaction to Refunded", () => {
    let totalAmount = 0;
    let totalFee = 0;

    jpWithdrawalBatch5().as('details')
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
      cy.wait(5000)
      //jpwithdrawal.getTransactionListTable().contains("Action").click()
      jpwithdrawal.getJPWithdrawalActionDropdown().click({ force: true })
      jpwithdrawal.getJPWIthdrawalActionAddEdit().click()
      jpwithdrawal.getJPWithdrawalActionStatusDropdown().select("refunded").should('have.value', "refunded")
      jpwithdrawal.getJPWithdrawalActionsSave().click()
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
      jpwithdrawal.getTransactionListTableStatus().contains("refunded")
      jpwithdrawal.getTransactionListTableCallbackStatus().contains("No")
      jpwithdrawal.getTransactionListTableAPIType().contains("Batch")
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
        jpwithdrawal.getJPWithdrawalActionStatusDropdown().contains("refunded")
      });
    })
  })

  it("should Update Batch Transaction to Processing", () => {
    jpWithdrawalBatch6().as('details')
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
      cy.wait(5000)
      //jpwithdrawal.getTransactionListTable().contains("Action").click()
      jpwithdrawal.getJPWithdrawalActionDropdown().click({ force: true })
      jpwithdrawal.getJPWIthdrawalActionAddEdit().click()
      jpwithdrawal.getJPWithdrawalActionStatusDropdown().select("processing").should('have.value', "processing")
      jpwithdrawal.getJPWithdrawalActionsSave().click()
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
      jpwithdrawal.getTransactionListTableStatus().contains("processing")
      jpwithdrawal.getTransactionListTableCallbackStatus().contains("No")
      jpwithdrawal.getTransactionListTableAPIType().contains("Batch")
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
        jpwithdrawal.getJPWithdrawalActionStatusDropdown().contains("processing")
      });
    })
  })

  it("should Update Auto Transaction to Canceled", () => {

    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    merchants.getMerchants().click()
    merchants.getFilterButton().click()
    merchants.getMerchantNumber().type(jpWithdrawalValidCreds.stgKazAccNum)
    merchants.getFilterMerchantButton().click()
    cy.wait(2000)
    merchants.getCloseFilter().click()
    merchants.getActionsDropdown().click()
    merchants.getIntegrationActionsDropdown().click()
    merchants.getIntegrationsAbatchCheckBox().uncheck({ force: true })
    merchants.getIntegrationsSaveButton().click()
    cy.wait(2000)
    jpWithdrawalAuto7().as('details')
    cy.get('@details').its('status').should('eq', 200)
    cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.body).to.have.property('success', true)
      let res = response.body.data
      jpwithdrawal.getFiatTransactions().click()
      jpwithdrawal.getJPWithdrawals().click()
      jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
      jpwithdrawal.getJPWithdrawalSearchFilter().select("Transaction Number").should('have.value', "transaction_number")
      jpwithdrawal.getJPWithdrawalSearchField().type(res.transaction_number)
      jpwithdrawal.getJPWithdrawalFilterButton().click()
      cy.wait(5000)
      //jpwithdrawal.getTransactionListTable().contains("Action").click()
      jpwithdrawal.getJPWithdrawalActionDropdown().click({ force: true })
      jpwithdrawal.getJPWIthdrawalActionAddEdit().click()
      jpwithdrawal.getJPWithdrawalActionStatusDropdown().select("canceled").should('have.value', "canceled")
      jpwithdrawal.getJPWithdrawalActionsSave().click()
      jpwithdrawal.getTransactionListTableMerchantNumber().contains(jpWithdrawalValidCreds.stgKazAccNum)
      jpwithdrawal.getTransactionListTableMerchantName().contains(jpWithdrawalValidCreds.stgValidMrchntName)
      jpwithdrawal.getTransactionListTableTxnNumber().contains(res.transaction_number)
      jpwithdrawal.getTransactionListTableMerchantTxnNumber().contains(res.merchant_transaction_number)
      jpwithdrawal.getTransactionListTableBankName().contains(res.bank_name)
      jpwithdrawal.getTransactionListTableBankCode().contains(res.bank_code)
      jpwithdrawal.getTransactionListTableBranchName().contains(res.branch_name)
      jpwithdrawal.getTransactionListTableBranchCode().contains(res.branch_code)
      jpwithdrawal.getTransactionListTableAccountNumber().contains(res.account)
      jpwithdrawal.getTransactionListTableAccountHolderKatakana().contains(res.name)
      jpwithdrawal.getTransactionListTableAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getTransactionListTableFee().contains(formatter.format(res.fee) + ".00")
      jpwithdrawal.getTransactionListTableStatus().contains("canceled")
      jpwithdrawal.getTransactionListTableCallbackStatus().contains("No")
      jpwithdrawal.getTransactionListTableAPIType().contains("Auto")
      jpwithdrawal.getJPWithdrawalActionDropdown().click()
      jpwithdrawal.getJPWIthdrawalActionAddEdit().click()
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.transaction_number)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.merchant_transaction_number)
      jpwithdrawal.getJPWithdrawalModalBodyDebitAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getJPWithdrawalModalBody().contains(formatter.format(res.fee) + ".00")
      jpwithdrawal.getJPWithdrawalModalBodyBeneficiaryAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.account)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.bank_name)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.bank_code)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.branch_name)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.branch_code)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.name)
      //jpwithdrawal.getJPWithdrawalModalBody().contains(res.account_holder_kanji)
      jpwithdrawal.getJPWithdrawalActionStatusDropdown().contains("canceled")
      jpwithdrawal.getJPWIthdrawalActionsCallbackResponse()
      jpwithdrawal.getJPWIthdrawalActionsCallbackResponse().then($callbackResp => {
        cy.writeFile("cypress/textDatas/callbackReponse.json", $callbackResp.val().toString());
        cy.readFile("cypress/textDatas/callbackReponse.json").then((callbackContent) => {
          expect(callbackContent.transaction_number).to.eq(res.transaction_number)
          expect(callbackContent.merchant_transaction_number).to.eq(res.merchant_transaction_number)
          // expect(callbackContent.application_date).to.eq(res.created_at)
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
          cy.wait(60000)
        });
      });
    })
  })

  it("should Update Auto Transaction to Refunded", () => {
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    merchants.getMerchants().click()
    merchants.getFilterButton().click()
    merchants.getMerchantNumber().type(jpWithdrawalValidCreds.stgKazAccNum)
    merchants.getFilterMerchantButton().click()
    cy.wait(2000)
    merchants.getCloseFilter().click()
    merchants.getActionsDropdown().click()
    merchants.getIntegrationActionsDropdown().click()
    merchants.getIntegrationsAbatchCheckBox().uncheck({ force: true })
    merchants.getIntegrationsSaveButton().click()
    cy.wait(2000)
    jpWithdrawalAuto8().as('details')
    cy.get('@details').its('status').should('eq', 200)
    cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.body).to.have.property('success', true)
      let res = response.body.data
      jpwithdrawal.getFiatTransactions().click()
      jpwithdrawal.getJPWithdrawals().click()
      jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
      jpwithdrawal.getJPWithdrawalSearchFilter().select("Transaction Number").should('have.value', "transaction_number")
      jpwithdrawal.getJPWithdrawalSearchField().type(res.transaction_number)
      jpwithdrawal.getJPWithdrawalFilterButton().click()
      cy.wait(5000)
      //jpwithdrawal.getTransactionListTable().contains("Action").click()
      jpwithdrawal.getJPWithdrawalActionDropdown().click({ force: true })
      jpwithdrawal.getJPWIthdrawalActionAddEdit().click()
      jpwithdrawal.getJPWithdrawalActionStatusDropdown().select("refunded").should('have.value', "refunded")
      jpwithdrawal.getJPWithdrawalActionsSave().click()
      jpwithdrawal.getTransactionListTableMerchantNumber().contains(jpWithdrawalValidCreds.stgKazAccNum)
      jpwithdrawal.getTransactionListTableMerchantName().contains(jpWithdrawalValidCreds.stgValidMrchntName)
      jpwithdrawal.getTransactionListTableTxnNumber().contains(res.transaction_number)
      jpwithdrawal.getTransactionListTableMerchantTxnNumber().contains(res.merchant_transaction_number)
      jpwithdrawal.getTransactionListTableBankName().contains(res.bank_name)
      jpwithdrawal.getTransactionListTableBankCode().contains(res.bank_code)
      jpwithdrawal.getTransactionListTableBranchName().contains(res.branch_name)
      jpwithdrawal.getTransactionListTableBranchCode().contains(res.branch_code)
      jpwithdrawal.getTransactionListTableAccountNumber().contains(res.account)
      jpwithdrawal.getTransactionListTableAccountHolderKatakana().contains(res.name)
      jpwithdrawal.getTransactionListTableAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getTransactionListTableFee().contains(formatter.format(res.fee) + ".00")
      jpwithdrawal.getTransactionListTableStatus().contains("refunded")
      jpwithdrawal.getTransactionListTableCallbackStatus().contains("No")
      jpwithdrawal.getTransactionListTableAPIType().contains("Auto")
      jpwithdrawal.getJPWithdrawalActionDropdown().click()
      jpwithdrawal.getJPWIthdrawalActionAddEdit().click()
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.transaction_number)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.merchant_transaction_number)
      jpwithdrawal.getJPWithdrawalModalBodyDebitAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getJPWithdrawalModalBody().contains(formatter.format(res.fee) + ".00")
      jpwithdrawal.getJPWithdrawalModalBodyBeneficiaryAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.account)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.bank_name)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.bank_code)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.branch_name)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.branch_code)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.name)
      //jpwithdrawal.getJPWithdrawalModalBody().contains(res.account_holder_kanji)
      jpwithdrawal.getJPWithdrawalActionStatusDropdown().contains("refunded")
      jpwithdrawal.getJPWIthdrawalActionsCallbackResponse()
      jpwithdrawal.getJPWIthdrawalActionsCallbackResponse().then($callbackResp => {
        cy.writeFile("cypress/textDatas/callbackReponse.json", $callbackResp.val().toString());
        cy.readFile("cypress/textDatas/callbackReponse.json").then((callbackContent) => {
          expect(callbackContent.transaction_number).to.eq(res.transaction_number)
          expect(callbackContent.merchant_transaction_number).to.eq(res.merchant_transaction_number)
          // expect(callbackContent.application_date).to.eq(res.created_at)
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
          cy.wait(60000)
        });
      });
    })
  })

  it("should Update Auto Transaction to Processing", () => {
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    merchants.getMerchants().click()
    merchants.getFilterButton().click()
    merchants.getMerchantNumber().type(jpWithdrawalValidCreds.stgKazAccNum)
    merchants.getFilterMerchantButton().click()
    cy.wait(2000)
    merchants.getCloseFilter().click()
    merchants.getActionsDropdown().click()
    merchants.getIntegrationActionsDropdown().click()
    merchants.getIntegrationsAbatchCheckBox().uncheck({ force: true })
    merchants.getIntegrationsSaveButton().click()
    cy.wait(2000)
    jpWithdrawalAuto9().as('details')
    cy.get('@details').its('status').should('eq', 200)
    cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.body).to.have.property('success', true)
      let res = response.body.data
      jpwithdrawal.getFiatTransactions().click()
      jpwithdrawal.getJPWithdrawals().click()
      jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
      jpwithdrawal.getJPWithdrawalSearchFilter().select("Transaction Number").should('have.value', "transaction_number")
      jpwithdrawal.getJPWithdrawalSearchField().type(res.transaction_number)
      jpwithdrawal.getJPWithdrawalFilterButton().click()
      cy.wait(5000)
      //jpwithdrawal.getTransactionListTable().contains("Action").click()
      jpwithdrawal.getJPWithdrawalActionDropdown().click({ force: true })
      jpwithdrawal.getJPWIthdrawalActionAddEdit().click()
      jpwithdrawal.getJPWithdrawalActionStatusDropdown().select("processing").should('have.value', "processing")
      jpwithdrawal.getJPWithdrawalActionsSave().click()
      jpwithdrawal.getTransactionListTableMerchantNumber().contains(jpWithdrawalValidCreds.stgKazAccNum)
      jpwithdrawal.getTransactionListTableMerchantName().contains(jpWithdrawalValidCreds.stgValidMrchntName)
      jpwithdrawal.getTransactionListTableTxnNumber().contains(res.transaction_number)
      jpwithdrawal.getTransactionListTableMerchantTxnNumber().contains(res.merchant_transaction_number)
      jpwithdrawal.getTransactionListTableBankName().contains(res.bank_name)
      jpwithdrawal.getTransactionListTableBankCode().contains(res.bank_code)
      jpwithdrawal.getTransactionListTableBranchName().contains(res.branch_name)
      jpwithdrawal.getTransactionListTableBranchCode().contains(res.branch_code)
      jpwithdrawal.getTransactionListTableAccountNumber().contains(res.account)
      jpwithdrawal.getTransactionListTableAccountHolderKatakana().contains(res.name)
      jpwithdrawal.getTransactionListTableAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getTransactionListTableFee().contains(formatter.format(res.fee) + ".00")
      jpwithdrawal.getTransactionListTableStatus().contains("processing")
      jpwithdrawal.getTransactionListTableCallbackStatus().contains("No")
      jpwithdrawal.getTransactionListTableAPIType().contains("Auto")
      jpwithdrawal.getJPWithdrawalActionDropdown().click()
      jpwithdrawal.getJPWIthdrawalActionAddEdit().click()
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.transaction_number)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.merchant_transaction_number)
      jpwithdrawal.getJPWithdrawalModalBodyDebitAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getJPWithdrawalModalBody().contains(formatter.format(res.fee) + ".00")
      jpwithdrawal.getJPWithdrawalModalBodyBeneficiaryAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.account)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.bank_name)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.bank_code)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.branch_name)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.branch_code)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.name)
      //jpwithdrawal.getJPWithdrawalModalBody().contains(res.account_holder_kanji)
      jpwithdrawal.getJPWithdrawalActionStatusDropdown().contains("processing")
      jpwithdrawal.getJPWIthdrawalActionsCallbackResponse()
      jpwithdrawal.getJPWIthdrawalActionsCallbackResponse().then($callbackResp => {
        cy.writeFile("cypress/textDatas/callbackReponse.json", $callbackResp.val().toString());
        cy.readFile("cypress/textDatas/callbackReponse.json").then((callbackContent) => {
          expect(callbackContent.transaction_number).to.eq(res.transaction_number)
          expect(callbackContent.merchant_transaction_number).to.eq(res.merchant_transaction_number)
          // expect(callbackContent.application_date).to.eq(res.created_at)
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
          cy.wait(60000)
        });
      });
    })
  })

  it("should Update A-Batch  Transaction to Canceled", () => {

    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    merchants.getMerchants().click()
    merchants.getFilterButton().click()
    merchants.getMerchantNumber().type(jpWithdrawalValidCreds.stgKazAccNum)
    merchants.getFilterMerchantButton().click()
    cy.wait(2000)
    merchants.getCloseFilter().click()
    merchants.getActionsDropdown().click()
    merchants.getIntegrationActionsDropdown().click()
    merchants.getIntegrationsAbatchCheckBox().check({ force: true }).should('be.checked')
    merchants.getIntegrationsSaveButton().click()
    cy.wait(2000)
    jpWithdrawalAuto10().as('details')
    cy.get('@details').its('status').should('eq', 200)
    cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.body).to.have.property('success', true)
      let res = response.body.data
      jpwithdrawal.getFiatTransactions().click()
      jpwithdrawal.getJPWithdrawals().click()
      jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
      jpwithdrawal.getJPWithdrawalSearchFilter().select("Transaction Number").should('have.value', "transaction_number")
      jpwithdrawal.getJPWithdrawalSearchField().type(res.transaction_number)
      jpwithdrawal.getJPWithdrawalFilterButton().click()
      cy.wait(5000)
      //jpwithdrawal.getTransactionListTable().contains("Action").click()
      jpwithdrawal.getJPWithdrawalActionDropdown().click({ force: true })
      jpwithdrawal.getJPWIthdrawalActionAddEdit().click()
      jpwithdrawal.getJPWithdrawalActionStatusDropdown().select("canceled").should('have.value', "canceled")
      jpwithdrawal.getJPWithdrawalActionsSave().click()
      jpwithdrawal.getTransactionListTableMerchantNumber().contains(jpWithdrawalValidCreds.stgKazAccNum)
      jpwithdrawal.getTransactionListTableMerchantName().contains(jpWithdrawalValidCreds.stgValidMrchntName)
      jpwithdrawal.getTransactionListTableTxnNumber().contains(res.transaction_number)
      jpwithdrawal.getTransactionListTableMerchantTxnNumber().contains(res.merchant_transaction_number)
      jpwithdrawal.getTransactionListTableBankName().contains(res.bank_name)
      jpwithdrawal.getTransactionListTableBankCode().contains(res.bank_code)
      jpwithdrawal.getTransactionListTableBranchName().contains(res.branch_name)
      jpwithdrawal.getTransactionListTableBranchCode().contains(res.branch_code)
      jpwithdrawal.getTransactionListTableAccountNumber().contains(res.account)
      jpwithdrawal.getTransactionListTableAccountHolderKatakana().contains(res.name)
      jpwithdrawal.getTransactionListTableAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getTransactionListTableFee().contains(formatter.format(res.fee) + ".00")
      jpwithdrawal.getTransactionListTableStatus().contains("canceled")
      jpwithdrawal.getTransactionListTableCallbackStatus().contains("No")
      jpwithdrawal.getTransactionListTableAPIType().contains("A-Batch")
      jpwithdrawal.getJPWithdrawalActionDropdown().click()
      jpwithdrawal.getJPWIthdrawalActionAddEdit().click()
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.transaction_number)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.merchant_transaction_number)
      jpwithdrawal.getJPWithdrawalModalBodyDebitAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getJPWithdrawalModalBody().contains(formatter.format(res.fee) + ".00")
      jpwithdrawal.getJPWithdrawalModalBodyBeneficiaryAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.account)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.bank_name)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.bank_code)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.branch_name)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.branch_code)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.name)
      //jpwithdrawal.getJPWithdrawalModalBody().contains(res.account_holder_kanji)
      jpwithdrawal.getJPWithdrawalActionStatusDropdown().contains("canceled")
      jpwithdrawal.getJPWIthdrawalActionsCallbackResponse()
      jpwithdrawal.getJPWIthdrawalActionsCallbackResponse().then($callbackResp => {
        cy.writeFile("cypress/textDatas/callbackReponse.json", $callbackResp.val().toString());
        cy.readFile("cypress/textDatas/callbackReponse.json").then((callbackContent) => {
          expect(callbackContent.transaction_number).to.eq(res.transaction_number)
          expect(callbackContent.merchant_transaction_number).to.eq(res.merchant_transaction_number)
          // expect(callbackContent.application_date).to.eq(res.created_at)
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
          cy.wait(60000)
        });
      });
    })
  })

  it("should Update A-Batch  Transaction to Refunded", () => {
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    merchants.getMerchants().click()
    merchants.getFilterButton().click()
    merchants.getMerchantNumber().type(jpWithdrawalValidCreds.stgKazAccNum)
    merchants.getFilterMerchantButton().click()
    cy.wait(2000)
    merchants.getCloseFilter().click()
    merchants.getActionsDropdown().click()
    merchants.getIntegrationActionsDropdown().click()
    merchants.getIntegrationsAbatchCheckBox().check({ force: true }).should('be.checked')
    merchants.getIntegrationsSaveButton().click()
    cy.wait(2000)
    jpWithdrawalAuto11().as('details')
    cy.get('@details').its('status').should('eq', 200)
    cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.body).to.have.property('success', true)
      let res = response.body.data
      jpwithdrawal.getFiatTransactions().click()
      jpwithdrawal.getJPWithdrawals().click()
      jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
      jpwithdrawal.getJPWithdrawalSearchFilter().select("Transaction Number").should('have.value', "transaction_number")
      jpwithdrawal.getJPWithdrawalSearchField().type(res.transaction_number)
      jpwithdrawal.getJPWithdrawalFilterButton().click()
      cy.wait(5000)
      //jpwithdrawal.getTransactionListTable().contains("Action").click()
      jpwithdrawal.getJPWithdrawalActionDropdown().click({ force: true })
      jpwithdrawal.getJPWIthdrawalActionAddEdit().click()
      jpwithdrawal.getJPWithdrawalActionStatusDropdown().select("refunded").should('have.value', "refunded")
      jpwithdrawal.getJPWithdrawalActionsSave().click()
      jpwithdrawal.getTransactionListTableMerchantNumber().contains(jpWithdrawalValidCreds.stgKazAccNum)
      jpwithdrawal.getTransactionListTableMerchantName().contains(jpWithdrawalValidCreds.stgValidMrchntName)
      jpwithdrawal.getTransactionListTableTxnNumber().contains(res.transaction_number)
      jpwithdrawal.getTransactionListTableMerchantTxnNumber().contains(res.merchant_transaction_number)
      jpwithdrawal.getTransactionListTableBankName().contains(res.bank_name)
      jpwithdrawal.getTransactionListTableBankCode().contains(res.bank_code)
      jpwithdrawal.getTransactionListTableBranchName().contains(res.branch_name)
      jpwithdrawal.getTransactionListTableBranchCode().contains(res.branch_code)
      jpwithdrawal.getTransactionListTableAccountNumber().contains(res.account)
      jpwithdrawal.getTransactionListTableAccountHolderKatakana().contains(res.name)
      jpwithdrawal.getTransactionListTableAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getTransactionListTableFee().contains(formatter.format(res.fee) + ".00")
      jpwithdrawal.getTransactionListTableStatus().contains("refunded")
      jpwithdrawal.getTransactionListTableCallbackStatus().contains("No")
      jpwithdrawal.getTransactionListTableAPIType().contains("A-Batch")
      jpwithdrawal.getJPWithdrawalActionDropdown().click()
      jpwithdrawal.getJPWIthdrawalActionAddEdit().click()
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.transaction_number)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.merchant_transaction_number)
      jpwithdrawal.getJPWithdrawalModalBodyDebitAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getJPWithdrawalModalBody().contains(formatter.format(res.fee) + ".00")
      jpwithdrawal.getJPWithdrawalModalBodyBeneficiaryAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.account)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.bank_name)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.bank_code)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.branch_name)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.branch_code)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.name)
      //jpwithdrawal.getJPWithdrawalModalBody().contains(res.account_holder_kanji)
      jpwithdrawal.getJPWithdrawalActionStatusDropdown().contains("refunded")
      jpwithdrawal.getJPWIthdrawalActionsCallbackResponse()
      jpwithdrawal.getJPWIthdrawalActionsCallbackResponse().then($callbackResp => {
        cy.writeFile("cypress/textDatas/callbackReponse.json", $callbackResp.val().toString());
        cy.readFile("cypress/textDatas/callbackReponse.json").then((callbackContent) => {
          expect(callbackContent.transaction_number).to.eq(res.transaction_number)
          expect(callbackContent.merchant_transaction_number).to.eq(res.merchant_transaction_number)
          // expect(callbackContent.application_date).to.eq(res.created_at)
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
  })

  it("should Update A-Batch Transaction to Processing", () => {
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    merchants.getMerchants().click()
    merchants.getFilterButton().click()
    merchants.getMerchantNumber().type(jpWithdrawalValidCreds.stgKazAccNum)
    merchants.getFilterMerchantButton().click()
    cy.wait(2000)
    merchants.getCloseFilter().click()
    merchants.getActionsDropdown().click()
    merchants.getIntegrationActionsDropdown().click()
    merchants.getIntegrationsAbatchCheckBox().check({ force: true }).should('be.checked')
    merchants.getIntegrationsSaveButton().click()
    cy.wait(2000)
    jpWithdrawalAuto12().as('details')
    cy.get('@details').its('status').should('eq', 200)
    cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.body).to.have.property('success', true)
      let res = response.body.data
      jpwithdrawal.getFiatTransactions().click()
      jpwithdrawal.getJPWithdrawals().click()
      jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
      jpwithdrawal.getJPWithdrawalSearchFilter().select("Transaction Number").should('have.value', "transaction_number")
      jpwithdrawal.getJPWithdrawalSearchField().type(res.transaction_number)
      jpwithdrawal.getJPWithdrawalFilterButton().click()
      cy.wait(5000)
      //jpwithdrawal.getTransactionListTable().contains("Action").click()
      jpwithdrawal.getJPWithdrawalActionDropdown().click({ force: true })
      jpwithdrawal.getJPWIthdrawalActionAddEdit().click()
      jpwithdrawal.getJPWithdrawalActionStatusDropdown().select("processing").should('have.value', "processing")
      jpwithdrawal.getJPWithdrawalActionsSave().click()
      jpwithdrawal.getTransactionListTableMerchantNumber().contains(jpWithdrawalValidCreds.stgKazAccNum)
      jpwithdrawal.getTransactionListTableMerchantName().contains(jpWithdrawalValidCreds.stgValidMrchntName)
      jpwithdrawal.getTransactionListTableTxnNumber().contains(res.transaction_number)
      jpwithdrawal.getTransactionListTableMerchantTxnNumber().contains(res.merchant_transaction_number)
      jpwithdrawal.getTransactionListTableBankName().contains(res.bank_name)
      jpwithdrawal.getTransactionListTableBankCode().contains(res.bank_code)
      jpwithdrawal.getTransactionListTableBranchName().contains(res.branch_name)
      jpwithdrawal.getTransactionListTableBranchCode().contains(res.branch_code)
      jpwithdrawal.getTransactionListTableAccountNumber().contains(res.account)
      jpwithdrawal.getTransactionListTableAccountHolderKatakana().contains(res.name)
      jpwithdrawal.getTransactionListTableAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getTransactionListTableFee().contains(formatter.format(res.fee) + ".00")
      jpwithdrawal.getTransactionListTableStatus().contains("processing")
      jpwithdrawal.getTransactionListTableCallbackStatus().contains("No")
      jpwithdrawal.getTransactionListTableAPIType().contains("A-Batch")
      jpwithdrawal.getJPWithdrawalActionDropdown().click()
      jpwithdrawal.getJPWIthdrawalActionAddEdit().click()
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.transaction_number)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.merchant_transaction_number)
      jpwithdrawal.getJPWithdrawalModalBodyDebitAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getJPWithdrawalModalBody().contains(formatter.format(res.fee) + ".00")
      jpwithdrawal.getJPWithdrawalModalBodyBeneficiaryAmount().contains(formatter.format(res.amount) + ".00")
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.account)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.bank_name)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.bank_code)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.branch_name)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.branch_code)
      jpwithdrawal.getJPWithdrawalModalBody().contains(res.name)
      //jpwithdrawal.getJPWithdrawalModalBody().contains(res.account_holder_kanji)
      jpwithdrawal.getJPWithdrawalActionStatusDropdown().contains("processing")
      jpwithdrawal.getJPWIthdrawalActionsCallbackResponse()
      jpwithdrawal.getJPWIthdrawalActionsCallbackResponse().then($callbackResp => {
        cy.writeFile("cypress/textDatas/callbackReponse.json", $callbackResp.val().toString());
        cy.readFile("cypress/textDatas/callbackReponse.json").then((callbackContent) => {
          expect(callbackContent.transaction_number).to.eq(res.transaction_number)
          expect(callbackContent.merchant_transaction_number).to.eq(res.merchant_transaction_number)
          // expect(callbackContent.application_date).to.eq(res.created_at)
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
  })






})

describe("JPAY WITHDRAWAL BULK COMPLETE", () => {
  beforeEach(() => {
    login.visit()
  })

  it("should update all to completed and check transactions status", () => {
    let totalAmount = 0;
    let totalFee = 0;
    for (let y = 0; y < 20; y++) {
      jpWithdrawalBatchStrs()
    }
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    jpwithdrawal.getFiatTransactions().click()
    jpwithdrawal.getJPWithdrawals().click()
    jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
    jpwithdrawal.getJPWithdrawalSearchFilter().select("Merchant Number").should('have.value', "merchant_number")
    jpwithdrawal.getJPWithdrawalSearchField().type(jpWithdrawalValidCreds.stgKazAccNum,)
    jpwithdrawal.getJPWithdrawalDateFromFilter().type(dateToday)
    jpwithdrawal.getJPWithdrawalDateToFilter().type(dateToday)
    jpwithdrawal.getJPWithdrawalFilterButton().click()
    jpwithdrawal.getJPWithdrawalCheckAll().click()
    jpwithdrawal.getJPWithdrawalUpdateRow().contains("Update to Completed").click()
    jpwithdrawal.getJPWithdrawalCompletionYesBtn().click()
    jpwithdrawal.getJPWithdrawalSuccessMessage().contains(JPWithdrawalScsMsg.updatedToCompleted)
    jpwithdrawal.getJPWithdrawalExportButton().click()
    jpwithdrawal.getJPWithdrawalExportConfirmation().click()
    cy.wait(10000)
    cy.task('findAndRenameLatestFile', {
      directoryPath: 'cypress/downloads',
      newFileName: 'jpWithdrawalExport.csv'
    }).then((message) => {
      cy.log(message);
      cy.parseCsv('cypress/downloads/jpWithdrawalExport.csv').then((jsonData) => {
        let totalTxns = jsonData.length
        for (let x = 0; totalTxns > x; x++) {
          expect(JSON.stringify(jsonData[x]["Status"])).to.eq('"' + 'completed' + '"')
          const fe = jsonData[x]["Fee"].replace(/,/g, '');
          const am = jsonData[x]["Amount"].replace(/,/g, '');
          totalAmount += parseFloat(am);
          totalFee += parseFloat(fe)
        }
        cy.log("Fee:" + totalFee + " Amount " + totalAmount)
        jpwithdrawal.getJPWithdrawalTotalTransactions().contains(totalTxns)
        jpwithdrawal.getJPWithdrawalTotalFee().contains("JPY " + formatter.format(totalFee) + ".00")
        jpwithdrawal.getJPWithdrawalTotalAmount().contains("JPY " + formatter.format(totalAmount) + ".00")
      });
      cy.task('deleteFile', 'cypress/downloads/jpWithdrawalExport.csv').then((message) => {
        cy.log(message);
      });
    })
  })

})

describe.only("JPAY WITHDRAWAL EXPORT", () => {
  beforeEach(() => {
    login.visit()
  })

  it.only("should export file and check if the katakana column is half width", () => {
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    jpwithdrawal.getFiatTransactions().click()
    jpwithdrawal.getJPWithdrawals().click()
    jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
    jpwithdrawal.getJPWithdrawalSearchFilter().select("Merchant Number").should('have.value', "merchant_number")
    jpwithdrawal.getJPWithdrawalSearchField().type(jpWithdrawalValidCreds.stgKazAccNum,)
    jpwithdrawal.getJPWithdrawalFilterButton().click()
    jpwithdrawal.getJPWithdrawalExportButton().click()
    jpwithdrawal.getJPWithdrawalExportConfirmation().click()
    // // Wait for the button to change to "Download file"
    // cy.get('.space-x-3 > .rs-btn > div', { timeout: 50000 }).should('have.text', 'Download file').then(() => {
    //   // Click the download button now that it is available
    //   cy.get('.space-x-3 > .rs-btn > div').click();
    // });
    cy.wait(15000)
    cy.task('findAndRenameLatestFile', {
      directoryPath: 'cypress/downloads',
      newFileName: 'jpWithdrawalExport.csv'
    }).then((message) => {
      cy.log(message);
      cy.parseCsv('cypress/downloads/jpWithdrawalExport.csv').then((jsonData) => {
        let totalTxns = jsonData.length
        for (let x = 0; totalTxns > x; x++) {
          const fe = jsonData[x]["Account Holder (KATAKANA)"];
          expect(isHalfWidth(fe)).to.be.true;
        }
      });
      cy.task('deleteFile', 'cypress/downloads/jpWithdrawalExport.csv').then((message) => {
        cy.log(message);
      });
    })
  })


  it.only("should export file and check if the katakana column is full width", () => {
    login.getEmailAddressField().type(emailAddress)
    login.getPasswordField().type(password)
    login.getloginButton().click()
    jpwithdrawal.getFiatTransactions().click()
    jpwithdrawal.getJPWithdrawals().click()
    jpwithdrawal.getJPWithdrawalShowFilterMenu().click()
    jpwithdrawal.getJPWithdrawalSearchFilter().select("Merchant Number").should('have.value', "merchant_number")
    jpwithdrawal.getJPWithdrawalSearchField().type(jpWithdrawalValidCreds.stgKazAccNum,)
    jpwithdrawal.getJPWithdrawalFilterButton().click()
    jpwithdrawal.getJPWithdrawalExportButton().click()
    cy.get('.custom-control').click()
    jpwithdrawal.getJPWithdrawalExportConfirmation().click()
    // // Wait for the button to change to "Download file"
    // cy.get('.space-x-3 > .rs-btn > div', { timeout: 50000 }).should('have.text', 'Download file').then(() => {
    //   // Click the download button now that it is available
    //   cy.get('.space-x-3 > .rs-btn > div').click();
    // });
    cy.wait(15000)
    cy.task('findAndRenameLatestFile', {
      directoryPath: 'cypress/downloads',
      newFileName: 'jpWithdrawalExport.csv'
    }).then((message) => {
      cy.log(message);
      cy.parseCsv('cypress/downloads/jpWithdrawalExport.csv').then((jsonData) => {
        let totalTxns = jsonData.length
        for (let x = 0; totalTxns > x; x++) {
          const fe = jsonData[x]["Account Holder (KATAKANA)"];
          expect(isFullWidth(fe)).to.be.true;
        }
      });
      cy.task('deleteFile', 'cypress/downloads/jpWithdrawalExport.csv').then((message) => {
        cy.log(message);
      });
    })
  })





})




