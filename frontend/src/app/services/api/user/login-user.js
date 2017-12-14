const ERROR_STATUS = 400;
var PREFIX = "";
if (process.env.host=='dev') {
  PREFIX = "http://localhost:8000";
} else if (process.env.host=='deploy') {
  PREFIX = "mysterious-depths-20159.herokuapp.com";
}

const URL = PREFIX + "/backend/v1/login/";

export {loginUser};

function loginUser(user_name, passwd)
{
  return (fetch(URL, {
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
      return response.json();
    }
  })).then((json) =>
  {
    return {status: true, body: json};
  }).catch((error) =>
  {
    return {status: false, body: error};
  });
}
