import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import api from '../api';
import routes from '../routes';

jest.disableAutomock();

const mockAdapter = new MockAdapter(axios);
const data = {
  InitiatorName: "test name",
  SecurityCredential: "test credential",
  CommandID: "test",
  Amount: "50",
  PartyA: "test",
  PartyB: "test",
  Remarks: "test",
  QueueTimeOutURL: "test",
  ResultURL: "test",
  Occasion: "test",
};

mockAdapter.onGet('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials').reply(200, {
   access_token: "sampleAcessToken"
});

mockAdapter.onPost('https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest').reply(200, {
  data: "sucess"
});

describe('auth0', () => {
  it('should retun a token on sucessful', async () => {
    await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials')
      .then((response) => {
        expect(response.data.access_token).toEqual("sampleAcessToken");
    });
    await api.auth0("sample customer key", "sample secrete", "development")
        .get(routes.auth).then((res) => {
            expect(res.data.access_token).toEqual("sampleAcessToken");
            expect(res.config.headers.Authorization).toEqual("Basic c2FtcGxlIGN1c3RvbWVyIGtleTpzYW1wbGUgc2VjcmV0ZQ==");
    });
  });
});

describe('mpesaApi', () => {
  it('should retun data on sucessful', async () => {
    await axios.post('https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest', data)
      .then((response) => {
        expect(response.data.data).toEqual("sucess");
    });
    await api.mpesaApi("sample customer key", "sample secrete", "development")
        .then(instance => instance.post(routes.B2C, data).then((res) => {
            expect(res.config.headers.Authorization).toEqual("Bearer sampleAcessToken");
    }));
  });
});
