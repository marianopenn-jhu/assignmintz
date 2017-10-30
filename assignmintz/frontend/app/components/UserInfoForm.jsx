import React from 'react';

class UserInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { code : 0 };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    fetch("http://localhost:8000/backend/v1/user/", {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        user_name: "ronnie5",
      	name: "testname",
      	email: "testemail@asdasd.com",
      	passwd_hash: "pass",
      	role: "student",
      })
    })
    .then((response) => {
      if(response.status >= 400){
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }else{
        return response.json();
      }
    })
    .then((responseText) => {
      alert(responseText);
    })
    .catch((error) =>
    {
      alert(error);
    });
  }

   render() {
     console.log("Rendering...")
      return (
        <div>
           <form onSubmit={this.onSubmit}>
             <input type="text" placeholder="User Name" ref="user_name"/>
             <input type="text" placeholder="Name" ref="name"/>
             <input type="text" placeholder="Email" ref="email"/>
             <input type="text" placeholder="Password" ref="passwd_hash"/>
             <input type="text" placeholder="Role" ref="role"/>
             <input type="submit" />
           </form>
           <p> {this.state.code} </p>
         </div>
      );
   }
}

export default UserInfoForm;
