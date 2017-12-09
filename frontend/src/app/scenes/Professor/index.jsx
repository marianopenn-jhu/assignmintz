import React from 'react';
import styled from 'styled-components';
import LinearCalendar from '../Layout/LinearCalendar/index.jsx';
import Sidebar from '../Layout/Sidebar/index.jsx';
import {getCourses} from '../../services/api/course/get-course.js';
import {getAssignment} from '../../services/api/professor/assignment/get-assignment.js';
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

    this.createClass = this.createClass.bind(this);
    this.state = {
      courses:[],
      assignments:[],
      viewState: 0 // 0 = Calendar, 1 = Creating Class
    };

    if (this.props.user_name) {

      // Retrieve courses
      getCourses("teacher=" + this.props.user_name).then((response) => {
          if (response.status == true) {
            var obj = response.body;
            this.setState({courses: obj.objects});
          } else {
            console.log("Failed to retrieve courses!");
          }
        }
      );

      // Retrieve assignments
      getAssignment("teacher=" + this.props.user_name).then((response) => {
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

  createClass() {
    this.setState({viewState : 1});
  }

  render() {
    const viewState = this.state.viewState;

    let currentView = null;
    if (viewState == 0) {
      currentView = (
        <LinearCalendar data={state.assignments}/>
      );
    }

    return(
      <Container>
        <Sidebar data={state.courses} user_data={this.props.user_name} addClass={this.createClass}/>
      </Container>
    );
  }
}

export default ProfessorView;
