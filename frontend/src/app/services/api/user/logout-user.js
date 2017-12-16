
const ERROR_STATUS = 400;
const URL = __API__ + "/backend/v1/logout/";

export{logoutUser};

function logoutUser(user_name, session_key)
{
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user_name, session_key})
  }) .then((response) => {
    if(response.status >= ERROR_STATUS)
    {
      throw new Error(response.status + ": " + response.statusText + " in logoutUser()");
    } else {
      return {status: true, result: "Empty"};
    }
  }).catch((error) => {
    return {status: false, result: error};
  });
}
