const ERROR_STATUS = 400;
const URL = __API__ + "/backend/v1/professor/assignment/";

export {deleteAssignment};

function deleteAssignment(professor_id, assignment_id)
{
  return fetch(URL, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({professor_id, assignment_id})
  }) .then((response) => {
    if(response.status >= ERROR_STATUS)
    {
      throw new Error(response.status + ": " + response.statusText + " in deleteAssignment()");
    } else {
      return {status: true, result: response};
    }
  }).catch((error) => {
    return {status: false, result: error};
  });
}
