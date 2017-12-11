
const ERROR_STATUS = 400;
var PREFIX = "";
if (process.env.host='dev') {
  PREFIX = "http://localhost:8000";
} else if (process.env.host=='deploy') {
  PREFIX = "mighty-mountain-99483.herokuapp.com";
}

const URL = PREFIX + "/backend/v1/logout/";

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
