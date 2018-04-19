const Routes = {
    baseUrl: {
        production: "https://api.safaricom.co.ke",
        development: "https://sandbox.safaricom.co.ke",
    },
    auth: "/oauth/v1/generate?grant_type=client_credentials",
    B2C: "/mpesa/b2c/v1/paymentrequest",
    B2B: "/mpesa/b2b/v1/paymentrequest",
    C2BRegister: "/mpesa/c2b/v1/registerurl",
    C2BSimulate: "/mpesa/c2b/v1/simulate",
    LipaNaMpesaOnline: "/mpesa/stkpush/v1/processrequest",
    LipaNaMpesaQuery: "/mpesa/stkpushquery/v1/query",
    Reversal: "/mpesa/reversal/v1/request",
    TransactionStatus: "/mpesa/transactionstatus/v1/query",
    AccountBalance: "/mpesa/accountbalance/v1/query",
};

export default Routes;
