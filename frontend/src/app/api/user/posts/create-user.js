const ERROR_STATUS = 400;
const URL = "http://localhost:8000/backend/v1/user/";
const DEPLOYMENT_URL = "mighty-mountain-99483.herokuapp.com/backend/v1/user/"
export {createUser};

function createUser(user_name, name, email, passwd, role)
{
  return fetch(DEPLOYMENT_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user_name, name, email, passwd, role})
  }) .then((response) => {
    if(response.status >= ERROR_STATUS)
    {
      throw new Error(response.status + ": " + response.statusText + " in createUser()")
    } else {
      return {status: true, result: response};
    }
  }).catch((error) => {
    return {status: false, result: error};
  });
}
