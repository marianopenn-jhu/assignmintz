import React from 'react';
import styled from 'styled-components';
import Login from './Login/Login.jsx';

const ApplicationContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(-87deg, #212121 08%, #303030 100%);
`;

const TitleContainer = styled.div`
  position: fixed;
  top: 15%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  letter-spacing: 0px;
`;

const TextOne = styled.span`
  color: rgb(177, 217, 231);
  font-family: Roboto;
  font-style: italic;
  font-weight: lighter;
  font-size: 100px;
  text-align: center;
`;

const TextTwo = styled.span`
  font-family: Consolas;
  color:rgba(167,224,165,1);
`;

const LoginContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <ApplicationContainer>
        <TitleContainer>
          <TextOne data-editableproperty="text">Assign
            <TextTwo>Mintz</TextTwo>
          </TextOne>
        </TitleContainer>
        <LoginContainer>
          <Login />
        </LoginContainer>
      </ApplicationContainer>
    );
  }
}

export default App;
