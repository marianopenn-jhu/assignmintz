import React from 'react';
import styled from 'styled-components';
import {createUser} from '../../api/user/posts/create-user.js';

const Input = styled.input`
	padding: 0.5em;
	margin: 0.5em;
	color: palevioletred;
	background: papayawhip;
	border: none;
	border-radius: 3px;
`;

class LoginView extends React.Component {
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
    const params = this.state;
    createUser(params);
  }

  render () {
    return (
      <div>
    		<Input placeholder="User Name" type="text" />
    		<Input value="First Name" type="text" />
        <Input value="Last Name" type="text" />
        <Input value="Last asdasdasd" type="text" />
      </div>
    );
  }
}

export default LoginView;
