import Mpesa from '../Mpesa';
import axios, { //eslint-disable-line no-unused-vars
  B2Cdata,
  B2Bdata,
  C2BRegisterdata,
  C2BSimulatedata,
  LipaNaMpesaOnlinedata,
  LipaNaMpesaQuerydata,
  Reversaldata,
  TransactionStatusdata,
  AccountBalancedata,
} from '../../__mocks__/mockapi';

jest.disableAutomock();

const credetials = {
  customer_key: 'exampleCustomerKey',
  customer_secret: 'exampleCustomersecret',
  securityCredential: 'Safaricom343!'
};

describe('Mpesa', () => {
  const mpesa = new Mpesa(credetials, 'development');
  it('should contain config details', () => {
    expect(mpesa.config).toBe('development');
  });
  it('should contain customer credentials', () => {
    expect(mpesa.customer_key).toBe(credetials.customer_key);
    expect(mpesa.customer_secret).toBe(credetials.customer_secret);
    expect(mpesa.securityCredential).toBe(credetials.securityCredential);
  });
});

describe('security', () => {
  const mpesa = new Mpesa(credetials, 'development');
  const encrypt = mpesa.security();
  it('should return correct security credential', () => {
    expect(encrypt).toBeTruthy();
  });
});

describe('B2C', () => {
  it('should make a successful call', async () => {
   const mpesa = new Mpesa(credetials, 'development');
   const r = await mpesa.B2C(B2Cdata);
   expect(r.data.data).toBe("sucess");
   expect(r.config.headers.Authorization).toBe("Bearer sampleAcessToken");
   expect(r.config.headers.Accept).toContain("application/json");
  });
});

describe('B2B', () => {
  it('should make a successful call', async () => {
   const mpesa = new Mpesa(credetials, 'development');
   const r = await mpesa.B2B(B2Bdata);
   expect(r.data.data).toBe("sucess");
   expect(r.config.headers.Authorization).toBe("Bearer sampleAcessToken");
   expect(r.config.headers.Accept).toContain("application/json");
  });
});

describe('C2BRegister', () => {
  it('should make a successful call', async () => {
   const mpesa = new Mpesa(credetials, 'development');
   const r = await mpesa.C2BRegister(C2BRegisterdata);
   expect(r.data.data).toBe("sucess");
   expect(r.config.headers.Authorization).toBe("Bearer sampleAcessToken");
   expect(r.config.headers.Accept).toContain("application/json");
  });
});

describe('C2BSimulate', () => {
  it('should make a successful call', async () => {
   const mpesa = new Mpesa(credetials, 'development');
   const r = await mpesa.C2BSimulate(C2BSimulatedata);
   expect(r.data.data).toBe("sucess");
   expect(r.config.headers.Authorization).toBe("Bearer sampleAcessToken");
   expect(r.config.headers.Accept).toContain("application/json");
  });
});

describe('LipaNaMpesaOnline', () => {
  it('should make a successful call', async () => {
   const mpesa = new Mpesa(credetials, 'development');
   const r = await mpesa.LipaNaMpesaOnline(LipaNaMpesaOnlinedata);
   expect(r.data.data).toBe("sucess");
   expect(r.config.headers.Authorization).toBe("Bearer sampleAcessToken");
   expect(r.config.headers.Accept).toContain("application/json");
  });
});

describe('LipaNaMpesaQuery', () => {
  it('should make a successful call', async () => {
   const mpesa = new Mpesa(credetials, 'development');
   const r = await mpesa.LipaNaMpesaQuery(LipaNaMpesaQuerydata);
   expect(r.data.data).toBe("sucess");
   expect(r.config.headers.Authorization).toBe("Bearer sampleAcessToken");
   expect(r.config.headers.Accept).toContain("application/json");
  });
});

describe('LipaNaMpesaQuery', () => {
  it('should make a successful call', async () => {
   const mpesa = new Mpesa(credetials, 'development');
   const r = await mpesa.Reversal(Reversaldata);
   expect(r.data.data).toBe("sucess");
   expect(r.config.headers.Authorization).toBe("Bearer sampleAcessToken");
   expect(r.config.headers.Accept).toContain("application/json");
  });
});

describe('TransactionStatus', () => {
  it('should make a successful call', async () => {
   const mpesa = new Mpesa(credetials, 'development');
   const r = await mpesa.TransactionStatus(TransactionStatusdata);
   expect(r.data.data).toBe("sucess");
   expect(r.config.headers.Authorization).toBe("Bearer sampleAcessToken");
   expect(r.config.headers.Accept).toContain("application/json");
  });
});

describe('AccountBalance', () => {
  it('should make a successful call', async () => {
   const mpesa = new Mpesa(credetials, 'development');
   const r = await mpesa.AccountBalance(AccountBalancedata);
   expect(r.data.data).toBe("sucess");
   expect(r.config.headers.Authorization).toBe("Bearer sampleAcessToken");
   expect(r.config.headers.Accept).toContain("application/json");
  });
});
