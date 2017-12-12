import React from 'react';
import styled from 'styled-components';
import LinearCalendar from '../Layout/LinearCalendar/index.jsx';
// import FindClassView from './components/FindClassView/index.jsx';
import Sidebar from '../Layout/Sidebar/index.jsx';
import ViewPane from '../Layout/ViewPane/index.jsx'
import {getCourses} from '../../services/api/course/get-course.js';
import {getAssignment} from '../../services/api/professor/get-assignment.js';
//student can use gets from professor api
const Container = styled.div`
display:inline-block
vertical-align:top;
width:100%;
`;

class StudentView extends React.Component {
  constructor(props) {
    super(props);

    this.returnToCalendar = this.returnToCalendar.bind(this);
    this.findClass = this.findClass.bind(this);
    this.state = {
      courses:[],
      assignments:[],
      viewState: 0 // 0 = Calendar, 1 = Find a Class
    };

    if (this.props.user_name) {
      // Retrieve courses
      getCourses("students=" + this.props.user_name).then((response) => {
        if (response.status == true) {
          var obj = response.body;
          this.setState({courses: obj.objects});
        } else {
          console.log("Failed to retrieve courses!");
        }
      }
    );

    // Retrieve assignments
    getAssignment("student=" + this.props.user_name).then((response) => {
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

returnToCalendar() {
  this.setState({viewState:0});
  this.forceUpdate();
}

findClass() {
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
      // <FindClassView session_key={this.props.session_key} user_name={this.props.user_name} onClose={this.returnToCalendar}/>
      <ViewPane session_key={this.props.session_key} user_name={this.props.user_name} onClose={this.returnToCalendar}/>
    );
    break;
    default:
    this.setState({viewState:0});
  }

  return (
    <Container>
      <Sidebar data={state.courses} user_data={this.props.user_name} addClass={this.findClass}/>
        {view}
    </Container>
  );
}
}

export default StudentView;
