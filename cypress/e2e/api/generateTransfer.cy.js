import 'cypress-plugin-api'
import { generateString } from "../../stringHolders/randomStringGenerator";
import { jpay_stage } from "../../stringHolders/apiEndpoint";
import {JPDepositValidCredentials} from "../../stringHolders/jpayCredentials.js"
import {epayValidCredentials} from "../../stringHolders/epayCredentials.js"



describe('JPAY EPAY GENERATE', () => {

it("POST Generate Transfer", () => {
        cy.request({
        method: 'POST',
        url: jpay_stage.generateTransfer,
        headers: {
            'Content-type': 'application/json'
        },
        body:{
            sid: epayValidCredentials.stagevalidSID,
            uid: epayValidCredentials.uid,
            merchant_number: epayValidCredentials.stageValidAccountNumber,
            am: epayValidCredentials.amount
        },
        });

})


})