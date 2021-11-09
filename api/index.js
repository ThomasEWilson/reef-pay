const AWS = require('aws-sdk');
const Amplify = require('aws-amplify');
const { Auth } = Amplify;
const { startPaymentService } = require('./reef_service');
startPaymentService();

Amplify.configure({
    // OPTIONAL - if your API requires authentication 
    Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: 'us-east-2_Aw3C1ge27',
        // REQUIRED - Amazon Cognito Region
        region: 'us-east-2', 
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-2_Aw3C1ge27', 
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '46rnq8nk62f18r478jpt7vg2pf',
    }
});

// SET UP API SIGNIN

AWS.config.update({
    region: 'us-east-2'
});




const dynamodb = new AWS.DynamoDB.DocumentClient();

const tables = {
    payments: 'payments',
    currencies: 'currencies',
    userAccounts: 'user-accounts',
    userMerchants: 'user-merchants'
}

const healthPath = '/health';
const paymentPath = '/payment';
const merchantsPath = '/merchants';

const isGET = (event) => event.httpMethod === 'GET';
const isPOST = (event) => event.httpMethod === 'POST';

exports.handler = async(event) => {
    console.log('Request event: ', event);
    let response;
    switch (true) {
        case isGET(event) && event.path === healthPath:
            response = buildResponse(200, { healthStatus: 'The Reef is Hale and Hearty' });
            break;
        case isGET(event) && event.path === paymentPath:
            response = await getPaymentStatus(event.queryStringParameters.paymentId);
            break;
        case isPOST(event) && event.path === paymentPath:
            response = await savePayment(JSON.parse(event.body));
            break;
        case isPOST(event) && event.path === merchantsPath:
            response = await saveMerchant(JSON.parse(event.body));
            break;
        case isGET(event) && event.path === merchantsPath:
            response = await getMerchants(event.queryStringParameters.userId);
            break;
    }
    return response;
}

function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}

// GET ALL CURRENCIES
async function getCurrencies() {
    const params = {
        TableName: tables.currencies
    }
    const allCurrencies = await scanDynamoRecords(params, []);
    const body = {
        products: allCurrencies
    }
    return buildResponse(200, body);
}

// GET PAYMENT-Status by ID
async function getPaymentStatus(paymentId) {
    const params = {
        TableName: tables.payments,
        Key: {
            'paymentId': paymentId
        }
    }
    return await dynamodb.get(params).promise().then((response) => {
        return buildResponse(200, response.Item);
    }, (error) => {
        console.error('Get Payment Error ', error);
    });
}

// GET ESTIMATE by Params
async function getEstimate(params) {
    return buildResponse(200, params);
    // HIT a GRAPH? for current valuation of reef
    // const params = {
    //   TableName: tables.payments,
    //   Key: {
    //     'paymentId': paymentId
    //   }
    // }
    // return await dynamodb.get(params).promise().then((response) => {
    //   return buildResponse(200, response.Item);
    // }, (error) => {
    //   console.error('Get Payment Error ', error);
    // });
}

// SAVE PAYMENT
export async function savePayment(requestBody) {
    const params = {
        TableName: tables.payments,
        Item: requestBody
    }
    return await dynamodb.put(params).promise().then(() => {
        const body = {
            Operation: 'SAVE',
            Message: 'SUCCESS',
            Item: requestBody
        }
        return buildResponse(200, body);
    }, (error) => {
        console.error('Save Payment Error', error);
    })
}

// SAVE PAYMENT
export async function savePayment(requestBody) {
    const params = {
        TableName: tables.payments,
        Item: requestBody
    }
    return await dynamodb.put(params).promise().then(() => {
        const body = {
            Operation: 'SAVE',
            Message: 'SUCCESS',
            Item: requestBody
        }
        return buildResponse(200, body);
    }, (error) => {
        console.error('Save Payment Error', error);
    })
}

function genAPIkey(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

// SAVE MERCHANT
async function saveMerchant(requestBody) {
    // API KEY STUFF
    let { merchantName, account, webHookUrl } = requestBody;
    let apiKey = genAPIkey(40)
    const merchantData = { merchantName, account, webHookUrl, apiKey }
    const params = {
        TableName: tables.userMerchants,
        Item: merchantData
    }
    return await dynamodb.put(params).promise().then(() => {
        const body = {
            Operation: 'SAVE',
            Message: 'SUCCESS',
            Item: apiKey
        }
        return buildResponse(200, body);
    }, (error) => {
        console.error('Save Merchant Error', error);
    })
}

async function getMerchants(id) {
    const params = {
        TableName: tables.userMerchants,
        Key: {
            'userId': id
        }
    }
    const rows = await scanDynamoRecords(params, []);
    const body = {
        merchants: rows
    }
    return buildResponse(200, body);
}

export async function getMerchantInfo(apiKey) {
    const params = {
        TableName: tables.userMerchants,
        Key: {
            'apiKey': apiKey
        }
    }
    const rows = await dynamodb.get(params).promise().then((response) => {
        return {response.Item.webHook, response.Item.merchantAccount};
    }, (error) => {
        console.error('Get Payment Error ', error);
    });
}

// Enumeration Utility for aggregating Dynamo Records
async function scanDynamoRecords(scanParams, itemArray) {
    try {
        const dynamoData = await dynamodb.scan(scanParams).promise();
        itemArray = itemArray.concat(dynamoData.Items);
        if (dynamoData.LastEvaluatedKey) {
            scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
            return await scanDynamoRecords(scanParams, itemArray);
        }
        return itemArray;
    }
    catch (error) {
        console.error('Scanning Dynamo Records Error ', error);
    }
}
