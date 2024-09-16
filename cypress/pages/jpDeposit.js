class JPDepositTest {
    constructor() {
      this.url = "https://admin-stage.orientalwallet.com/login"
      this.title = "JPDepositTest" 
    }
   
    visit() {
      cy.visit(this.url)
    }
    getFiatTransactions(){
        return cy.get('#menu-accordion > :nth-child(2) > :nth-child(1)')
    }
    getJPDeposit(){
        return cy.get('.slide.show > :nth-child(1) > :nth-child(2) > .btn')
    }
    getJPDepositTransactions() {
        return cy.get(':nth-child(2) > :nth-child(1) > :nth-child(2) > #submenu-fiat > .sidebar-nav > :nth-child(1) > .nav-link')
    }
    getAddNewJPDepositButton(){
        return cy.get('.row.ml-2 > .d-flex > :nth-child(2)')
    }
    getAccountNumberField(){
        return cy.get(':nth-child(1) > :nth-child(1) > .form-control')
    }
    getAmountField(){
        return cy.get('#show-add-new___BV_modal_body_ > :nth-child(1) > :nth-child(2) > div > .form-control')
    }
    getPaymentIDField(){
        return cy.get(':nth-child(3) > :nth-child(1) > .form-control')
    }
    getUIDField(){
        return cy.get(':nth-child(3) > :nth-child(2) > .form-control')
    }
    getTransferIDField(){
        return cy.get(':nth-child(4) > :nth-child(1) > .form-control')
    }
    getReceivingCurrencyDropdown(){
        return cy.get(':nth-child(4) > :nth-child(2) > .form-control')
    }
    getAdminNotedField(){
        return cy.get('.col-md-12 > .form-control')
    }
    getSaveJPDepositButton(){
        return cy.get(':nth-child(1) > div > .btn-success')
    }
    getSuccessMessageToast(){
        return cy.get('.toast-text')
    }
    getJPDepositCard(){
        return cy.get('.card-default')
    }
    getJPDepositDuplicateErrorMessage(){
        return cy.get('.my-2 > :nth-child(2)')
    }
    getJPDepositMissingAccountNumber(){
        return cy.get('.error')
    }
    getJPDepositMissingAmount(){
        return cy.get('.error')
    }
    getJPDepositMissingPaymentID(){
        return cy.get('.error')
    }
    getJPDepositMissingUID(){
        return cy.get('.error')
    }
    getJPDepositMissingTransferID(){
        return cy.get('.error')
    }
    getJPDepositMissingPaymentID(){
        return cy.get('.error')
    }
    getJPDepositMissingReceivingCurrency(){
        return cy.get('.error')
    }
    getJPDepositMissingAdminNotes(){
        return cy.get('.error')
    }
    getJPDepositMerchantNotFoundErrorMessageCard(){
        return cy.get('.my-2 > :nth-child(2)')
    }
    getJPDepositAddNewCard(){
        return cy.get('#show-add-new___BV_modal_body_')
    }
    getJPDepositMerchantNotFoundErrorMessageAddNewButton(){
        return cy.get('.my-2 > :nth-child(2)')
    }
    getJPDepositMerchantNotFoundErrorMessageOkButton(){
        return cy.get('#g-error-modal___BV_modal_footer_ > div > .btn')
    }
    getJPDepositTransferIDErrorMessage(){
        return cy.get('.my-2 > :nth-child(2)')
    }
    getJPDepositUIDErrorMessage(){
        return cy.get('.my-2 > :nth-child(2)')
    }
    getJPDepositShowFilterMenu(){
        return cy.get('.float-right > a')
    }
    getJPDepositSearchFilter(){
        return cy.get('.input-group-prepend > .form-control')
    }
    getJPDepositSearchFilterField(){
        return cy.get('.input-group > input.form-control')
    }
    getJPDepositFilterButton(){
        return cy.get('.card-footer > .btn-info')
    }
    getJPDepositSelectAllCheckbox(){
        return cy.get('thead > tr > :nth-child(1) > input')
    }
    getJPDepositUpdateAllToCompletedButton(){
        return cy.get('.d-flex > :nth-child(3)')
    }
    getJPDepositYesConfirmationButton(){
        return cy.get(':nth-child(1) > div > .btn-success')
    }
    getJPDepositStatusFilter(){
        return cy.get('.card-body > :nth-child(2) > :nth-child(1) > .form-control')
    }
    getJPDepositJPDepositTransactionCard(){
        return cy.get('.card-default')
    }
    getJPDepositTransactionNumberonList(){
        return cy.get('tbody > tr > :nth-child(5)')
    }
    getJPDepositResetButton(){
        return cy.get('.card-footer > .btn-secondary')
    }
    getJPDepositLastPageButton(){
        return cy.get(':nth-child(2) > .page-link')
    }
    getJPDepositStatusFilter(){
        return cy.get('.card-body > :nth-child(2) > :nth-child(1) > .form-control')
    }
    getCallbackStatusFilter(){
        return cy.get(':nth-child(2) > :nth-child(2) > .form-control')
    }
    getAPITypeFilter(){
        return cy.get(':nth-child(3) > .form-control')
    }
    getDateFromFilter(){
        return cy.get(':nth-child(6) > :nth-child(1) > .form-control')
    }
    getDateToFilter(){
        return cy.get(':nth-child(6) > :nth-child(2) > .form-control')
    }
    getProcessedDateFromFilter(){
        return cy.get(':nth-child(7) > :nth-child(1) > .form-control')
    }
    getProcessedDateToFilter(){
        return cy.get(':nth-child(7) > :nth-child(2) > .form-control')
    }
    getJPDepositCheckAllJPDeposit(){
        return cy.get('thead > tr > :nth-child(1) > input')
    }
    getJPDepositUpdateToCompletedButton(){
        return cy.get('.row.ml-2 > .d-flex > :nth-child(2)')
    }
    getJPDepositSelectAllCheckbox(){
        return cy.get('thead > tr > :nth-child(1) > input')
    }
    getJPDepositUpdateAllToCompletedMissingMerchantNumberErrorMessage(){
        return cy.get('.my-2 > :nth-child(2)')
    }
    getJPDepositCloseFilterRequiredErrorMessageOKButton(){
        return cy.get('#g-error-modal___BV_modal_footer_ > div > .btn')
    }
    getJPDepositSearchFieldRequiredErrorMessage(){
        return cy.get('.error')
    }
    getJPDepositSearchFieldInvalidErrorMessage(){
        return cy.get('.my-2 > :nth-child(2)')
    }


}
module.exports = JPDepositTest