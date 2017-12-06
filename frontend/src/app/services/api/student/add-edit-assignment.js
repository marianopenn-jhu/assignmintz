const ERROR_STATUS = 400;
const URL = "http://localhost:8000/backend/v1/student/assignment/";

export {addEditAssignment};

function addEditAssignment(student_id, priority, difficulty, assignment_id)
{
  return fetch(URL + assignment_id + "/", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({student_id, priority, difficulty})
  }) .then((response) => {
    if(response.status >= ERROR_STATUS)
    {
      throw new Error(response.status + ": " + response.statusText + " in addEditAssignment()");
    } else {
      return {status: true, result: response};
    }
  }).catch((error) => {
    return {status: false, result: error};
  });

}
