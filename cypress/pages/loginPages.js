class LoginTest {
    constructor() {
      this.url = "https://admin-stage.orientalwallet.com/login"
      this.title = "LoginTest" 
    }
   
    visit() {
      cy.visit(this.url)
    }
    getEmailAddressField() {
      return cy.get('[type="email"]')
    }
    getPasswordField() {
      return cy.get('[type="password"]')
    }
    getloginButton() {
      return cy.get('.btn')
    }
    getProfileToggle() {
      return cy.get('#__BVID__19__BV_toggle_')
    }
    getSignOut(){
      return cy.get('.text-center > .dropdown-item')
    }
    getInvalidPasswordErrorMessage (){
      return cy.get('.my-2 > :nth-child(2)')
    }

}
module.exports = LoginTest