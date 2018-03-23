import rp from'request-promise';
import request from 'request';
import crypto from 'crypto';
import constants from 'constants';
import fs from 'fs';
import routes from './routes'

class mpesa {
    constructor(credential, config){
        const {customer_key, customer_secret, securityCredential, certificatePath } = credential
        this.customer_key = customer_key
        this.customer_secret = customer_secret
        this.certificate = certificatePath
        this.securityCredential = securityCredential
        this.config = config
    }

    O_Auth = ()=> {
        const auth = "Basic " + new Buffer(this.consumer_key + ":" + this.consumer_secret).toString("base64");
        let options = {
            uri: this.config === 'development'?routes.auth.development:routes.auth.production,
            headers: {
                "Authorization": auth
            },
            json: true
        };
        return rp(options);
    }

    security = ()=>{
        //sandbox value for security credential = Security Credential (Shortcode 1)
        //production value for security credential = api initiator password
        let bufferToEncrypt = new Buffer(this.config == 'development'?"Safaricom343!":this.certificate);
        //read the sandbox/production certificate data
        // PATH - e.g "../keys/sandbox-cert.cer"
        let data = fs.readFileSync(this.certificate||"../keys/sandbox-cert");
        //convert data to string
        let privateKey = String(data);
        //encrypt the credential using the privatekey
        let encrypted = crypto.publicEncrypt({
            key: privateKey,
            padding: constants.RSA_PKCS1_PADDING
        }, bufferToEncrypt);
        //convert encrypted value to string and encode to base64
        let securityCredential = encrypted.toString("base64");
        //return value to invoking method
        return securityCredential;
    }

