const ERROR_STATUS = 400;
var PREFIX = "";
if (process.env.host='dev') {
  PREFIX = "http://localhost:8000";
} else if (process.env.host=='deploy') {
  PREFIX = "mighty-mountain-99483.herokuapp.com";
}

const URL = PREFIX + "/backend/v1/course/";

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
      return {status: true, result: response};
    }
  }).catch((error) => {
    return {status: false, result: error};
  });
}
