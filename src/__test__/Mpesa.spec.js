import Mpesa from '../Mpesa'

const credetials = {
  customer_key: 'exampleCustomerKey',
  customer_secret: 'exampleCustomersecret',
  securityCredential: 'Safaricom343!'
}

describe('Mpesa', () => {
  const mpesa = new Mpesa(credetials, 'development')
  it('should contain config details', () => {
    expect(mpesa.config).toBe('development');
  });
  it('should contain customer credentials', () => {
    expect(mpesa.customer_key).toBe(credetials.customer_key);
    expect(mpesa.customer_secret).toBe(credetials.customer_secret);
    expect(mpesa.securityCredential).toBe(credetials.securityCredential);
  });
});