    B2C = (initiatorName, commandId, amount, partyA, partyB, remarks, queueUrl, resultUrl, occasion) => {
        //invoke oauth function in a promise to ensure token is returned before next function is run
        this.O_Auth().then(response => {
            let security_credential = this.security();
            //returned token from function call accesses the access_token value and stores it
            let accessToken = response.access_token;
            let options = {
                method: 'POST',
                uri: this.config === 'development'?routes.B2C.development:routes.B2C.production,
                headers: {
                    "Authorization": "Bearer " + accessToken,
                    "Content-Type": "application/json"
                },
                body: {
                    "InitiatorName": initiatorName,
                    "SecurityCredential": security_credential,
                    "CommandID": commandId,
                    "Amount": amount,
                    "PartyA": partyA,
                    "PartyB": partyB,
                    "Remarks": remarks,
                    "QueueTimeOutURL": queueUrl,
                    "ResultURL": resultUrl,
                    "Occasion": occasion
                },
                json: true
            };
            rp(options)
                .then(function (body) {
                    console.log(body);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }).catch(error => console.log(error));
    }

    B2B = (initiator, commandId, senderId, receiverId, amount, partyA, partyB, accountRef, remarks, queueUrl, resultUrl, occasion) => {
        this.O_Auth().then(response => {
            let security_credential = this.security();
            let accessToken = response.access_token;
            let options = {
                method: 'POST',
                uri: this.config === 'development'?routes.B2B.development:routes.B2B.production,
                headers: {
                    "Authorization": 'Bearer ' + accessToken,
                    "Content-Type": "application/json"
                },
                body: {
                    "Initiator": initiator,
                    "SecurityCredential": security_credential,
                    "CommandID": commandId,
                    "SenderIdentifierType": senderId,
                    "RecieverIdentifierType": receiverId,
                    "Amount": amount,
                    "PartyA": partyA,
                    "PartyB": partyB,
                    "AccountReference": accountRef,
                    "Remarks": remarks,
                    "QueueTimeOutURL": queueUrl,
                    "ResultURL": resultUrl,
                    "Occasion": occasion
                },
                json: true
            };

            rp(options)
                .then(function (body) {
                    console.log(body);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }).catch(error => console.log(error));
    }

    C2B_Register = (shortCode, responseType, confirmationUrl, validationUrl) => {
        this.O_Auth().then(response => {
            let accessToken = response.access_token;
            let options = {
                method: 'POST',
                uri: this.config === 'development'?routes.C2B_Register.development:routes.C2B_Register.production,
                headers: {
                    "Authorization": 'Bearer ' + accessToken,
                    "Content-Type": "application/json"
                },
                body: {
                    "ShortCode": shortCode,
                    "ResponseType": responseType,
                    "ConfirmationURL": confirmationUrl,
                    "ValidationURL": validationUrl
                },
                json: true
            };

            rp(options)
                .then(function (body) {
                    console.log(body);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }).catch(error => console.log(error));
    }

    C2B_Simulate = (shortCode, commandId, amount, msisdn, billRefNumber) => {
        this.O_Auth().then(response => {
            let accessToken = response.access_token;
            let security_credential = this.security();
            let token = accessToken;
            let options = {
                method: 'POST',
                uri: this.config === 'development'?routes.C2B_Simulate.development:routes.C2B_Simulate.production,
                headers: {
                    "Authorization": 'Bearer ' + accessToken,
                    "Content-Type": "application/json"
                },
                body: {
                    "ShortCode": shortCode,
                    "CommandID": commandId,
                    "Amount": amount,
                    "Msisdn": msisdn,
                    "BillRefNumber": billRefNumber
                },
                json: true
            };

            rp(options)
                .then(function (body) {
                    console.log(body);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }).catch(error => console.log(error));
    }

    Lipa_Na_Mpesa_Online = (shortCode, timeStamp, passKey, transactionType, amount, partyA, partyB, phoneNumber, callbackUrl, accountRef, transactionDesc) => {
        this.O_Auth().then(response => {
            let accessToken = response.access_token;
            const short_code = shortCode;
            let time_stamp = timeStamp;
            const pass_key = passKey;
            let password = new Buffer(short_code + pass_key + time_stamp).toString("base64");
            let options = {
                method: 'POST',
                //uri: 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
                uri: this.config === 'development'?routes.Lipa_Na_Mpesa_Online.development:routes.Lipa_Na_Mpesa_Online.production,
                headers: {
                    "Authorization": 'Bearer ' + accessToken,
                    "Content-Type": "application/json"
                },
                body: {
                    "BusinessShortCode": shortCode,
                    "Password": password,
                    "Timestamp": timeStamp,
                    "TransactionType": transactionType,
                    "Amount": amount,
                    "PartyA": partyA,
                    "PartyB": partyB,
                    "PhoneNumber": phoneNumber,
                    "CallBackURL": callbackUrl,
                    "AccountReference": accountRef,
                    "TransactionDesc": transactionDesc
                },
                json: true
            };

            rp(options)
                .then(function (body) {
                    console.log(body);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }).catch(error => console.log(error));
    }

    Lipa_Na_Mpesa_Query = (shortCode, timeStamp, passKey, checkoutRequestId) => {
        this.O_Auth().then(response => {
            let accessToken = response.access_token;
            const short_code = shortCode;
            let time_stamp = timeStamp;
            const pass_key = passKey;
            let password = new Buffer(short_code + pass_key + time_stamp).toString("base64");
            let options = {
                method: 'POST',
                uri: this.config === 'development'?routes.Lipa_Na_Mpesa_Query.development:routes.Lipa_Na_Mpesa_Query.production,
                headers: {
                    "Authorization": 'Bearer ' + accessToken,
                    "Content-Type": "application/json"
                },
                body: {
                    "BusinessShortCode": shortCode,
                    "Password": password,
                    "Timestamp": timeStamp,
                    "CheckoutRequestID": checkoutRequestId
                },
                json: true
            };

            rp(options)
                .then(function (body) {
                    console.log(body);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }).catch(error => console.log(error));
    }

    Reversal = (initiator, commandId, transactionId, amount, receiverParty, receiverIdType, resultUrl, queueUrl, remarks, occasion) => {
        this.O_Auth().then(response => {
            let security_credential = this.security();
            let accessToken = response.access_token;
            let options = {
                method: 'POST',
                uri: this.config === 'development'?routes.Reversal.development:routes.Reversal.production,
                headers: {
                    "Authorization": 'Bearer ' + accessToken,
                    "Content-Type": "application/json"
                },
                body: {
                    "Initiator": initiator,
                    "SecurityCredential": security_credential,
                    "CommandID": commandId,
                    "TransactionID": transactionId,
                    "Amount": amount,
                    "ReceiverParty": receiverParty,
                    "RecieverIdentifierType": receiverIdType,
                    "ResultURL": resultUrl,
                    "QueueTimeOutURL": queueUrl,
                    "Remarks": remarks,
                    "Occasion": occasion
                },
                json: true
            };

            rp(options)
                .then(function (body) {
                    console.log(body);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }).catch(error => console.log(error));
    }

    Transaction_Status = (initiator, commandId, transactionId, partyA, idType, resultUrl, queueUrl, remarks, occasion, originalConversationId) => {
        this.O_Auth().then(response => {
            let security_credential = this.security();
            let accessToken = response.access_token;
            let options = {
                method: 'POST',
                uri: this.config === 'development'?routes.Transaction_Status.development:routes.Transaction_Status.production,
                headers: {
                    "Authorization": 'Bearer ' + accessToken,
                    "Content-Type": "application/json"
                },
                body: {
                    "Initiator": initiator,
                    "SecurityCredential": security_credential,
                    "CommandID": commandId,
                    "TransactionID": transactionId,
                    "PartyA": partyA,
                    "IdentifierType": idType,
                    "ResultURL": resultUrl,
                    "QueueTimeOutURL": queueUrl,
                    "Remarks": remarks,
                    "Occasion": occasion,
                    "OriginalConversationID": originalConversationId
                },
                json: true
            };

            rp(options)
                .then(function (body) {
                    console.log(body);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }).catch(error => console.log(error));
    }

    Account_Balance = (initiator, commandId, partyA, idType, remarks, queueUrl, resultUrl) => {
        this.O_Auth().then(response => {
            let security_credential = this.security();
            let accessToken = response.access_token;
            let options = {
                method: 'POST',
                uri: this.config === 'development'?routes.Account_Balance.development:routes.Account_Balance.production,
                headers: {
                    "Authorization": 'Bearer ' + accessToken,
                    "Content-Type": "application/json"
                },
                body: {
                    "Initiator": initiator,
                    "SecurityCredential": security_credential,
                    "CommandID": commandId,
                    "PartyA": partyA,
                    "IdentifierType": idType,
                    "Remarks": remarks,
                    "QueueTimeOutURL": queueUrl,
                    "ResultURL": resultUrl
                },
                json: true
            };

            rp(options)
                .then(function (body) {
                    console.log(body);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }).catch(error => console.log(error));
    }
    
};

export default mpesa
