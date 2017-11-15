const ERROR_STATUS = 400;
const URL = "http://localhost:8000/backend/v1/professor/assignment/";

function AddAssignmentException(message, response)
{
  this.message = message;
  this.response = response;
  this.name = 'AddAssignmentException';
}

function addAssignment(info)
{
  const {professor_id, assignment_name, type, description, expectedDifficulty, expectedTime, dueDate} = info;

  fetch(URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({professor_id, assignment_name, type, description, expectedDifficulty, expectedTime, dueDate})
  }) .then((response) => {
    if(ERROR_STATUS >= 400)
    {
      // Create a new AddAssignmentException
      var error = new AddAssignmentException(response.statusText, response);
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
