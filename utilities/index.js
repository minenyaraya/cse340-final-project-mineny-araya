const Util = {};

Util.getNav = async function (isLoggedin = false) {
  let list = '<li><a href="/" title="Home page">Home</a></li>';

  if (isLoggedin) {
    list += '<li><a href="/client" title="Client Dashboard">Dashboard</a></li>';
    list += '<li><a href="/logout" title="Logout">Logout</a></li>';
  } else {
    list += '<li><a href="/login" title="Login">Login</a></li>';
    list += '<li><a href="/register" title="Register">Register</a></li>';
  }

  return list;
};

export default Util;
