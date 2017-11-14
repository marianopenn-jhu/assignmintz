const ERROR_STATUS = 400;
const USER_UTIL = require('../user-util.js');
const URL = USER_UTIL.API_PATH;

function CreateException(message, response)
{
  this.message = message;
  this.response = response;
  this.name = 'CreateException';
}

function createUser(info)
{
  const {user_name, name, email, passwd_hash, role} = info;

  fetch(URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user_name, name, email, passwd_hash, role})
  }) .then((response) => {
    if(ERROR_STATUS >= 400)
    {
      // Create a new CreateException
      var error = new CreateException(response.statusText, response);
      throw error;
    } else {
      // Return the response
      return response.json();
    }
  }) .catch((error) =>
  {
    throw error;
  });

}
