const ERROR_STATUS = 400;
const URL = "http://localhost:8000/backend/v1/professor/assignment/";

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
    if(ERROR_STATUS >= 400)
    {
      throw new Error(response.status + ": " + response.statusText + " in updateAssignment()");
    } else {
      return {status: true, result: response};
    }
  }).catch((error) => {
    return {status: false, result: error};
  });

}
