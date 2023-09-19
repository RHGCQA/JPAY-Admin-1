class exchangeRateTest {
    constructor() {
      this.url = "https://admin-stage.orientalwallet.com/login"
      this.title = "exchangeRateTest" 
    }
   
    visit() {
      cy.visit(this.url)
    }
    getAdminSettingsDropdown() {
      return cy.get('#menu-accordion > :nth-child(4) > :nth-child(1)')
    }

    getExchangRatesPage(){
        return cy.get('.slide.show > :nth-child(1) > :nth-child(5) > .nav-link')
    }

    getExchangeRateCurrencyFromDropdown(){
        return cy.get(':nth-child(3) > .col-md-12 > .form-control')
    }

    getExchangeRateCurrencyToDropdown(){
        return cy.get(':nth-child(4) > .col-md-12 > .form-control')
    }

    getExchangeRateFilterButton(){
        return cy.get('.btn-info')
    }

    getExchangeRateStatus(){
        return cy.get('tbody > :nth-child(1) > :nth-child(5)')
    }
    
    getExchangeRateMarkedUpRate(){
        return cy.get('tbody > :nth-child(1) > :nth-child(4)')
    }








}
module.exports = exchangeRateTest