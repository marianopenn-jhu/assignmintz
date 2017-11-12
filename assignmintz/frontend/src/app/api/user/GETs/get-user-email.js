const ERROR_STATUS = 400;
const USER_UTIL = require('../user-util.js');
const URL = USER_UTIL.API_PATH + "email/";

function GetEmailException(message, response)
{
  this.message = message;
  this.response = response;
  this.name = 'GetEmailException';
}

function loginUser(info)
{
  const {user_name} = info;

  fetch(URL, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user_name})
  }) .then((response) => {
    if(ERROR_STATUS >= 400)
    {
      // Create a new GetEmailException
      var error = new GetEmailException(response.statusText, response);
      throw error;
    } else {
      // Return the user's email
      return JSON.parse(response.json());
    }
  }).catch((error) =>
  {
    throw error;
  });
}
