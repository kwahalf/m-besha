[![Build Status](https://travis-ci.org/kwahalf/m-besha.svg?branch=develop)](https://travis-ci.org/kwahalf/m-besha)

## m-besha
An NPM module that makes it easy to make calls to Mpesa's Daraja API

## Getting Started

First things first, If you don't yet have a developers account with safaricom. Sign up for one [Here](https://developer.safaricom.co.ke/)

>So you now probably have a access to your account, a couple of APIs and documentation
but you don't know what to do next.
Or if you know, it's a lot of work getting started.
m-besha is an out of the box solution for you. 
We let you call any mpesa Daraja API like you would call a class method.
All you have to do is provide any method the appropriate request parameters as stipualated in the 
developer docs

__Done with the first step?__

Go ahead to create an app with your account and be sure to checkout you 
`consumer key` and `customer secrete`because you will need them

If you are not sure on how to create an app, [click here.](https://developer.safaricom.co.ke/user/me/apps) But remember to be logged in

### Install m-besha 
`npm install m-besha --save`

## Now let's try out the Lipa Na M-Pesa Online Payment API
1. lets import Mpesa and create a credentials object with your `customer key`, `customer secrete` and `securityCredential` 

```javascript
import Mpesa from 'm-besha';

const credentials = {
    customer_key: 'put your customer key here',
    customer_secret: 'put your customer credentilas here',
    securityCredential: 'put your Security Credential',
    certificatePath: 'path to certificate' //this is completely optional in development
};
```
Get the customer_key and customer_secrete from the app you create via your safaricom developer account.
or click [here](https://developer.safaricom.co.ke/user/me/apps) to get your `customer_key` and `customer_secrete`

The `securityCredential` for development can be gotten here [development securityCrendential](https://developer.safaricom.co.ke/test_credentials)


Production Security credentail can be gotten when you go live which the `api initiator password`

2. create an mpesa instance and intialize it as below
```javascript
const config = 'development';
const mpesa = new Mpesa(credentials, config);
```
let me take a moment to explain the magic above
```
credentials is the credentials object we created in step one
config is just a string value to determine if you want to use the testing routes or the production routes
it's values can either be "developement" or "production"
```
3. Now lets make a call to the endpoint

```javascript
//for clarity, am going to create a data object with all the request parameters and then destructure it.
//To get a clearer understanding of the request parameters, refer to the developer docs
const data = {
    BusinessShortCode: '174379',
    Password: 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',
    Timestamp: '20180215123520', 
    TransactionType: 'CustomerPayBillOnline',
    Amount: '1',
    PartyA: 'put your phone no here',
    PartyB: 'put your phone no here',
    CallBackURL: 'https://callbacks.com',
    PhoneNumber:09090998,
    AccountReference: 'test',
    TransactionDesc: 'test'
}

const {BusinessShortCode, Password, Timestamp, TransactionType, Amount, PartyA, PartyB, CallBackURL, PhoneNumber, AccountReference, TransactionDesc } = data

//lets use our mpesa instace to call the LipaNaMpesaApi by passing the method call all the request paramaters
mpesa.LipaNaMpesaOnline(BusinessShortCode, Password, Timestamp, TransactionType, Amount, PartyA, PartyB, CallBackURL, PhoneNumber, AccountReference, TransactionDesc).then((response) => console.log(response.data))

/*
  calling mpesa.LipaNaMpesaOnline(), along with anyother methods in besha will return a promise
  So you can opt to use async await or .then(...) 
  Refer to the response schema for more about this
   
*/

// this API initiates online payment on behalf of a customer. 
//The customer will get a prompt to verify the transaction

```

4. On Success, the the return structure which we are console logging will be like this
```javascript
{    
     MerchantRequestID: '14464-4318-1',
     CheckoutRequestID: 'ws_CO_19042019170804623',
     ResponseCode: '0',
     ResponseDescription: 'Success. Request accepted for processing',
     CustomerMessage: 'Success. Request accepted for processing' 
} 
```
5. This should prompts an stk requesting the person whose number was entered to provide a pin. If the pin is entered correctly, you are done. This message body will be sent to the `CallBackURL` 

```javascript

// An accepted request
{
  Body:{
    stkCallback:{
      MerchantRequestID:"14464-4318-1",
      CheckoutRequestID:"ws_CO_19042019170804623",
      ResultCode:0,
      ResultDesc:"The service request is processed successfully.",
      CallbackMetadata:{
        Item:[
          {
            Name:"Amount",
            Value:1
          },
          {
            Name:"MpesaReceiptNumber",
            Value:"LGR7OWQX0R"
          },
          {
            Name:"Balance"
          },
          {
            Name:"TransactionDate",
            Value:20170727154800
          },
          {
            Name:"PhoneNumber",
            Value:254721566839
          }
        ]
      }
    }
  }
}

``` 
6. In case of a failure, which may be triggered by a wrong pin, user cancelling the request or timeout on the transaction. The following response will be sent to the `CallBackUrl`
```javascript
// A cancelled request
{
  Body:{
    stkCallback:{
      MerchantRequestID:"14464-4318-1",
      CheckoutRequestID:"ws_CO_19042019170804623",
      ResultCode:1032,
      ResultDesc:"[STK_CB - ]Request cancelled by user"
    }
  }
}


```

```
calling any other API should be the same, 
Initialize your mpesa instance
and call any API as you wish
```
*Listed bellow are all the methods you can call on your mpesa instance to call any Mpesa Darja API*
```javascript

//calls  API to transit Mpesa Transaction from one company to another.
mpesa.B2B(
    Initiator,
    SecurityCredential,
    CommandID, 
    SenderIdentifierType,
    RecieverIdentifierType, 
    Amount,
    PartyA,
    PartyB,
    AccountReference,
    Remarks,
    QueueTimeOutURL,
    ResultURL)

// calls API to transact between an M-Pesa short code to a phone number registered on M-Pesa
mpesa.B2C(
    InitiatorName,
    SecurityCredential,
    CommandID,
    Amount,
    PartyA,
    PartyB,
    Remarks,
    QueueTimeOutURL,
    ResultURL,
    Occassion )

//calls API to register validation and confirmation URLs on M-Pesa 
mpesa.C2BRegister(
    ShortCode,
    ResponseType,
    ConfirmationURL,
    ValidationURL)

//calls API to simulate a C2B transaction
mpesa.C2BSimulate(
    ShortCode,
    CommandID,
    Amount,
    Msisdn,
    BillRefNumber)

//calls API to initiate lipa na mpesa online 
mpesa.LipaNaMpesaOnline(
    BusinessShortCode,
    Password,
    Timestamp,
    TransactionType,
    Amount,
    PartyA,
    PartyB,
    PhoneNumber,
    CallBackURL,
    AccountReference,
    TransactionDesc ) 
// calls API to check the status of a Lipa Na M-Pesa Online Payment.

mpesa.LipaNaMpesaQuery( 
    BusinessShortCode,
    Password,
    Timestamp,
    CheckoutRequestID) 

// calls API to check the transaction status.
mpesa.TransactionStatus(
    Initiator,
    SecurityCredential,
    CommandIDTransactionStatusQuery,
    TransactionID,
    PartyA,
    IdentifierType1,
    ResultURL,
    QueueTimeOutURL,
    Remarks ,
    Occasion ) 

// calls API to enquire the balance on an 
mpesa.AccountBalance(
    Initiator,
    SecurityCredential,
    CommandIDAccountBalance,
    PartyA,
    IdentifierType4,
    Remarks,
    QueueTimeOutURL,
    ResultURL)

//calls API to reverse a M-Pesa transaction.
mpesa.Reversal(
    Initiator,
    SecurityCredential,
    CommandID,
    TransactionID,
    Amount,
    ReceiverParty,
    RecieverIdentifierType1,
    ResultURL,
    QueueTimeOutURL,
    Remarks,
    Occasion)

/* 
   for all these API calls, remember to refer to the developer docs
   So you are sure what each request parameter does and what data type it is
*/
```

## Response Schema 
```

  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  // `headers` the headers that the server responded with
  // All header names are lower cased
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request: {}
}
```

## Contributing
We apprecite contributions.
Please check [ `CONTRIBUTING.md` ](CONTRIBUTING.md) to get started

## Bugs and Issues
We use githib issue tracker to track bugs issues
Make sure to follow the [ `issues_template` ](docs/ISSUE_TEMPLATE.md) in case of a bug.
At the moment we don't accept requests to featutures


