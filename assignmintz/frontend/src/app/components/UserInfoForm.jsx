import React from 'react';
import {createUser} from '../../api/user/POSTs/create-user';

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
    createUser(this.state);
  }

   render() {
      return (
        <div>
           <form onSubmit={this.onSubmit}>
             <input type="text" class="input_form_sign d_block active_inp" name="user_name" placeholder="User Name" onChange={this.onChange}/>
             <input type="text" class="input_form_sign d_block active_inp" name="name" placeholder="Name" onChange={this.onChange}/>
             <input type="text" class="input_form_sign" name="email" placeholder="jhed@jhu.edu" onChange={this.onChange}/>
             <input type="text" class="input_form_sign d_block  active_inp" name="passwd" placeholder="Password" onChange={this.onChange}/>
             <input type="text" class="input_form_sign" name="role" placeholder="Role" onChange={this.onChange}/>
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
