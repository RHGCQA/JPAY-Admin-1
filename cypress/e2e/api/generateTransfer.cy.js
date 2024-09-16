import 'cypress-plugin-api'
import { generateString } from "../../stringHolders/randomStringGenerator";
import { jpay_stage } from "../../stringHolders/apiEndpoint";
import {JPDepositValidCredentials} from "../../stringHolders/credentials"

let uId = "DEF" + generateString(15)


describe('JPAY EPAY GENERATE', () => {


it("POST Generate Transfer", () => {
        cy.request({
        method: 'POST',
        url: jpay_stage.generateTransfer,
        headers: {
            'Content-type': 'application/json'
        },
        body:{
            sid: JPDepositValidCredentials.stagevalidSID,
            uid: uId,
            merchant_number: JPDepositValidCredentials.stageValidAccountNumber,
            am: 1000
        },
});

    console.log(JPDepositValidCredentials.stagevalidSID)
})



})