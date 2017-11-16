import React from 'react';
import styled from 'styled-components';
import LoginForm from './Form/Form.jsx';
import BackArrow from './assets/backarrow.png';

const LoginWrapper = styled.div`
  position: absolute;
  width: 300px;
  left:50%;
  top:50%;
  margin-left: -160px;
  margin-top: -160px;
`;

const ButtonWrapper = styled.div`
  margin-top: 30px;
  height: 123px;
  opacity: 1;
  -webkit-filter: none;
  filter: none;
  font-weight: 100;

  font-size: 40px;
  letter-spacing: 0px;
  color: rgb(177, 217, 231);
  font-family: Avenir;
  width:100%;
  text-align: center;
`;

const AccountButton = styled.button`
  display: inline-block;
  border-radius: 4px;
  background-color: #424242;
  width: 300px;
  margin: 15px;

  &:hover, &:focus, &:active {
    color: #BEE6CC;
    box-shadow: 0px 0px 2px 2px #212121;
    background-color: #686868;
  }
`;

const UserCreatedMessage = styled.p`
  color: #999;
  font-size: 20px;
  font-family: Avenir;
  width:100%;
  text-align: center;

  & > a {
    color:#69FF7A;
  }
  & > a:hover {
    color:#3f9949;
    cursor:pointer;
  }
`;

class AccountChooser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentState: 'accountChooser',
      selectedRole: "",
      userName: "<NOT FOUND>",
      email: "<NOT FOUND>"
    }

    this.onClick = this.onClick.bind(this);
    this.onSignUpSuccess = this.onSignUpSuccess.bind(this);
    this.onSignInSuccess = this.onSignInSuccess.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  onClick(e) {
    this.setState({['currentState']: 'loginScreen'});
    this.setState({['selectedRole']: e.target.name});
  }

  onSignUpSuccess(userName, email) {
    this.setState({['currentState']: 'createdUser'});
    this.setState({['userName']: userName});
    this.setState({['email']: email});
  }

  onSignInSuccess(answer) {
    this.props.onLogin();
  }

  resetState() {
    this.setState({['currentState']: 'accountChooser'});
    this.setState({['selectedRole']: ''});
    this.setState({['userName']: '<NOT FOUND>'});
    this.setState({['email']: '<NOT FOUND>'});
  }

  render () {
    let current = null;

    switch (this.state.currentState) {
      case 'accountChooser':
        current = (
          <ButtonWrapper>
            <AccountButton name="student" onClick={this.onClick}>Student</AccountButton>
            <AccountButton name="professor" onClick={this.onClick}>Professor</AccountButton>
          </ButtonWrapper>
        );
        break;
      case 'loginScreen':
        current = (
          <LoginForm role={this.state.selectedRole} onSignUp={this.onSignUpSuccess} onSignIn={this.onSignInSuccess}/>
        );
        break;
      case 'createdUser':
        current = (
          <UserCreatedMessage>
            Thanks for signing up {this.state.userName}! You're now one step closer to optimizing your week and achieving your goals. We've sent an email to {this.state.email} for you to confirm. Once you've confirmed, you can sign in <a onClick={this.resetState}>here</a>!
          </UserCreatedMessage>
        );
        break;
      default:
        break;
    }

    return (
      <LoginWrapper>
        {current};
      </LoginWrapper>
    )
  }
}

export default AccountChooser;
