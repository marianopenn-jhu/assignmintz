const ERROR_STATUS = 400;
const URL = __API__ + "/backend/v1/user/";

export {getUser};

function getUser(user_name, session_key)
{
	var status = 200;
	var filters = user_name + "&" + session_key;
  	return (fetch(URL + "?" + filters, {
	    method: 'GET',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
			body: undefined
	  })).then((response) => {
	    status = response.status;
	    return response.json()
	  }).then((json) => {
	    if(status >= ERROR_STATUS) {
	      return {status: false, body: json};
	    } else {
	      return {status: true, body: json};
	    }
  })
}
