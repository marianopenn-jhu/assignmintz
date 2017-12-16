const ERROR_STATUS = 400;
const URL = __API__ + "/backend/v1/course/";

export {createCourse};

function createCourse(session_key, user_name, course_id, course_title, description, professor, students)
{
  var visibile='True';
  return (fetch(URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({session_key, user_name, course_id, course_title, description, visibile, professor, students})
  }) .then((response) => {
    if(response.status >= ERROR_STATUS)
    {
      throw new Error(response.status + ": " + response.statusText + " in createUser()")
    } else {
      return {status: true, body: "Empty"};
    }
  })).catch((error) => {
    return {status: false, body: error};
  });
}
