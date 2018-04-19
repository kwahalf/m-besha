import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAdapter = new MockAdapter(axios);
export const B2Cdata = {
  InitiatorName: "test name",
  CommandID: "test",
  Amount: "50",
  PartyA: "test",
  PartyB: "test",
  Remarks: "test",
  QueueTimeOutURL: "test",
  ResultURL: "test",
  Occasion: "test",
}

export const B2Bdata = {
  InitiatorName: "test name",
  CommandID: "test",
  SenderIdentifierType: "test sender Identifier type",
  RecieverIdentifierType: "test reciever Identifier type",
  Amount: 50,
  PartyA: "test",
  PartyB: "test",
  Remarks: "test",
  QueueTimeOutURL: "test",
  ResultURL: "test",
  Occasion: "test",
}

export const C2BSimulatedata = {
  ShortCode: "test shortCode",
  ResponseType: "test responseType",
  ConfirmationURL: "test confirmationUrl",
  ValidationURL: "test validationUrl",
}

export const C2BRegisterdata = {
  ShortCode: "test shortCode",
  CommandID: "test commandId",
  Amount: 50,
  Msisdn: "test msisdn",
  BillRefNumber: "test billRefNumber",
}

export const LipaNaMpesaOnlinedata = {
  BusinessShortCode: "example shortCode",
  Password: "test password",
  Timestamp: "test timeStamp",
  TransactionType: "test transactionType",
  Amount: 50,
  PartyA: "test partyA",
  PartyB: "test partyB",
  PhoneNumber: "test phoneNumber",
  CallBackURL: "test callbackUrl",
  AccountReference: "test accountRef",
  TransactionDesc: "test transactionDesc",
}

export const LipaNaMpesaQuerydata ={
  BusinessShortCode: "test shortCode",
  Password: "test password",
  Timestamp: "test timeStamp",
  CheckoutRequestID: "test checkoutRequestId",
}

export const Reversaldata ={
  Initiator: "test initiator",
  SecurityCredential: "test securitycredential",
  CommandID: "test commandId",
  TransactionID: "test transactionId",
  Amount: "test amount",
  ReceiverParty: "test receiverParty",
  RecieverIdentifierType: "test receiverIdType",
  ResultURL: "test resultUrl",
  QueueTimeOutURL: "test queueUrl",
  Remarks: "test remarks",
  Occasion: "test occasion",
}

export const TransactionStatusdata = {
  Initiator: "test initiator",
  SecurityCredential: "test security credential",
  CommandID: "test commandId",
  TransactionID: "test transactionId",
  PartyA: "test partyA",
  IdentifierType: "test idType",
  ResultURL: "test resultUrl",
  QueueTimeOutURL: "test queueUrl",
  Remarks: "test remarks",
  Occasion: "test occasion",
  OriginalConversationID: "test originalConversationId"
}

export const AccountBalancedata = {
  Initiator: "test initiator",
  SecurityCredential: "test security credential",
  CommandID: "test commandId",
  PartyA: "test partyA",
  IdentifierType: "test idType",
  Remarks: "test remarks",
  QueueTimeOutURL: "test queueUrl",
  ResultURL: "test resultUrl",
}

mockAdapter.onGet('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials').reply(200, {
         access_token: "sampleAcessToken",
         expires_in: "3599",
     });

mockAdapter.onPost('https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest').reply(200, {
       data: "sucess"
     });

mockAdapter.onPost('https://sandbox.safaricom.co.ke/mpesa/b2b/v1/paymentrequest').reply(200, {
       data: "sucess"
     });

mockAdapter.onPost('https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl').reply(200, {
       data: "sucess"
     });

mockAdapter.onPost('https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate').reply(200, {
       data: "sucess"
     });

mockAdapter.onPost('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest').reply(200, {
       data: "sucess"
     });

mockAdapter.onPost('https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query').reply(200, {
       data: "sucess"
     });

mockAdapter.onPost('https://sandbox.safaricom.co.ke/mpesa/reversal/v1/request').reply(200, {
       data: "sucess"
     });

mockAdapter.onPost('https://sandbox.safaricom.co.ke/mpesa/transactionstatus/v1/query').reply(200, {
       data: "sucess"
     });

mockAdapter.onPost('https://sandbox.safaricom.co.ke/mpesa/accountbalance/v1/query').reply(200, {
       data: "sucess"
     });

export default axios;
