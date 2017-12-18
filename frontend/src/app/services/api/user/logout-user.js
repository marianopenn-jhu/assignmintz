
const ERROR_STATUS = 400;
const URL = __API__ + "/backend/v1/logout/";

export{logoutUser};

function logoutUser(user_name, session_key)
{
  var status = 200;
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user_name, session_key})
  }).then((response) => {
    status = response.status;
    if (status >= ERROR_STATUS) {
        return response.json()
    } else {
      return "Empty";
    }
  }).then((json) => {
    if(status >= ERROR_STATUS) {
      return {status: false, body: json};
    } else {
      return {status: true, body: json};
    }
  })
}
