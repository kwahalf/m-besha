import crypto from 'crypto';
import constants from 'constants';
import fs from 'fs';
import path from 'path';
import routes from './routes';
import api from './api';

class mpesa {
  constructor(credential, config){
    const {customer_key, customer_secret, securityCredential, certificatePath } = credential;
    this.customer_key = customer_key;
    this.customer_secret = customer_secret;
    this.certificate = certificatePath;
    this.securityCredential = securityCredential;
    this.config = config;
  }

  security = ()=>{
    let bufferToEncrypt = new Buffer(this.config == 'development'?"Safaricom343!":this.securityCredential);
    const defaultCetificatepath = path.join(__dirname, "../keys/sandbox-cert.cer" );
    let data = fs.readFileSync(this.certificate||defaultCetificatepath);
    let privateKey = String(data);
    let encrypted = crypto.publicEncrypt({
      key: privateKey,
      padding: constants.RSA_PKCS1_PADDING
    }, bufferToEncrypt);
    let securityCredential = encrypted.toString("base64");
    return securityCredential;
  }

  B2C = async (initiatorName, commandId, amount, partyA, partyB, remarks, queueUrl, resultUrl, occasion) => {
    const securityCredential = this.security();
    const data = {
      InitiatorName: initiatorName,
      SecurityCredential: securityCredential,
      CommandID: commandId,
      Amount: amount,
      PartyA: partyA,
      PartyB: partyB,
      Remarks: remarks,
      QueueTimeOutURL: queueUrl,
      ResultURL: resultUrl,
      Occasion: occasion,
    };

    try {
    const result = await api.mpesaApi(this.customer_key, this.customer_secret, this.config)
      .then(instance => instance.post(routes.B2C, data ));
    return result;
    }
    catch(error) {
        return error;
    }
  }

  B2B = async (initiator, commandId, senderId, receiverId, amount, partyA, partyB, accountRef, remarks, queueUrl, resultUrl, occasion) => {
    const securityCredential = this.security();
    const data = {
      Initiator: initiator,
      SecurityCredential: securityCredential,
      CommandID: commandId,
      SenderIdentifierType: senderId,
      RecieverIdentifierType: receiverId,
      Amount: amount,
      PartyA: partyA,
      PartyB: partyB,
      AccountReference: accountRef,
      Remarks: remarks,
      QueueTimeOutURL: queueUrl,
      ResultURL: resultUrl,
      Occasion: occasion
    };

    try {
    const result = await api.mpesaApi(this.customer_key, this.customer_secret, this.config)
        .then(instance => instance.post(routes.B2B, data ));
    return result;
    }
    catch(error) {
        return error;
    }
  }

  C2BRegister = async (shortCode, responseType, confirmationUrl, validationUrl) => {
    const data = {
      ShortCode: shortCode,
      ResponseType: responseType,
      ConfirmationURL: confirmationUrl,
      ValidationURL: validationUrl,
    };
    try {
    const result = await api.mpesaApi(this.customer_key, this.customer_secret, this.config)
        .then(instance => instance.post(routes.C2BRegister, data ));
    return result;
    }
    catch(error) {
        return error;
    }
  }

  C2BSimulate = async (shortCode, commandId, amount, msisdn, billRefNumber) => {
    const data ={
      ShortCode: shortCode,
      CommandID: commandId,
      Amount: amount,
      Msisdn: msisdn,
      BillRefNumber: billRefNumber,
    };
    try {
    const result = await api.mpesaApi(this.customer_key, this.customer_secret, this.config)
        .then(instance => instance.post(routes.C2BSimulate, data ));
    return result;
    }
    catch(error) {
        return error;
    }
  }

  LipaNaMpesaOnline = async (shortCode, timeStamp, passKey, transactionType, amount, partyA, partyB, phoneNumber, callbackUrl, accountRef, transactionDesc) => {
    const password = new Buffer(shortCode + passKey + timeStamp).toString("base64");
    const data ={
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timeStamp,
      TransactionType: transactionType,
      Amount: amount,
      PartyA: partyA,
      PartyB: partyB,
      PhoneNumber: phoneNumber,
      CallBackURL: callbackUrl,
      AccountReference: accountRef,
      TransactionDesc: transactionDesc
    };
    try {
    const result = await api.mpesaApi(this.customer_key, this.customer_secret, this.config)
        .then(instance => instance.post(routes.LipaNaMpesaOnline, data ));
    return result;
    }
    catch(error) {
        return error;
    }
  }

  LipaNaMpesaQuery = async (shortCode, timeStamp, passKey, checkoutRequestId) => {
    const password = new Buffer(shortCode + passKey + timeStamp).toString("base64");
    const data ={
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timeStamp,
      CheckoutRequestID: checkoutRequestId
    };
    try {
    const result = await api.mpesaApi(this.customer_key, this.customer_secret, this.config)
        .then(instance => instance.post(routes.LipaNaMpesaQuery, data ));
    return result;
    }
    catch(error) {
        return error;
    }
  }

  Reversal = async (initiator, commandId, transactionId, amount, receiverParty, receiverIdType, resultUrl, queueUrl, remarks, occasion) => {
    const securityCredential = this.security();
    const data = {
      Initiator: initiator,
      SecurityCredential: securityCredential,
      CommandID: commandId,
      TransactionID: transactionId,
      Amount: amount,
      ReceiverParty: receiverParty,
      RecieverIdentifierType: receiverIdType,
      ResultURL: resultUrl,
      QueueTimeOutURL: queueUrl,
      Remarks: remarks,
      Occasion: occasion,
    };
    try {
    const result = await api.mpesaApi(this.customer_key, this.customer_secret, this.config)
        .then(instance => instance.post(routes.Reversal, data ));
    return result;
    }
    catch(error) {
        return error;
    }
  }

  TransactionStatus = async (initiator, commandId, transactionId, partyA, idType, resultUrl, queueUrl, remarks, occasion, originalConversationId) => {
    const securityCredential = this.security();
    const data = {
      Initiator: initiator,
      SecurityCredential: securityCredential,
      CommandID: commandId,
      TransactionID: transactionId,
      PartyA: partyA,
      IdentifierType: idType,
      ResultURL: resultUrl,
      QueueTimeOutURL: queueUrl,
      Remarks: remarks,
      Occasion: occasion,
      OriginalConversationID: originalConversationId
    };
    try {
    const result = await api.mpesaApi(this.customer_key, this.customer_secret, this.config)
        .then(instance => instance.post(routes.TransactionStatus, data ));
    return result;
    }
    catch(error) {
        return error;
    }
  }

  AccountBalance = async (initiator, commandId, partyA, idType, remarks, queueUrl, resultUrl) => {
    const securityCredential = this.security();
    const data = {
      Initiator: initiator,
      SecurityCredential: securityCredential,
      CommandID: commandId,
      PartyA: partyA,
      IdentifierType: idType,
      Remarks: remarks,
      QueueTimeOutURL: queueUrl,
      ResultURL: resultUrl,
    };
    try {
    const result = await api.mpesaApi(this.customer_key, this.customer_secret, this.config)
        .then(instance => instance.post(routes.AccountBalance, data ));
    return result;
    }
    catch(error) {
        return error;
    }
  }
}

export default mpesa;
