const ERROR_STATUS = 400;
const URL = "http://localhost:8000/backend/v1/class/";

function AddClassException(message, response)
{
  this.message = message;
  this.response = response;
  this.name = 'AddClassException';
}

function deleteClass(info)
{
  const {user_name, class_id} = info;

  fetch(URL, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user_name, class_id})
  }) .then((response) => {
    if(ERROR_STATUS >= 400)
    {
      // Create a new AddClassException
      var error = new AddClassException(response.statusText, response);
      throw error;
    } else {
      return response.json();
    }
  }).catch((error) =>
  {
    throw error;
  });
}
