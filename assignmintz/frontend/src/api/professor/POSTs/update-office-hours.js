const ERROR_STATUS = 400;
const URL = "http://localhost:8000/backend/v1/professor/assignment/";

function OfficeHoursAssignmentException(message, response)
{
  this.message = message;
  this.response = response;
  this.name = 'OfficeHoursAssignmentException';
}

function addAssignment(info)
{
  const {professor_id, class_id, ta_name, old_time, new_time, assignment_id} = info;

  fetch(URL + assignment_id + "/", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({professor_id, class_id, ta_name, old_time, new_time})
  }) .then((response) => {
    if(ERROR_STATUS >= 400)
    {
      // Create a new OfficeHoursAssignmentException
      var error = new OfficeHoursAssignmentException(response.statusText, response);
      throw error;
    } else {
      // Return the the map of office hours
      return JSON.parse(response.json());
    }
  }) .catch((error) =>
  {
    throw error;
  });

}
