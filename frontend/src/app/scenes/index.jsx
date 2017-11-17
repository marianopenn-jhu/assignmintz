import React from 'react';
import styled from 'styled-components';
import Login from './Login/index.jsx';

const ApplicationContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(-87deg, #212121 08%, #303030 100%);
`;

const TitleContainer = styled.div`
  position: absolute;
  top: 15%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  letter-spacing: 0px;
`;

const HeaderOne = styled.span`
  color: rgb(177, 217, 231);
  font-family: Avenir;
  font-style: regular;
  font-weight: lighter;
  font-size: 100px;
  text-align: center;
`;

const HeaderTwo = styled.span`
  font-style: italic;
  font-family: Consolas;
  color:rgba(167,224,165,1);
`;

const LoginContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    console.log("Logged in");
  }

  render() {
    return (
      <ApplicationContainer>
        <TitleContainer>
          <HeaderOne data-editableproperty="text">Assign
            <HeaderTwo>Mintz</HeaderTwo>
          </HeaderOne>
        </TitleContainer>
        <LoginContainer>
          <Login onLogin={this.onLogin}/>
        </LoginContainer>
      </ApplicationContainer>
    );
  }
}

export default App;
