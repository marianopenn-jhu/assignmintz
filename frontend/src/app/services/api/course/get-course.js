const ERROR_STATUS = 400;
var PREFIX = "";
if (process.env.host=='dev') {
  PREFIX = "http://localhost:8000";
} else if (process.env.host=='deploy') {
  PREFIX = "mysterious-depths-20159.herokuapp.com";
}

const URL = PREFIX + "/backend/v1/course/";

export {getCourses};

/*
  Return the courses given the particular filters
*/
function getCourses(filters)
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
