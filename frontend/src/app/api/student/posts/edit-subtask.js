const ERROR_STATUS = 400;
const URL = "http://localhost:8000/backend/v1/student/subtask/";

export {editSubtask};

function editSubtask(student_id, new_title, new_description, assignment_id, subtask_id)
{
  return fetch(URL + assignment_id + "/" + subtask_id + "/", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({student_id, new_title, new_description})
  }) .then((response) => {
    if(ERROR_STATUS >= 400)
    {
      throw new Error(response.status + ": " + response.statusText + " in editSubtask()");
    } else {
      return {status: true, result: response};
    }
  }).catch((error) => {
    return {status: false, result: error};
  });
}
