const ERROR_STATUS = 400;
const USER_UTIL = require('../professor-util.js');
const URL = "http://localhost:8000/backend/v1/professor/assignment/";

function DeleteAssignmentException(message, response)
{
  this.message = message;
  this.response = response;
  this.name = 'DeleteAssignmentException';
}

function addAssignment(info)
{
  const {professor_id, assignment_id} = info;

  fetch(URL, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({professor_id, assignment_id})
  }) .then((response) => {
    if(ERROR_STATUS >= 400)
    {
      // Create a new DeleteAssignmentException
      var error = new DeleteAssignmentException(response.statusText, response);
      throw error;
    } else {
      // Return the Assignment ID
      return response.json();
    }
  }) .catch((error) =>
  {
    throw error;
  });

}
