const ERROR_STATUS = 400;
const URL = __API__ + "/backend/v1/student/update/assignment/";

export {editAssignment};

/*
  Return the assignments given the particular filters
*/
function editAssignment(assignment_id, session_key, user_name, student, actual_difficulty, actual_time, done)
{
  var status = 200;
  return (fetch(URL + assignment_id + "/", {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({session_key, user_name, student, actual_difficulty, actual_time, done})
  })).then((response) => {
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
