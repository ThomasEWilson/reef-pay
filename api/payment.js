const { genReefPayAddress } = require('./reef_service.js');
const { createPayment} = require("./payment_service.js");

export async function payment(ctx) {
    let { address, newPair } = await genReefPayAddress(); // gen reef address
    let apiKey = ctx.request.headers['apikey']
    let res = await getWebHookUrlAndMerchantAccount(apiKey)
    let webhook = res[0].webhook
    let merchantAccount = res[0].account
    createPayment(address, newPair, webhook, merchantAccount)
    ctx.body = {
        errcode: 0,
        errmsg: "success",
        data: address
    }
}

