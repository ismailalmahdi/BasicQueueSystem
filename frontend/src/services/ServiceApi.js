import Axios from 'axios';
import CustomerTakeANumber from '../components/CustomerTakeANumber';

const clientId = 'UYpBkKY6vYW72ayc7ovAZ5xvUapQ3a8TucsGI2jS';
const clientSecret = 'REvBZR4e1yVflIrF1FAWcLVl08ZtewuxinaQsSNt6XKpxar6v17LvjkrCkKVDqHQUTDCcLfuZfm1V7JQ0C9qdKnYQpbjjjMrYMt76kdzTtE3xGv4ZaxdX9TnLsTeadZu';

let _accessToken;

export function getAccessToken() {
  return new Promise((resolve) => {
    if (_accessToken) {
      resolve(_accessToken);
    } else {
      const data = {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'read'
      }
      Axios.post('/o/token/', data).then((response) => {
        _accessToken = response.data.access_token;
        resolve(_accessToken);
      });
    }
  });
}

// not needed for this project 
export async function getConfig() {
  const accessToken = await getAccessToken();
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };
  return new Promise((resolve) => {
    resolve(config);
  });
}



export default {
  async retrieveWishlist() {
    return new Promise(resolve => resolve([1]));
    const config = await getConfig();
    return new Promise((resolve) => {
      Axios.get('/api/v1/wishlist/', config).then((response) => {
        resolve(response.data);
      });
    });
  },


  async retrieveCounterList(pageIndex, queryParams) {
    const config = {};
    config['params'] = queryParams;
    config['params']['page'] = pageIndex;
    return new Promise((resolve) => {
      Axios.get('/api/v1/counters/', config).then((response) => {
        console.log(response.data)
        resolve(response.data);
      });
    });
  },

  async getNextCounterInQueue(counter){
    return new Promise(resolve => { 
      Axios.get('api/v1/customers/?search=PN&&limit=1').then((response) => {
        if(response.data.results.length > 0){

        
        try{
          this.updateCustomerStatus(counter.customer,"SR")
        }catch(err){

        };
        this.updateCounterNextCustomer(counter.id,response.data.results[0].id)
        this.updateCustomerStatus(response.data.results[0].id,"SR")
        resolve(response.data);
      }
      resolve({results: [{id:"Queue Empty"}]});
      });
    });
  },

  async getLatestServingCustomer(){
    return new Promise(resolve => { 
      Axios.get('api/v1/customers/?ordering=-id&search=SR&limit=1').then((response) => {
        if(response.data.results.length > 0){
       
        resolve(response.data);
      }
      resolve({results: [{id:"None"}]});
      });
    });
  },

  async getLatestQueueNumber(){
    return new Promise(resolve => { 
      Axios.get('api/v1/customers/?ordering=-id&limit=1').then((response) => {
        if(response.data.results.length > 0){
       
        resolve(response.data);
      }
      resolve({results: [{id:"None"}]});
      });
    });
  },

  async updateCounterNextCustomer(id,customerId){
      return new Promise(resolve => {
        const data = {
          "customer": customerId,
        }
        return Axios.patch(`api/v1/counters/${id}/`,data);
      });
  },

  async updateCustomerStatus(id,status){
    return new Promise(resolve => {
      const data = {
        "status": status,
      }
      return Axios.patch(`api/v1/customers/${id}/`,data);
    });
  },

  async CustomerTakeANumber(){
    return new Promise(resolve => {
      Axios.post(`api/v1/customers/new`).then((response) => {
        resolve(response.data);
      });
    });
  },

  async counterStatus(id, status){
    return new Promise(resolve => {
      let sat = "ON";
      if(!status){
        sat = "OF";
      }
      const data = {
        "id" : id,
        "status": sat,
      }
      return Axios.patch(`api/v1/counters/${id}/`,data);
    });
  },

  async counterOnlineStatus(data){
    data.customer = null;
    return new Promise(resolve => {
      Axios.patch(`api/v1/counters/${data.id}/`,data).then((response) => {
        resolve(response.data);
      });
    });
  }

}
