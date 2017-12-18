import React from 'react';
import styled from 'styled-components';
import LoginForm from './components/Form/index.jsx';

const LoginWrapper = styled.div`
  position: absolute;
  width: 300px;
  left:50%;
  top:50%;
  margin-left: -160px;
  margin-top: -160px;
  border-radius: 8px;
  clear: both;
  display: flex;
  flex-direction: column;
  height: 60vh;
  overflow-y: scroll;
`;

const FormWrapper = styled.div`
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

const BackArrowContainer = styled.span`
  font-size:50px;
  color:#3f9949;

  &:hover {
    color:#69FF7A;
    cursor:pointer;
  }
`;

class AccountChooser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentState: 'loginScreen',
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

  onSignUpSuccess(userName, email, selectedRole) {
    this.setState({['currentState']: 'createdUser'});
    this.setState({['userName']: userName});
    this.setState({['email']: email});
  }

  onSignInSuccess(answer, user_name, role) {
    this.setState({['selectedRole']: role});
    this.setState({['userName']: user_name});
    this.props.onLogin(answer, user_name, role);
  }

  resetState() {
    this.setState({['currentState']: 'loginScreen'});
    this.setState({['selectedRole']: ''});
    this.setState({['userName']: '<NOT FOUND>'});
    this.setState({['email']: '<NOT FOUND>'});
  }

  render () {
    let current = null;

    switch (this.state.currentState) {
      case 'loginScreen':
        current = (
          <FormWrapper>
            <LoginForm role={''} onSignUp={this.onSignUpSuccess} onSignIn={this.onSignInSuccess}/>
          </FormWrapper>
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
