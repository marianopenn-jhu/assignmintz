import React from 'react';
import styled from 'styled-components';
import LinearCalendar from '../Layout/LinearCalendar/index.jsx';
import CreateClassView from './components/CreateClassView/index.jsx';
import Sidebar from '../Layout/Sidebar/index.jsx';
import {getCourses} from '../../services/api/course/get-course.js';
import {getAssignment} from '../../services/api/professor/get-assignment.js';
//import {addClass} from '../../services/api/professor/course/add-class.js';

const Container = styled.div`
  display:inline-block
  vertical-align:top;
  width:100%;
`;

/*
  The professor will have props with:
    user_name
*/
class ProfessorView extends React.Component {
  constructor(props) {
    super(props);

    this.addClass = this.addClass.bind(this);
    this.returnToCalendar = this.returnToCalendar.bind(this);
    this.state = {
      courses:[],
      assignments:[],
      viewState: 0 // 0 = Calendar, 1 = Creating a Class
    };

    if (this.props.user_name) {
      // Retrieve courses
      getCourses("professor=" + this.props.user_name).then((response) => {
          if (response.status == true) {
            var obj = response.body;
            this.setState({courses: obj.objects});
          } else {
            console.log("Failed to retrieve courses!");
          }
        }
      );

      // Retrieve assignments
      getAssignment("professor=" + this.props.user_name).then((response) => {
          if (response.status == true) {
            var obj = response.body;
            this.setState({assignments: obj.objects});
          } else {
            console.log("Failed to retrieve assignments");
          }
        }
      )
    }
  }

  addClass() {
    this.setState({viewState:1});
  }

  returnToCalendar() {
    this.setState({viewState:0});
    this.forceUpdate();
  }

  render() {
    const state = this.state;

    let view = null;
    switch (state.viewState) {
      case 0:
        view = (
          <LinearCalendar data={state.assignments} user_data={this.props.user_name} session_key={this.props.session_key} onLogout={this.props.onLogout}/>
        );
        break;
      case 1:
        view = (
          <CreateClassView session_key={this.props.session_key} user_name={this.props.user_name} onClose={this.returnToCalendar}/>
        );
        break;
      default:
        this.setState({viewState:0});
    }

    return(
      <Container>
        <Sidebar data={state.courses} user_data={this.props.user_name} session_key={this.props.session_key} addClass={this.addClass}/>
        {view}
      </Container>
    );
  }
}

export default ProfessorView;
