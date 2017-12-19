const ERROR_STATUS = 400;
const URL = __API__ + "/backend/v1/professor/assignment/";

export {deleteAssignment};

/*
  Return the assignments given the particular filters
*/
function deleteAssignment(assignment_id, filters)
{
  var status = 200;
  return (fetch(URL + assignment_id + "/" + "?" + filters, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })).then((response) => {
    status = response.status;
    if (status >= 400) {
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
