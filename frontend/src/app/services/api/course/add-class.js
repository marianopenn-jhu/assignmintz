const ERROR_STATUS = 400;
const URL = "http://localhost:8000/backend/v1/class/";

export {addClass};

function addClass(user_name, class_id)
{
  return (fetch(URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user_name, class_id})
  }) .then((response) => {
    if(response.status >= ERROR_STATUS)
    {
      throw new Error(response.status + ": " + response.statusText + " in addClass()");
    } else {
      return response.json();
    }
  })).then((json) => {
    return {status: true, result: json};
  }).catch((error) => {
    return {status: false, result: error};
  });
}
