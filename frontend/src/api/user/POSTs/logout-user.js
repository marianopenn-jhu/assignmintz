
const ERROR_STATUS = 400;
const URL = "http://localhost:8000/backend/v1/user/logout/";

function LogoutException(message, response)
{
  this.message = message;
  this.response = response;
  this.name = 'LogoutException';
}

function logoutUser(info)
{
  const {user_id, session_id} = info;

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
      // Create a new LogoutException
      var error = new LogoutException(response.statusText, response);
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
