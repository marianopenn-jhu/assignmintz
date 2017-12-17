const ERROR_STATUS = 400;
const URL = __API__ + "/backend/v1/user/";
export {createUser};

function createUser(user_name, name, email, passwd, role)
{
  var status = 200;
  return (fetch(URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user_name, name, email, passwd, role})
  })).then((response) => {
    status = response.status;
    if (status >= ERROR_STATUS) {
        return response.json()
    } else {
      return "Empty";
    }
  }).then((json) => {
    if(status >= ERROR_STATUS) {
      console.log(json);
      return {status: false, body: json};
    } else {
      return {status: true, body: json};
    }
  })
}
