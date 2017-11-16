const ERROR_STATUS = 400;
const URL = "http://localhost:8000/backend/v1/student/assignment/";

function StudentAddEditAssignmentException(message, response)
{
  this.message = message;
  this.response = response;
  this.name = 'StudentAddEditAssignmentException';
}

function addAssignment(info)
{
  const {student_id, priority, difficulty, assignment_id} = info;

  fetch(URL + assignment_id + "/", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({student_id, priority, difficulty})
  }) .then((response) => {
    if(ERROR_STATUS >= 400)
    {
      // Create a new StudentAddEditAssignmentException
      var error = new StudentAddEditAssignmentException(response.statusText, response);
      throw error;
    } else {
      // Return the the JSON
      return response.json();
    }
  }) .catch((error) =>
  {
    throw error;
  });

}
