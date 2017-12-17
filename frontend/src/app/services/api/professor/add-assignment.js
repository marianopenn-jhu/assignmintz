const ERROR_STATUS = 400;
const URL = __API__ + "/backend/v1/professor/assignment/";

export {addAssignment};

function addAssignment(
  session_key,
  user_name,
  assignment_id,
  assignment_name,
  assignment_type,
  course,
  due_date,
  expected_difficulty,
  actual_difficulty,
  expected_time,
  actual_time,
  priority,
  percent_complete,
  visible,
  description)
{
  var status = 200;
  return (fetch(URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      session_key,
      user_name,
      assignment_id,
      assignment_name,
      assignment_type,
      course,
      due_date,
      expected_difficulty,
      actual_difficulty,
      expected_time,
      actual_time,
      priority,
      percent_complete,
      visible,
      description
    })
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
