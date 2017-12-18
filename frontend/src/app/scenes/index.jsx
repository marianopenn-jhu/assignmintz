import React from 'react';
import styled from 'styled-components';
import Cookies from "universal-cookie";
import Login from './Login/index.jsx';
import StudentView from './Student/index.jsx';
import ProfessorView from './Professor/index.jsx';
import {getUser} from '../services/api/user/get-user.js';

const cookie = new Cookies();

const ApplicationContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
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

const Surround = styled.div`
clear: both;
display: flex;
flex-direction: column;
min-height: 100vh;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.state = {
      user_state:0, // 0 = Login, 1 = Student, 2 = Professor
      current_user:"",
      session_key:null,
      role:""
    };

  }

  componentWillMount() {
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    var user =  '';//cookie.get("assignmintz_user_name");
    var session_key = '';// cookie.get("assignmintz_session_key");
    var role = '';// = cookie.get("assignmintz_role");
    var answer = new Object();

    answer.session_key = session_key;
    console.log("top login");
    console.log(role);
    this.onLogin(answer, user, role);
  }

  onLogin(answer, user_name, role) {

    if (role == "student") {
        this.setState({
          'user_state': 1,
          'current_user': user_name,
          'session_key': answer.session_key,
          'role': role
        })
    }  else if (role == "professor") {
      this.setState({
        'user_state': 2,
        'current_user': user_name,
        'session_key': answer.session_key,
        'role': role
      })
    }

    cookie.set("assignmintz_user_name", user_name);
    cookie.set("assignmintz_session_key", answer.session_key);
    cookie.set("assignmintz_role", role);
  }

  onLogout() {
    this.setState({
      'user_state': 0,
      'current_user': '',
      'session_key': '',
      'role': ''
    });
    cookie.set("assignmintz_user_name", "");
    cookie.set("assignmintz_session_key", "");
    cookie.set("assignmintz_role", "");
    this.forceUpdate();
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
              <Surround>
                <Login onLogin={this.onLogin}/>
              </Surround>
            </LoginContainer>
          </div>
        );
        break;
      // Student view
      case 1:
        if (this.state.session_key != null)
        {
          current = (
            <StudentView user_name={this.state.current_user} session_key={this.state.session_key} onLogout={this.onLogout} role={this.state.role}/>
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
            <ProfessorView user_name={this.state.current_user} session_key={this.state.session_key} onLogout={this.onLogout} role={this.state.role}/>
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
