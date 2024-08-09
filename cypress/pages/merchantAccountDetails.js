class MerchantAccountDetailsTest{
    constructor() {
      this.title = "MerchantAccountDetailsTest" 
    }

getJPYAvailableBalance(){
    return cy.get('.col-md-5 > .card > .card-body > .table > tbody > :nth-child(1) > :nth-child(2)')
}

getJPYCurrentBalance(){
    return cy.get('.col-md-5 > .card > .card-body > .table > tbody > :nth-child(1) > :nth-child(3)')
}
}
module.exports = MerchantAccountDetailsTest