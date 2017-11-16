const ERROR_STATUS = 400;
const URL = "http://localhost:8000/backend/v1/user/login/";

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
      console.log(JSON.parse(response.json()));
      return JSON.parse(response.json());
    }
  }).catch((error) =>
  {
    alert(error.name + ": " + error.message);
  });
}
