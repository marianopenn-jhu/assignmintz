import React from 'react';
import styled from 'styled-components';
import {createUser} from '../../api/user/posts/create-user.js';

const LoginWrapper = styled.div`
  position: relative;
  width: 320px;
  float: left;
  background-image: linear-gradient(-226deg, #FFFFFF 8%, #EEF3F5 100%);
  border-radius: 8px;
  transition: all 0.5s;
  box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.21);
`;

const TabWrapper = styled.ul`
  position: relative;
  float: left;
  width: 100%;
`;

const TabElement = styled.li`
  position: relative;
  float: left;
  width: 50%;
  list-style: none;
  text-align: center;
`;

const TabBorder = styled.span`
  position: relative;
  width: 100%;
  float: left;
  background-color: #999;
  height: 2px;

  &:hover {
    position: relative;
    width: 100%;
    float: left;
    background-color: #69FF7A;
    height: 2px;
  }
`;

const TabLink = styled.a`
  text-decoration: none;
  font-family: Helvetica;
  font-size: 20px;
  color: #999;
  line-height: 14px;
  padding: 20px ;
  display: block;
  transition: all 0.5s;

  &:hover {
    color: #69FF7A;
  }
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
  border-bottom: 1px solid #69FF7A;
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
`;

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
      role: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(event) {
    const params = this.state;
    createUser(params);
  }

  render () {
    return (
      <LoginWrapper>
        <TabWrapper>
          <TabElement>
            <TabLink href="#">Sign In</TabLink>
            <TabBorder></TabBorder>
          </TabElement>
          <TabElement>
            <TabLink href="#">Sign Up</TabLink>
            <TabBorder></TabBorder>
          </TabElement>
        </TabWrapper>
        <InputWrapper>
      		<Input name="user_name" placeholder="User Name" type="text" />
      		<Input name="first_name" placeholder="First Name" type="text" />
          <Input name="last_name" placeholder="Last Name" type="text" />
          <Input name="email" placeholder="JHED@jhu.edu" type="text" />
          <Input name="password" placeholder="Password" type="password" />
          <Input name="confirm_password" placeholder="Confirm Password" type="password" />
        </InputWrapper>
      </LoginWrapper>
    );
  }
}

export default LoginView;
