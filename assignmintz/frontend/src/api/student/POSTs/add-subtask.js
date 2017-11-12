const ERROR_STATUS = 400;
const URL = "http://localhost:8000/backend/v1/student/subtask/";

function AddSubtaskException(message, response)
{
  this.message = message;
  this.response = response;
  this.name = 'AddSubtaskException';
}

function addAssignment(info)
{
  const {student_id, assignment_id} = info;

  fetch(URL + assignment_id + "/", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({student_id})
  }) .then((response) => {
    if(ERROR_STATUS >= 400)
    {
      // Create a new AddSubtaskException
      var error = new AddSubtaskException(response.statusText, response);
      throw error;
    } else {
      // Return the the new subtasks
      return JSON.parse(response.json());
    }
  }) .catch((error) =>
  {
    throw error;
  });

}
