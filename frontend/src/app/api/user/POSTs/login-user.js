const ERROR_STATUS = 400;
const USER_UTIL = require('../user-util.js');
const URL = USER_UTIL.API_PATH + "login/";

function LoginException(message, response)
{
  this.message = message;
  this.response = response;
  this.name = 'LoginException';
}

function loginUser(info)
{
  const {user_name, passwd_hash} = info;

  fetch(URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user_name, passwd_hash})
  }) .then((response) => {
    if(ERROR_STATUS >= 400)
    {
      // Create a new LoginException
      var error = new LoginException(response.statusText, response);
      throw error;
    } else {
      // Return the sessionId
      return JSON.parse(response.json());
    }
  }).catch((error) =>
  {
    throw error;
  });
}
