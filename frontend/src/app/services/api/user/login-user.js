const ERROR_STATUS = 400;

const URL = __API__ + "/backend/v1/login/";

export {loginUser};

function loginUser(user_name, passwd, role)
{
  var status = 200;
  return (fetch(URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user_name, passwd, role})
  })).then((response) => {
    status = response.status;
    return response.json()
  }).then((json) => {
    if(status >= ERROR_STATUS) {
      return {status: false, body: json};
    } else {
      return {status: true, body: json};
    }
  })
}
