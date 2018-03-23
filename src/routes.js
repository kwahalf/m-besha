const Routes = {
    auth: {
        production: "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        development: "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    },
    B2C: {
        production: "https://api.safaricom.co.ke/mpesa/b2c/v1/paymentrequest",
        development: "https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest",
    },
    B2B: {
        production: "https://api.safaricom.co.ke/mpesa/b2b/v1/paymentrequest",
        development: "https://sandbox.safaricom.co.ke/mpesa/b2b/v1/paymentrequest",
    },
    C2B_Register: {
        production: "https://api.safaricom.co.ke/mpesa/c2b/v1/registerurl",
        development: "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl",
    },
    C2B_Simulate: {
        production: "https://api.safaricom.co.ke/mpesa/c2b/v1/simulate",
        development: "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate",
    },
    Lipa_Na_Mpesa_Online: {
        production: "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        development: "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    },
    Lipa_Na_Mpesa_Query: {
        production: "https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query",
        development: "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query",
    },
    Reversal: {
        production: "https://api.safaricom.co.ke/mpesa/reversal/v1/request",
        development: "https://sandbox.safaricom.co.ke/mpesa/reversal/v1/request"
    },
    Transaction_Status: {
        production: "https://api.safaricom.co.ke/mpesa/transactionstatus/v1/query",
        development: "https://sandbox.safaricom.co.ke/mpesa/transactionstatus/v1/query",
    },
    Account_Balance: {
        production: "https://api.safaricom.co.ke/mpesa/accountbalance/v1/query",
        development: "https://sandbox.safaricom.co.ke/mpesa/accountbalance/v1/query",
    },
};

export default Routes;
