import LoginTest from "../../pages/loginPages"
import JPWithdrawalTest from "../../pages/jpWithdrawal"
import MerchantsTest from "../../pages/merchants"
import MerchantAccountDetailsTest from "../../pages/merchantAccountDetails"
import {validloginCredentials, } from "../../stringHolders/loginCredentials"
import {JPWithdrawalValidCredentials} from "../../stringHolders/credentials"
import jpWithdraw from "../../functions/apis"

 
const login = new LoginTest()
const jpWithdrawal = new JPWithdrawalTest()
const merchants = new MerchantsTest()
const merchantDetails = new  MerchantAccountDetailsTest()
const jpWithdrawalB = new jpWithdraw()

 
 describe("Go to Site", () => {
   beforeEach(() => {
     login.visit()

    })
     
   it("should create JP WIthdrawal and complete", () => {
      login.getEmailAddressField().type(validloginCredentials.stageEmailAddress)
      login.getPasswordField().type(validloginCredentials.stagePassword)
      login.getloginButton().click()
      merchants.getMerchants().click()
      merchants.getFilterButton().click()
      merchants.getMerchantNumberField().type(JPWithdrawalValidCredentials.stageAccountNumber)
      merchants.getFilterMerchantButton().click()
      cy.wait(2000)
      merchants.getCloseFilter().click()
      cy.wait(2000)
      merchants.getActionsDropdown().click()
      merchants.getDetailsOnActionsDropdown().click()
      merchantDetails.getJPYAvailableBalance().then($jpyAvail => {
        let jpyAvailable = $jpyAvail.text()
      merchantDetails.getJPYCurrentBalance().then($jpyCurr => {
        let jpyCurrent = $jpyCurr.text()

        jpWithdrawalB.jpayWithdrawalBatch()


     })
    })
    
      

    //   jpWithdrawal.getFiatTransactions().click()
    //   jpWithdrawal.getJPWithdrawals().click()


  })

})




