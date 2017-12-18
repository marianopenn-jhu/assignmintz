const ERROR_STATUS = 400;
const URL = __API__ + "/backend/v1/student/subtask/";

export {addSubtask};

function addSubtask(student_id, assignment_id)
{
  var status = 200;
  return fetch(URL + assignment_id + "/", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({student_id})
  }).then((response) => {
    status = response.status;
    return response.json()
  }).then((json) => {
    if(status >= ERROR_STATUS) {
      return {status: false, body: json};
    } else {
      return {status: true, body: json};
    }
  })

}
