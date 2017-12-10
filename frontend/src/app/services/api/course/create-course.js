const ERROR_STATUS = 400;
var PREFIX = "";
if (process.env.host='dev') {
  PREFIX = "http://localhost:8000";
} else if (process.env.host=='deploy') {
  PREFIX = "mighty-mountain-99483.herokuapp.com";
}

const URL = PREFIX + "/backend/v1/course/";

export {createCourse};

function createCourse(course_id, course_title, description, professor)
{
  return (fetch(URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({course_id, course_title, description, professor})
  }) .then((response) => {
    if(response.status >= ERROR_STATUS)
    {
      throw new Error(response.status + ": " + response.statusText + " in createCourse()");
    } else {
      return response.json();
    }
  })).then((json) => {
    return {status: true, body: json};
  }).catch((error) => {
    return {status: false, body: error};
  });
}
