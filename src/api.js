import axios from 'axios';
import routes from './routes';

const api = {
  auth0: (consumerKey, consumerSecret, config) => {
    const auth = "Basic " + new Buffer(consumerKey + ":" + consumerSecret).toString("base64");
    const instance = axios.create({
     baseURL: config === 'development'? routes.baseUrl.development: routes.baseUrl.production ,
     headers: {
       'Authorization': auth,
       'Content-Type': 'application/json',
     },
   });
   return instance;
  },
  mpesaApi: (consumerKey, consumerSecret, config) => {
    return api.auth0(consumerKey, consumerSecret, config)
      .get(routes.auth).then(res =>{return res.data.access_token;})
      .then(accessToken => {
        const instance =  axios.create({
          baseURL: routes.baseUrl.development,
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        });
        return instance;
      });
  },
};

export default api;
