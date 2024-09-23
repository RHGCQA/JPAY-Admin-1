import { generateString } from './randomStringGenerator'

let uid = "EPT" + generateString(10)

var epayValidCredentials= {
    stagevalidSID: "MT_FNP-5204210",
    stageValidAccountNumber: "3506490250",
    stageValidMerchantName: "Rai,den Sho,gun",
    uid: uid,
    pystgVendor: "PYSTG",
    amount: Math.floor((Math.random(1000) * 99999) + 1),
}


module.exports =  {epayValidCredentials};