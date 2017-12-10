const ERROR_STATUS = 400;
var PREFIX = "";
if (process.env.host='dev') {
  PREFIX = "http://localhost:8000";
} else if (process.env.host=='deploy') {
  PREFIX = "mysterious-depths-20159.herokuapp.com";
}

const URL = PREFIX + "/backend/v1/professor/assignment/";

export {getAssignment};

function getAssignment(filter)
{
  return (fetch(URL + "?" + filter, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }) .then((response) => {
    if(response.status >= ERROR_STATUS)
    {
      throw new Error(response.status + ": " + response.statusText + " in updateAssignment()");
    } else {
      return response.json();
    }
  })).then((json) => {
    return {status: true, body: json};
  }).catch((error) => {
    return {status: false, body: error};
  });
}
