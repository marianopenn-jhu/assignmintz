const ERROR_STATUS = 400;
const URL = __API__ + "/backend/v1/user/";
export {createUser};

function createUser(user_name, name, email, passwd, role)
{
  return (fetch(URL, {
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
      return {status: true, body: "Empty"};
    }
  })).catch((error) => {
    return {status: false, body: error};
  });
}
