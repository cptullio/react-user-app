const Auth = {
    isAuthenticated(){
      let token = localStorage.getItem('token');
      return token && token.length > 10;
    },
    authenticate(cb) {
      localStorage.setItem('token','123456789022345');
      cb();
    },
    signout() {
      localStorage.setItem('token','');
      localStorage.clear();
    }
  };
  export default Auth;