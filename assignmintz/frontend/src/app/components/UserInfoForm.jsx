import React from 'react';

class UserInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      name: '',
      email: '',
      passwd: '',
      role: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(event) {
    const {user_name, name, email, passwd_hash, role} = this.state;

    fetch("http://localhost:8000/backend/v1/user/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user_name, name, email, passwd, role})
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
             <input type="text" class="input_form_sign d_block active_inp" name="user_name" placeholder="User Name" onChange={this.onChange}/>
             <input type="text" class="input_form_sign d_block active_inp" name="name" placeholder="Name" onChange={this.onChange}/>
             <input type="text" class="input_form_sign" name="email" placeholder="Email" onChange={this.onChange}/>
             <input type="text" class="input_form_sign d_block  active_inp" name="passwd" placeholder="Password" onChange={this.onChange}/>
             <input type="text" class="input_form_sign" name="role" placeholder="Role" onChange={this.onChange}/>
             <div class="terms_and_cons d_none">
                 <p>
                    <input type="checkbox" name="terms_and_cons"></input>
                    <label for="terms_and_cons">   Accept Terms and Conditions.</label>
                </p>
             </div>
             <div class="cont_btn">
                <input class="btn_sign" type="submit" />
             </div>
           </form>
           <a href="#" class="link_forgot_pass d_block">Forgot Password ?</a>

         </div>
      );
   }
}

export default UserInfoForm;
