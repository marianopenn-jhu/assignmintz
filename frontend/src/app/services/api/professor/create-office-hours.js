const ERROR_STATUS = 400;
const URL = __API__ + "/backend/v1/professor/assignment/";

export {createOfficeHours};

function createOfficeHours(professor_id, class_id, ta_name, times, assignment_id)
{
  return fetch(URL + assignment_id + "/", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({professor_id, class_id, ta_name, times})
  }) .then((response) => {
    if(response.status >= ERROR_STATUS)
    {
      throw new Error(response.status + ": " + response.statusText + " in createOfficeHours()");
    } else {
      return {status: true, result: response};
    }
  }).catch((error) => {
    return {status: false, result: error};
  });
}
