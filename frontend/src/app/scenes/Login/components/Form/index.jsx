import React from 'react';
import styled from 'styled-components';
import Tab from './components/Tab/index.jsx';
//import AccountButton from './components/AccountButton/index.jsx';
import {createUser} from '../../../../services/api/user/create-user.js';
import {loginUser} from '../../../../services/api/user/login-user.js';
import {getUser} from '../../../../services/api/user/get-user.js';
import Cookies from "universal-cookie";

const cookie = document.cookie;
var clickedStudent = 'clicked';
var clickedProfessor = '';

const FormWrapper = styled.div`
  position: absolute;
  width: 300px;
  float: left;
  background-image: linear-gradient(-226deg, #FFFFFF 8%, #EEF3F5 100%);
  border-radius: 8px;
  transition: all 0.5s;
  box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.21);
  text-align:center;
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

const Error = styled.h3`
  position: relative;
  margin-bottom: 15px;
  font-size:14px;
  font-family: Avenir;
  color:red;
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

const AccountButton = styled.button`
  display: inline-block;
  border-radius: 4px;
  background-color: #424242;
  width: 120px;
  margin: 5px;
  font-family: Avenir;
  font-size: 14px;
  color: rgb(177, 217, 231);
  padding: 4px;

  .clicked {
    color: orange;
    background-color:white;
  }

  &:hover, &:focus, &:active {
    color: #BEE6CC;
    box-shadow: 0px 0px 1px 1px #c6c6c6;
    background-color: #686868;
  }

`;

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sign_in: true,
      user_name: '',
      role: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
      errorMessage: '',
      student_prof: true
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelectStudent = this.onSelectStudent.bind(this);
    this.onSelectProfessor = this.onSelectProfessor.bind(this);
    this.signInSelected = this.signInSelected.bind(this);
    this.signUpSelected = this.signUpSelected.bind(this);


  }


  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(event) {
    const {sign_in, user_name, role, first_name, last_name, email, password, confirm_password} = this.state;
    //const role = this.props.role;
    getUser("user=" + this.props.user_name + "&key=" + this.props.session_key).then((response) => {
        if (response.status == true) {
          var obj = response.body;
          console.log("get user");
          console.log(obj);
          //this.setState({courses: obj.objects});
        } else {
          console.log("Failed to retrieve courses!");
        }
      }
    );

    console.log("role");
    console.log(role);

    var existing = document.cookie;
    document.cookie =  "assignmintz_role=" + role + "; " + existing;
    // console.log("changed cookie");
    // console.log(document.cookie);
    if (sign_in == true)
    {
      console.log("changed cookie");
      console.log(document.cookie);

      loginUser(user_name, password).then((answer) =>
      {
        if (answer.status == false) {
          this.setState({['errorMessage']: answer.body.message});
        } else if (this.props.onSignIn != null) {
          this.props.onSignIn(answer.body, user_name);
        }
      });
    }
    else {

      if (password == confirm_password) {
        var passwd = password;
        var name = first_name + " " + last_name;
        createUser(user_name, name, email, passwd, role).then((answer) =>
        {
          console.log("created User");
          console.log(document.cookie);
          if (answer.status == false) {
            this.setState({['errorMessage']: answer.body.message});
          } else if (this.props.onSignUp != null) {
            this.props.onSignUp(name, email);
          }
        });
      }
    }
  }

  signInSelected() {
    //console.log("signInSelected");
    this.setState({['sign_in']: true});
    this.setState({['errorMessage']: ''});
  }

  signUpSelected() {
    //console.log("signUpSelected");
    this.setState({['sign_in']: false});
    this.setState({['errorMessage']: ''});
  }

  onSelectStudent() {
    // console.log("onSelectStudent");
    this.setState({['role']: "Student"});
    this.setState({['student_prof']: true});
    this.setState({['errorMessage']: ''});
  }
  onSelectProfessor() {
    // console.log("onSelectProfessor");
    this.setState({['role']: "Professor"});
    this.setState({['student_prof']: false});
    this.setState({['errorMessage']: ''});
  }

  render () {
    var hiddenField = this.state.sign_in ? 'hidden' : '';
    var buttonText = this.state.sign_in ? 'Sign In' : 'Sign Up';
    var roleSelected = this.state.student_prof ? 'clicked' : '';

    return (
      <FormWrapper>
        <Tab title="Sign In" selected={this.state.sign_in} onClicked={this.signInSelected}/>
        <Tab title="Sign Up" selected={!this.state.sign_in} onClicked={this.signUpSelected}/>
        <InputWrapper>
          <AccountButton name="role" type="button" value="Student" selected={this.state.student_prof} className={roleSelected} onClick={this.onChange} onClick={this.onSelectStudent}>Student</AccountButton>
          <AccountButton name="role" type="button" value="Professor" selected={this.state.student_prof} className={roleSelected} onClick={this.onChange} onClick={this.onSelectProfessor}>Professor</AccountButton>
      		<Input name="user_name" placeholder="User Name" type="text" onChange={this.onChange}/>
      		<Input name="first_name" placeholder="First Name" type="text" className={hiddenField} onChange={this.onChange}/>
          <Input name="last_name" placeholder="Last Name" type="text" className={hiddenField} onChange={this.onChange}/>
          <Input name="email" placeholder="JHED@jhu.edu" type="email" className={hiddenField} onChange={this.onChange}/>
          <Input name="password" placeholder="Password" type="password" onChange={this.onChange}/>
          <Input name="confirm_password" placeholder="Confirm Password" type="password" className={hiddenField} onChange={this.onChange}/>
          <Error>{this.state['errorMessage']}</Error>
          <Button onClick={this.onSubmit}>{buttonText}</Button>
        </InputWrapper>
      </FormWrapper>
    );
  }
}

export default Form;
