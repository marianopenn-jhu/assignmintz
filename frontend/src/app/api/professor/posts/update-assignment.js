const ERROR_STATUS = 400;
const URL = "http://localhost:8000/backend/v1/professor/assignment/";

function UpdateAssignmentException(message, response)
{
  this.message = message;
  this.response = response;
  this.name = 'UpdateAssignmentException';
}

function addAssignment(info)
{
  const {professor_id, updated_date, assignment_id} = info;

  fetch(URL + assignment_id + "/", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({professor_id, updated_date})
  }) .then((response) => {
    if(ERROR_STATUS >= 400)
    {
      // Create a new UpdateAssignmentException
      var error = new UpdateAssignmentException(response.statusText, response);
      throw error;
    } else {
      // Return the Assignment ID
      return JSON.parse(response.json());
    }
  }) .catch((error) =>
  {
    throw error;
  });

}
