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
  console.log(JSON.stringify({
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
  }));
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
  }) .then((response) => {
    if(response.status >= ERROR_STATUS)
    {
      throw new Error(response.status + ": " + response.statusText + " in addAssignment()");
    } else {
      return {status: true, body: "Empty"};
    }
  })).catch((error) =>
  {
    return {status: false, body: error};
  });
}
