const ERROR_STATUS = 400;
const __API__ = PREFIX + "/backend/v1/professor/assignment/";

export {updateOfficeHours};

function updateOfficeHours(professor_id, class_id, ta_name, old_time, new_time, assignment_id)
{
  var status = 200;
  return fetch(URL + assignment_id + "/", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    body: JSON.stringify({professor_id, class_id, ta_name, old_time, new_time})
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
