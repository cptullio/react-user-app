import request from 'superagent';
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
  authenticate(username, password) {
    return new Promise((resolve, reject) => {
      request
        .post(urlLogin)
        .send({ name: username, password: password })
        .set('Accept', 'application/json')
        .then(res => {
          localStorage.setItem('token', res.body.token);
          resolve(true);
        }).catch(err => {
          reject(err);
        });
   });
  },
  signout() {
    localStorage.setItem('token', '');
    localStorage.clear();
  }
};
export default Auth;