import routes from '../routes';

describe('Routes', () => {
  it('base url should match the mpesa base routes', () => {
    expect(routes.baseUrl.production).toBe("https://api.safaricom.co.ke");
    expect(routes.baseUrl.development).toBe("https://sandbox.safaricom.co.ke");
  });
  it('auth routes should match the mpesa auth routes', () => {
    expect(routes.auth).toBe("/oauth/v1/generate?grant_type=client_credentials");
  });
  it('B2C routes should match the mpesa B2C routes', () => {
    expect(routes.B2C).toBe("/mpesa/b2c/v1/paymentrequest");
  });
   it('B2B routes should match the mpesa B2B routes', () => {
    expect(routes.B2B).toBe("/mpesa/b2b/v1/paymentrequest");
  });
  it('C2B_Register routes should match the mpesa C2B_Register routes', () => {
    expect(routes.C2BRegister).toBe("/mpesa/c2b/v1/registerurl");
  });
  it('C2B_Simulate routes should match the mpesa C2B_Simulate routes', () => {
    expect(routes.C2BSimulate).toBe("/mpesa/c2b/v1/simulate");
  });
  it('Lipa_Na_Mpesa_Online routes should match the mpesa Lipa_Na_Mpesa_Online routes', () => {
    expect(routes.LipaNaMpesaOnline).toBe("/mpesa/stkpush/v1/processrequest");
  });
  it('Lipa_Na_Mpesa_Query routes should match the mpesa Lipa_Na_Mpesa_Query routes', () => {
    expect(routes.LipaNaMpesaQuery).toBe("/mpesa/stkpushquery/v1/query");
  });
  it('Reversal routes should match the mpesa Reversal routes', () => {
    expect(routes.Reversal).toBe("/mpesa/reversal/v1/request");
  });
  it('Transaction_Status routes should match the mpesa Transaction_Status routes', () => {
    expect(routes.TransactionStatus).toBe( "/mpesa/transactionstatus/v1/query");
  });
  it('Account_Balance routes should match the mpesa Account_Balance routes', () => {
    expect(routes.AccountBalance).toBe("/mpesa/accountbalance/v1/query");
  });
});
