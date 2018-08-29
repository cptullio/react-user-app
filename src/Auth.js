import request from 'superagent';
import { promises } from 'fs';
const urlLogin = "http://localhost:3001/api/account/";
const urlMe = "http://localhost:3001/api/account/me";


const Auth = {
  isAuthenticated() {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem('token');
      if (!token) {
        resolve(false);
      }
      else {
        request
          .get(urlMe)
          .set('Authorization', 'Bearer ' + token)
          .set('Accept', 'application/json').then(x => {
            console.log(x.body);
            resolve(x.body.user.permissions.length > 0);
          }).catch(x => resolve(false))
      }
    });

  },
  authenticate(username, password, cb) {
    request
      .post(urlLogin)
      .send({ name: username, password: password })
      .set('Accept', 'application/json')
      .then(res => {
        console.log(res.body.token);
        localStorage.setItem('token', res.body.token);
        cb();
      });


  },
  signout() {
    localStorage.setItem('token', '');
    localStorage.clear();
  }
};
export default Auth;