import React from 'react';

class UserInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      name: '',
      email: '',
      passwd_has: '',
      role: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const state = this.states
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit(event) {
    const {user_name, name, email, passwd_hash, role} = this.state;

    fetch("http://localhost:8000/backend/v1/user/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_name, name, email, passwd_hash, role})
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
      console.log(responseText);
      return responseText;
    })
    .catch((error) =>
    {
      alert(error);
      return error;
    });
  }

   render() {
      return (
        <div>
           <form onSubmit={this.onSubmit}>
             <input type="text" placeholder="User Name" onChange={this.onChange}/>
             <input type="text" placeholder="Name" onChange={this.onChange}/>
             <input type="text" placeholder="Email" onChange={this.onChange}/>
             <input type="text" placeholder="Password" onChange={this.onChange}/>
             <input type="text" placeholder="Role" onChange={this.onChange}/>
             <input type="submit" />
           </form>
           <p> {this.state.code} </p>
         </div>
      );
   }
}

export default UserInfoForm;
