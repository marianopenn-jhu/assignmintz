const ERROR_STATUS = 400;
const URL = __API__ + "/backend/v1/professor/assignment/";

export {getAssignment};

/*
  Return the assignments given the particular filters
*/
function getAssignment(filters)
{
  return (fetch(URL + "?" + filters, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }) .then((response) => {
    if(response.status >= ERROR_STATUS)
    {
      throw new Error(response.status + ": " + response.statusText + " in getCourse()");
    } else {
      return response.json();
    }
  })).then((json) => {
    return {status: true, body: json};
  }).catch((error) => {
    return {status: false, body: error};
  });
}
