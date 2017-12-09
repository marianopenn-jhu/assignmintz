import React from 'react';
import styled from 'styled-components';
import LinearCalendar from '../Layout/LinearCalendar/index.jsx';
import CreateClassView from './components/CreateClassView/index.jsx';
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

    this.addClass = this.addClass.bind(this);
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

  render() {
    const state = this.state;

    let view = null;
    switch (state.viewState) {
      case 0:
        view = (
          <LinearCalendar data={state.assignments}/>
        );
        break;
      case 1:
        view = (
          <CreateClassView data={this.props.user_name}/>
        );
        break;
      default:
        this.setState({viewState:0});
    }

    return(
      <Container>
        <Sidebar data={state.courses} user_data={this.props.user_name} addClass={this.addClass}/>
        {view}
      </Container>
    );
  }
}

export default ProfessorView;
