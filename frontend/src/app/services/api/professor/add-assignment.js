const ERROR_STATUS = 400;
var PREFIX = "";
if (process.env.host='dev') {
  PREFIX = "http://localhost:8000";
} else if (process.env.host=='deploy') {
  PREFIX = "mighty-mountain-99483.herokuapp.com";
}

const URL = PREFIX + "/backend/v1/login/";

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
  description)
{
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
      description
    })
  }) .then((response) => {
    if(response.status >= ERROR_STATUS)
    {
      throw new Error(response.status + ": " + response.statusText + " in loginUser()");
    } else {
      return {status: true, body: "Empty"};
    }
  })).catch((error) =>
  {
    return {status: false, body: error};
  });
}
