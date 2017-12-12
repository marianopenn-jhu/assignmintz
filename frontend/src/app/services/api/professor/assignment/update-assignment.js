const ERROR_STATUS = 400;
var PREFIX = "";
if (process.env.host=='dev') {
  PREFIX = "http://localhost:8000";
} else if (process.env.host=='deploy') {
  PREFIX = "mysterious-depths-20159.herokuapp.com";
}

const URL = PREFIX + "/backend/v1/professor/assignment/";

export {updateAssignment};

function updateAssignment(professor_id, updated_date, assignment_id)
{
  return fetch(URL + assignment_id + "/", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({professor_id, updated_date})
  }) .then((response) => {
    if(response.status >= ERROR_STATUS)
    {
      throw new Error(response.status + ": " + response.statusText + " in updateAssignment()");
    } else {
      return {status: true, result: response};
    }
  }).catch((error) => {
    return {status: false, result: error};
  });

}
