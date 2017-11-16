const ERROR_STATUS = 400;
const URL = "http://localhost:8000/backend/v1/user/email/";

export {getUserEmail};

function getUserEmail(user_name)
{
  return fetch(URL, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user_name})
  }) .then((response) => {
    if(ERROR_STATUS >= 400)
    {
      throw new Error(response.status + ": " + response.statusText + " in getUserEmail()");
    } else {
      return {status: true, result: response};
    }
  }).catch((error) => {
    return {status: false, result: error};
  });
}
