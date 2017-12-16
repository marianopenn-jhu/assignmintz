const ERROR_STATUS = 400;
const __API__ = PREFIX + "/backend/v1/professor/assignment/";

export {updateOfficeHours};

function updateOfficeHours(professor_id, class_id, ta_name, old_time, new_time, assignment_id)
{
  return fetch(URL + assignment_id + "/", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({professor_id, class_id, ta_name, old_time, new_time})
  }) .then((response) => {
    if(response.status >= ERROR_STATUS)
    {
      throw new Error(response.status + ": " + response.statusText + " in updateOfficeHours()");
    } else {
      return {status: true, result: response};
    }
  }).catch((error) => {
    return {status: false, result: error};
  });
}
