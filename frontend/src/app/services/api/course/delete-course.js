const ERROR_STATUS = 400;
const URL = __API__ + "/backend/v1/course/";

export {deleteClass};

function deleteClass(course_id)
{
  return fetch(URL + "?course_id=" + course_id, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }) .then((response) => {
    if(response.status >= ERROR_STATUS)
    {
      throw new Error(response.status + ": " + response.statusText + " in deleteClass()");
    } else {
      return {status: true, result: "Empty"};
    }
  }).catch((error) => {
    return {status: false, result: error};
  });
}
