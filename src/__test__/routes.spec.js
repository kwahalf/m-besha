import routes from '../routes';

describe('Routes', () => {
  it('auth routes should match the mpesa auth routes', () => {
    expect(routes.auth.production).toBe("https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials");
    expect(routes.auth.development).toBe("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials");
  });
  it('B2C routes should match the mpesa B2C routes', () => {
    expect(routes.B2C.production).toBe("https://api.safaricom.co.ke/mpesa/b2c/v1/paymentrequest");
    expect(routes.B2C.development).toBe("https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest");
  });
   it('B2B routes should match the mpesa B2B routes', () => {
    expect(routes.B2B.production).toBe("https://api.safaricom.co.ke/mpesa/b2b/v1/paymentrequest");
    expect(routes.B2B.development).toBe("https://sandbox.safaricom.co.ke/mpesa/b2b/v1/paymentrequest");
  });
  it('C2B_Register routes should match the mpesa C2B_Register routes', () => {
    expect(routes.C2B_Register.production).toBe("https://api.safaricom.co.ke/mpesa/c2b/v1/registerurl");
    expect(routes.C2B_Register.development).toBe("https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl");
  });
  it('C2B_Simulate routes should match the mpesa C2B_Simulate routes', () => {
    expect(routes.C2B_Simulate.production).toBe("https://api.safaricom.co.ke/mpesa/c2b/v1/simulate");
    expect(routes.C2B_Simulate.development).toBe("https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate");
  });
  it('Lipa_Na_Mpesa_Online routes should match the mpesa Lipa_Na_Mpesa_Online routes', () => {
    expect(routes.Lipa_Na_Mpesa_Online.production).toBe("https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest");
    expect(routes.Lipa_Na_Mpesa_Online.development).toBe("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest");
  });
  it('Lipa_Na_Mpesa_Query routes should match the mpesa Lipa_Na_Mpesa_Query routes', () => {
    expect(routes.Lipa_Na_Mpesa_Query.production).toBe("https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query");
    expect(routes.Lipa_Na_Mpesa_Query.development).toBe("https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query");
  });
  it('Reversal routes should match the mpesa Reversal routes', () => {
    expect(routes.Reversal.production).toBe("https://api.safaricom.co.ke/mpesa/reversal/v1/request");
    expect(routes.Reversal.development).toBe("https://sandbox.safaricom.co.ke/mpesa/reversal/v1/request");
  });
  it('Transaction_Status routes should match the mpesa Transaction_Status routes', () => {
    expect(routes.Transaction_Status.production).toBe( "https://api.safaricom.co.ke/mpesa/transactionstatus/v1/query");
    expect(routes.Transaction_Status.development).toBe( "https://sandbox.safaricom.co.ke/mpesa/transactionstatus/v1/query");
  });
  it('Account_Balance routes should match the mpesa Account_Balance routes', () => {
    expect(routes.Account_Balance.production).toBe("https://api.safaricom.co.ke/mpesa/accountbalance/v1/query");
    expect(routes.Account_Balance.development).toBe("https://sandbox.safaricom.co.ke/mpesa/accountbalance/v1/query");
  });
});
