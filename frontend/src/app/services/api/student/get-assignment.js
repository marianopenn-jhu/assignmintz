const ERROR_STATUS = 400;
const URL = __API__ + "/backend/v1/student/assignment/";

export {getStudentAssignment};

/*
  Return the assignments given the particular filters
*/
function getStudentAssignment(filters)
{
  var status = 200;
  return (fetch(URL + "?" + filters, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })).then((response) => {
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
