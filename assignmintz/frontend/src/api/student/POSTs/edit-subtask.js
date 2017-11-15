const ERROR_STATUS = 400;
const URL = "http://localhost:8000/backend/v1/student/subtask/";

function EditSubtask(message, response)
{
  this.message = message;
  this.response = response;
  this.name = 'EditSubtask';
}

function addAssignment(info)
{
  const {student_id, new_title, new_description, assignment_id, subtask_id} = info;

  fetch(URL + assignment_id + "/" + subtask_id + "/", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({student_id, new_title, new_description})
  }) .then((response) => {
    if(ERROR_STATUS >= 400)
    {
      // Create a new EditSubtask
      var error = new EditSubtask(response.statusText, response);
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
