const ERROR_STATUS = 400;
const URL = __API__ + "/backend/v1/course/";

export {addToCourse};

/*
  Return the courses given the particular filters
*/
function addToCourse(course_id, session_key, user_name, students)
{
  var status = 200;
  return (fetch(URL + course_id + "/", {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({session_key, user_name, students})
  })).then((response) => {
    status = response.status;
    if (status >= ERROR_STATUS) {
        return response.json();
    } else {
      return "Empty";
    }
  }).then((json) => {
    if(status >= ERROR_STATUS) {
      return {status: false, body: json};
    } else {
      return {status: true, body: json};
    }
  })
}
