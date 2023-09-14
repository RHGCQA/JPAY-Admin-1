class manualDepositTest {
    constructor() {
      this.url = "https://admin-stage.orientalwallet.com/login"
      this.title = "manualDepositTest" 
    }

    getManualDepositFiat(){
      return cy.get('#menu-accordion > :nth-child(2) > :nth-child(1)')
    }

    getManualDepositPage(){
      return cy.get('.slide.show > :nth-child(1) > :nth-child(3) > .nav-link')
    }

    getAddNewManualDeposit(){
      return cy.get('.d-flex > .btn')
    }

    getManualDepositAccountNumberField(){
      return cy.get(':nth-child(1) > .col-md-12 > .form-control')
    }

    getManualDepositCurrencyDropdown(){
      return cy.get(':nth-child(3) > :nth-child(1) > .form-control')
    }

    getmanualDepositAmountField(){
      return cy.get(':nth-child(3) > :nth-child(2) > .form-control')
    }

    getManualDepositBankNameField(){
      return cy.get(':nth-child(4) > .col-md-12 > .form-control')
    }

    getManualDepositMerchantNotesField(){
      return cy.get(':nth-child(5) > .col-md-12 > .form-control')
    }

    getManualDepositAdminNotes(){
      return cy.get(':nth-child(6) > .col-md-12 > .form-control')
    }

    getManualDepositAddNewModal(){
      return cy.get('#show-add-new___BV_modal_body_')
    }

    getManualDepositSaveButton(){
      return cy.get(':nth-child(1) > div > .btn-success')
    }

    getManualDepositListCard(){
      return cy.get('.card-default')
    }

    getManualDepositAddNewSuccessMessage(){
      return cy.get('.toast-text')
    }

    getManualDepositInvalidAccountErrorMessage(){
      return cy.get('.my-2 > :nth-child(2)')
    }

    getManualDepositMissingAccountNumberError(){
      return cy.get('.error')
    }

    getManualDepositMissingCurrencyErrorMessage(){
      return cy.get('.error')
    }

    getManualDepositMissingAmountErrorMessage(){
      return cy.get('.error')
    }

    getManualDepositMissingBankNameErrorMessage(){
      return cy.get('.error')
    }

    getManualDepositMissingMerchantNotesErrorMessage(){
      return cy.get('.error')
    }

    getManualDepositMissingAdminNotesErrorMessage(){
      return cy.get('.error')
    }




}
module.exports = manualDepositTest