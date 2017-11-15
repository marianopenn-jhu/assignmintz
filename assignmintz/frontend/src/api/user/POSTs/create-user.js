const ERROR_STATUS = 400;
const URL = "http://localhost:8000/backend/v1/user/";

export {createUser};

function CreateException(message, response)
{
  this.message = message;
  this.response = response;
  this.name = 'CreateException';
}

function createUser(user_name, name, email, passwd, role)
{
  fetch(URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user_name, name, email, passwd, role})
  }) .then((response) => {
    if(response.status >= ERROR_STATUS)
    {
      // Create a new CreateException
      throw new CreateException(response.statusText, response);
    } else {
      // Return the response
      return JSON.parse(response.json());
    }
  }).catch((error) => {
    alert(error.name + ": " + error.message);
  });
}
