import React from 'react';
import styled from 'styled-components';
import Login from './Login/index.jsx';
import StudentView from './Student/index.jsx';
import ProfessorView from './Professor/index.jsx';

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

// color: rgb(177, 217, 231);
// font-family: Avenir;
// font-style: regular;
// font-weight: lighter;
// font-size: 100px;
// text-align: center;

const HeaderOne = styled.span`
    line-height: 123px;
    background-color: rgba(0,0,0,0);
    width: inherit;
    letter-spacing: 0px;
    color: rgb(177, 217, 231);
    font-family: Helvetica;
    font-style: italic;
    font-weight: lighter;
    font-size: 100px;
    text-align: center;

`;

// font-family: Helvetica;
// color:rgba(167,224,165,1);

const HeaderTwo = styled.span`
  background-color: rgba(0,0,0,0);
  width: inherit;
  font-size: 100px;
  line-height: 123px;
  letter-spacing: 0px;
  color:rgba(167,224,165,1);
  font-family: Helvetica;
  font-style: italic;
  font-weight: lighter;
  text-align: center;
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
    this.state = {
      user_state:0, // 0 = Login, 1 = Student, 2 = Professor
      current_user:"",
      session_key:null
    };
  }

  onLogin(answer, user_name, role) {
    if (role == "student") {
        this.setState({
          'user_state': 1,
          'current_user': user_name,
          'session_key': answer.session_key
        })
    }  else if (role == "professor") {
      this.setState({
        'user_state': 2,
        'current_user': user_name,
        'session_key': answer.session_key
      })
    }
  }

  render() {
    let current = null;

    // Find next main state
    switch (this.state.user_state) {
      // Login view
      case 0:
        current = (
          <div>
            <TitleContainer>
              <HeaderOne data-editableproperty="text">Assign
                <HeaderTwo>Mintz</HeaderTwo>
              </HeaderOne>
            </TitleContainer>
            <LoginContainer>
              <Login onLogin={this.onLogin}/>
            </LoginContainer>
          </div>
        );
        break;
      // Student view
      case 1:
        if (this.state.session_key != null)
        {
          current = (
            <StudentView user_name={this.state.current_user} session_key={this.state.session_key}/>
          );
        }
        else {
            current = (<div></div>);
            alert("Null session key!");
        }
        break;
      // Teacher view
      case 2:
        if (this.state.session_key != null)
        {
          current = (
            <ProfessorView user_name={this.state.current_user} session_key={this.state.session_key}/>
          );
        }
        else {
            current = (<div></div>);
            alert("Null session key!");
        }
        break;
      default:
        current = (
          <div>Error State!</div>
        );
        break;
    }

    return (
      <ApplicationContainer>
        {current}
      </ApplicationContainer>
    );
  }
}

export default App;
