import request from 'superagent';
const urlListCustomer = "http://localhost:3001/api/customers";


const CustomerService = {
  List() {
    return new Promise((resolve, reject) => {
        let token = localStorage.getItem('token');
      
        request
          .get(urlListCustomer)
          .set('Authorization', 'Bearer ' + token)
          .set('Accept', 'application/json').then(x => {
            resolve(x.body.customers);
          }).catch(err => reject(err))
      
    });
  }
};
export default CustomerService;