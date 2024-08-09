class JPWithdrawalTest {
    constructor() {
      this.title = "JPWithdrawalTest" 
    }

getFiatTransactions(){
    return cy.get('#menu-accordion > :nth-child(2) > :nth-child(1)')
}

getJPWithdrawals(){
    return cy.get('.slide.show > :nth-child(1) > :nth-child(7)')
}

}
module.exports = JPWithdrawalTest