var jpay_stage = {
    generateTransfer: "https://api-stage.orientalwallet.com/api/v1/generate-transfer",
    jpDeposit: "https://api-stage.orientalwallet.com/api/v1/deposit-receive?data=",
    jpDepositNoData: "https://api-stage.orientalwallet.com/api/v1/deposit-receive?",
    jpWithdrawalBatch: "https://api-stage.orientalwallet.com/api/v1/withdrawal-receive",
    jpWithdrawalAuto: "https://api-stage.orientalwallet.com/api/v1/jp-withdrawal/jp-create?",
    beeceptorUrlKazuha: "https://a88a8d08e4944638bc716078c2a2b9b6.api.mockbin.io/",
    beeceptorUrlAyaka: "https://a88a8d08e4944638bc716078c2a2b9b6.api.mockbin.io/",
}
var jpaypprod_url = {
    pprodGetDeposit: "https://api-pprod.orientalwallet.com/api/v1/deposit-receive?data=",
    pprodpostWithdrawal: "https://api-pprod.orientalwallet.com/api/v1/withdrawal-receive",
    pprodAutoJPWithdrawal: "https://api-pprod.orientalwallet.com/api/v1/jp-withdrawal/jp-create?",
    pprodBeeceptorURL: "https://joshua699169.free.beeceptor.com",
    pprodLiveDataBeeceptorURL: "https://joshua619.free.beeceptor.com",
    pprodCallbackURL: "https://joshua699169.free.beeceptor.com",
}
var live_url = {
    liveBatchWIthdrawal: "https://jp-api.orientalwallet.com/api/v1/withdrawal-receive",
    liveAutoJPWithdrawal: "https://jp-api.orientalwallet.com/api/v1/jp-withdrawal/jp-create?",
    liveJPDeposit: "https://jp-api.orientalwallet.com/api/v1/deposit-receive?data="
}

module.exports = { jpay_stage, jpaypprod_url, live_url }