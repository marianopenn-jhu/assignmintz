import React from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm/LoginForm.jsx';

const LoginWrapper = styled.div`
  position: absolute;
  width: 320px;
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

  &:hover, &:focus, &:active {
    color: #BEE6CC;
    box-shadow: 0px 0px 2px 2px #212121;
    background-color: #686868;
  }
`;

class AccountChooser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enteringInfo: false,
      selectedRole: ""
    }

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.setState({['enteringInfo']: true});
    this.setState({['selectedRole']: e.target.name});
  }

  render () {
    let current = null;
    if (this.state.enteringInfo == false) {
      current = (
        <ButtonWrapper>
          <AccountButton name="student" onClick={this.onClick}>Student</AccountButton>
          <AccountButton name="professor" onClick={this.onClick}>Professor</AccountButton>
        </ButtonWrapper>
      );
    }
    else {
      current= (
        <LoginForm role={this.state.selectedRole}/>
      );
    }

    return (
      <LoginWrapper>
        {current};
      </LoginWrapper>
    )
  }
}

export default AccountChooser;
