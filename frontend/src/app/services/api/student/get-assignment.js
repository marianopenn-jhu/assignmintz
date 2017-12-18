const ERROR_STATUS = 400;
const URL = __API__ + "/backend/v1/student/assignment/";

export {getAssignment};

/*
  Return the assignments given the particular filters
*/
function getAssignment(filters)
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
