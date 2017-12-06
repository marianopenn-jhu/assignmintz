import React from 'react';
import styled from 'styled-components';
import LinearCalendar from './components/LinearCalendar/index.jsx';
import {getCourses} from '../../services/api/course/get-course.js';
import {getAssignment} from '../../services/api/professor/assignment/get-assignment.js';

const Container = styled.div`
  position: absolute;
  top: 15%;
  left: 5%;
  width:90%;
`;

/*
  The professor will have props with:
    user_name
*/
class ProfessorView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses:[],
      assignments:[],
      meow:"High"
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

  render() {
    const state = this.state;

    return(
      <Container>
        <LinearCalendar data={state.assignments}/>
      </Container>
    );
  }
}

export default ProfessorView;
