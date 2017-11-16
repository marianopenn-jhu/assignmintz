import React from 'react';
import styled from 'styled-components';
import Tab from './util/Tab.jsx';
import {createUser} from '../../../api/user/posts/create-user.js';
import {loginUser} from '../../../api/user/posts/login-user.js';

const LoginWrapper = styled.div`
  position: absolute;
  width: 300px;
  float: left;
  background-image: linear-gradient(-226deg, #FFFFFF 8%, #EEF3F5 100%);
  border-radius: 8px;
  transition: all 0.5s;
  box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.21);
`;

const InputWrapper = styled.div`
  position: relative;
  float: left;
  width: 100%;
  margin-top: 20px;
`;

const Input = styled.input`
	padding: relative;
	float:left;
  width:90%;
  border: none;
  border-bottom: 1px solid #3f9949;
  background-color: transparent;
  font-size:16px;
  transition: all 0.5s;
  height: 5px;
  margin: 5% 5%;
  padding: 10px 0px;
  opacity: 1;
  outline: none;
  font-family: Avenir;

  &:focus {
    border-bottom: 1px solid #3f9949;
  }

  .hidden {
    display: none;
    transition: opacity 500ms ease-in;
  }
`;

const Button = styled.button`
  background: #69FF7A;
  box-shadow: 0px 2px 10px 2px #3f9949;
  border-radius: 8px;
  padding: 15px 30px;
  border: none;
  color: #fff;
  font-size: 14px;
  position: relative;
  float: left;
  margin-left: 100px;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
`;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sign_in: true,
      user_name: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.signInSelected = this.signInSelected.bind(this);
    this.signUpSelected = this.signUpSelected.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(event) {
    const {sign_in, user_name, first_name, last_name, email, password, confirm_password} = this.state;
    const role = this.props.role;

    if (sign_in == true)
    {
      const params = {user_name, password};
      loginUser(params);
    }
    else {
      if (password == confirm_password) {
        var passwd = password;
        var name = first_name + " " + last_name;
        createUser(user_name, name, email, passwd, role);
      }
    }
  }

  signInSelected() {
    this.setState({['sign_in']: true});
  }

  signUpSelected() {
    this.setState({['sign_in']: false});
  }

  render () {
    var hiddenField = this.state.sign_in ? 'hidden' : '';
    var buttonText = this.state.sign_in ? 'Sign In' : 'Sign Up';

    return (
      <LoginWrapper>
        <Tab title="Sign In" selected='true' onClicked={this.signInSelected}/>
        <Tab title="Sign Up" selected='false' onClicked={this.signUpSelected}/>
        <InputWrapper>
      		<Input name="user_name" placeholder="User Name" type="text" onChange={this.onChange}/>
      		<Input name="first_name" placeholder="First Name" type="text" className={hiddenField} onChange={this.onChange}/>
          <Input name="last_name" placeholder="Last Name" type="text" className={hiddenField} onChange={this.onChange}/>
          <Input name="email" placeholder="JHED@jhu.edu" type="text" className={hiddenField} onChange={this.onChange}/>
          <Input name="password" placeholder="Password" type="password" onChange={this.onChange}/>
          <Input name="confirm_password" placeholder="Confirm Password" type="password" className={hiddenField} onChange={this.onChange}/>
          <Button onClick={this.onSubmit}>{buttonText}</Button>
        </InputWrapper>
      </LoginWrapper>
    );
  }
}

export default LoginForm;
