class manualWithdrawalTest {
    constructor() {
      this.url = "https://admin-stage.orientalwallet.com/login"
      this.title = "manualWithdrawalTest" 
    }

    getManualWithdrawalFiat(){
      return cy.get('#menu-accordion > :nth-child(2) > :nth-child(1)')
    }

    getManualWithdrawalPage(){
      return  cy.get('.slide.show > :nth-child(1) > :nth-child(5) >')
    }

    getManualWithdrawalAddNewButton(){
        return cy.get('.col-md-5 > .btn')
    }

    getManualWithdrawalAccountNumberField(){
        return cy.get(':nth-child(1) > .col-md-12 > .form-control')
    }

    getManualWithdrawalAddNewCardBody(){
        return cy.get('#show-add___BV_modal_body_')
    }

    getManualWithdrawalEquivalentAmount(){
        return cy.get('.text-success > :nth-child(2)')
    }

    getManualWithdrawalAddNewCard(){
        return cy.get('#show-add___BV_modal_body_')
    }

    getManualWithdarawalDebitCurrencyDropdown(){
        return cy.get(':nth-child(3) > :nth-child(1) > .form-control')
    }

    getManualWithdrawalCurrencyDropdown(){
        return cy.get(':nth-child(4) > .mb-3 > .form-control')
    }

    getManualWithdrawalAmountField(){
        return cy.get(':nth-child(4) > :nth-child(2) > div > .form-control')
    }

    getManualWithdrawalAddNewModalBody(){
        return  cy.get('#show-add___BV_modal_body_').click()
    }

    getManualWithdrawalMessageField(){
        return cy.get(':nth-child(5) > .col-md-12 > .form-control')
    }

    getManualWithdrawalAdminNotesField(){
        return cy.get(':nth-child(6) > .col-md-12 > .form-control')
    }

    getManualWithdrawalAddNewSaveButton(){
        return cy.get(':nth-child(1) > div > .btn-success')
    }

    getWithdrawalConfirmationAccountNumber(){
        return cy.get('#show-confirmation___BV_modal_body_ > .row > :nth-child(1)')
    }

    getWithdrawalConfirmationName(){
        return cy.get('#show-confirmation___BV_modal_body_ > .row > :nth-child(2)')
    }

    getWithdrawalConfirmationDebitCurrency(){
        return cy.get('.row > :nth-child(4)')
    }

    getWithdrawalConfirmationCurrency(){
        return cy.get('.row > :nth-child(5)')
    }

    getWithdrawalConfirmationAmount(){
        return cy.get('.row > :nth-child(6)')
    }

    getWithdrawalConfirmationEquivalentAmount(){
        return cy.get('.row > :nth-child(7)')
    }

    getWithdrawalConfirmationMessage(){
        return cy.get('.row > :nth-child(8)')
    }

    getWithdrawalConfirmationAdminNotes(){
        return cy.get('.row > :nth-child(9)')
    }

    getWithdrawalConfirmationSaveButton(){
        return cy.get('#show-confirmation___BV_modal_footer_ > div > .btn-info')
    }

    getManualWithdrawalSuccessMessage(){
        return cy.get('.toast-text')
    }

    getManualWithdrawalCompletedAmount(){
        return cy.get('tbody > :nth-child(1) > :nth-child(7)')
    }
}

module.exports = manualWithdrawalTest