const ERROR_STATUS = 400;
const URL = __API__ + "/backend/v1/professor/assignment/";

export {editAssignment};

function editAssignment(
  assignment_id,
  session_key,
  user_name,
  assignment_name,
  assignment_type,
  course,
  due_date,
  expected_difficulty,
  expected_time,
  description)
{
  var status = 200;
  return (fetch(URL + assignment_id + "/", {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      session_key,
      user_name,
      assignment_name,
      assignment_type,
      course,
      due_date,
      expected_difficulty,
      expected_time,
      description
    })
  })).then((response) => {
    status = response.status;
    if (status >= ERROR_STATUS) {
      return response.json();
    } else {
      return "Empty";
    }
  }).then((json) => {
    if(status >= ERROR_STATUS) {
      return {status: false, body: json};
    } else {
      return {status: true, body: json};
    }
  })
}
