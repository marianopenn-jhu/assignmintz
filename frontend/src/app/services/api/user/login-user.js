const ERROR_STATUS = 400;
const URL = "http://localhost:8000/backend/v1/login/";

export {loginUser};

function loginUser(user_name, passwd)
{
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user_name, passwd})
  }) .then((response) => {
    if(response.status >= ERROR_STATUS)
    {
      throw new Error(response.status + ": " + response.statusText + " in loginUser()");
    } else {
      return {status: true, body: response};
    }
  }).catch((error) =>
  {
    return {status: false, body: error};
  });
}
