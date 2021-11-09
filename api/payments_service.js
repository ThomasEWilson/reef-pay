const { getAddressBalance, transferToMainAccount } = require('./reef_service.js'); 
const request = require('request'); 

const SECOND = 1
let payments = new Map();

function addPayment(payment) {
    payments.set(payment.address, payment);
}

export function createPayment(reefAddress, pair, webhook, merchantAccount) {
    let payment = {
        address: reefAddress,
        pair: pair,
        state: "paying",
        webhook: webhook,
        balance: 0,
        merchantAccount: merchantAccount,
        tx: "",
    }
    addPayment(payment)
}

export function updatePaymentTx(address, tx) {
    let payment = payments.get(address);
    payment.tx = tx
}

function webHookNotify(apiUrl, data) {
    console.log(`webhook notify:${apiUrl}, data:${data}`)
    return new Promise((resolve, reject) => {
        request({
            url: apiUrl,
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(data)
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body)
            } else {
                reject(error)
            }
        });
    })
}

async function update() {
    for (let [address, payment] of payments.entries()) {
        switch (payment.state) {
            case 'pending':
                let balance = await getAddressBalance(payment.address)
                if (balance != '0') {
                    payment.balance = balance
                    payment.state = 'routing'
                    await webHookNotify(payment.webhook, { "paymentAddress": payment.address })
                } else {
                    if (timeStampNow() - payment.createTime > 30 * SECOND) {
                        payments.delete(address)
                    }
                }
                break
            case 'routing':
                transferToMainAccount(payment.address, payment.merchantAccount, payment.balance, payment.pair)
                payment.state = 'done'
                break
            case 'complete':
                payments.delete(address)
                break
            case 'error':
                payments.delete(address)
                break
            default:
        }
    }
}

setInterval(update, 1000);

export function startPaymentService() {

}