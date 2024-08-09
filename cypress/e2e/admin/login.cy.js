import LoginTest from "../pages/loginPages"
import { invalidloginCredentials, validloginCredentials } from "../stringHolders/loginCredentials"
import {loginErrorMessage} from "../stringHolders/errorMessage"
 
 const login = new LoginTest()
  let emailAddress = validloginCredentials.stageEmailAddress
  let password = validloginCredentials.stagePassword
  let invalidEmailAddress = invalidloginCredentials.stageInvalidEmailAddress
  let invalidPassword = invalidloginCredentials.stageInvalidPassword
  let loginError = loginErrorMessage.invalidPasswordorEmail
 
 describe("Go to Site", () => {
   beforeEach(() => {
     login.visit()

    })
     
   it("[QATouch-ajRX8e] should Log In and Log out", () => {
      login.getEmailAddressField().type(emailAddress)
      login.getPasswordField().type(password)
      login.getloginButton().click()
      login.getProfileToggle().click()
      login.getSignOut().click()
  })

    it("[QATouch-QG3M09] should Log in with invalid both email address and password", () => {
      login.getEmailAddressField().type(invalidEmailAddress)
      login.getPasswordField().type(invalidPassword)
      login.getloginButton().click()
      login.getInvalidPasswordErrorMessage().contains(loginError)
  })

    it("[QATouch-B8JQlX] should Log in with invalid password", () => {
      login.getEmailAddressField().type(emailAddress)
      login.getPasswordField().type(invalidPassword)
      login.getloginButton().click()
      login.getInvalidPasswordErrorMessage().contains(loginError)
  })

    it("[QATouch-WE1R0K] should Log in with invalid email address", () => {
      login.getEmailAddressField().type(invalidEmailAddress)
      login.getPasswordField().type(password)
      login.getloginButton().click()
      login.getInvalidPasswordErrorMessage().contains(loginError)
  })

    it("[QATouch-M7WQlk] should Log in with missing email address", () => {
      login.getPasswordField().type(password)
      login.getloginButton().click()
      login.getInvalidPasswordErrorMessage().contains(loginError)
  })

    it("[QATouch-8VeQ07] should Log in with missing password", () => {
      login.getEmailAddressField().type(emailAddress)
      login.getloginButton().click()
      login.getInvalidPasswordErrorMessage().contains(loginError)
  })

    it("[QATouch-DrxQ09] should Log in with missing both email address and password", () => {
      login.getloginButton().click()
      login.getInvalidPasswordErrorMessage().contains(loginError)
  })

})




