const ERROR_STATUS = 400;
const URL = __API__ + "/backend/v1/professor/assignment/";

export {addAssignment};

function addAssignment(professor_id, assignment_name, type, description, expectedDifficulty, expectedTime, dueDate)
{
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({professor_id, assignment_name, type, description, expectedDifficulty, expectedTime, dueDate})
  }) .then((response) => {
    if(response.status >= ERROR_STATUS)
    {
      throw new Error(response.status + ": " + response.statusText + " in addAssignment()");
    } else {
      return {status: true, result: response};
    }
  }).catch((error) => {
    return {status: false, result: error};
  });
}
