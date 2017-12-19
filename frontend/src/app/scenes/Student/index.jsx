import React from 'react';
import styled from 'styled-components';
import LinearCalendar from '../Layout/LinearCalendar/index.jsx';
// import FindClassView from './components/FindClassView/index.jsx';
import Sidebar from '../Layout/Sidebar/index.jsx';
import ViewPane from '../Layout/ViewPane/index.jsx';
import {getCourses} from '../../services/api/course/get-course.js';
import {getAssignment} from '../../services/api/professor/get-assignment.js';
import {getStudentAssignment} from '../../services/api/student/get-assignment.js';
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
    this.openClass = this.openClass.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.openLeaderboard = this.openLeaderboard.bind(this);
    this.state = {
      courses:[],
      assignments:[],
      viewState: 0, // 0 = Calendar, 1 = Find a Class
      selected_course: null
    };

    var class_description = new Object();
    class_description.name = "See Description";
    var that = this;
    class_description.onClick = ((course_title, course_id) => {
      that.openClass(course_id);
    });

    this.dropdown_elements = [
      class_description
    ];

    this.getInfo();
}

getInfo() {
  if (this.props.user_name) {
    // Retrieve courses
    getCourses("user=" + this.props.user_name + "&key=" + this.props.session_key + "&students=" + this.props.user_name).then((courseResponse) => {
        if (courseResponse.status == true) {
          var cs = courseResponse.body.objects;
          this.setState({courses: cs});
          this.forceUpdate();
        } else {
          console.log("Failed to retrieve courses!");
        }
      }
    );

    // Retrieve assignments
    getStudentAssignment("user=" + this.props.user_name + "&key=" + this.props.session_key  + "&student=" + this.props.user_name).then((assignmentResponse) => {
        if (assignmentResponse.status == true) {

          for (var aIndex = 0; aIndex < assignmentResponse.body.objects.length; aIndex++) {
            var a = assignmentResponse.body.objects[aIndex];

            var assignment_id = a.student_assignment_id.substring(0, a.student_assignment_id.indexOf("_student"));
            getAssignment("user=" + this.props.user_name + "&key=" + this.props.session_key + "&assignment_id=" + assignment_id).then((actualResponse) => {
              var as = actualResponse.body.objects;
              var currAssignments = this.state.assignments.concat(as);
              this.setState({assignments: currAssignments});
              this.forceUpdate();
            });
          }
        } else {
          console.log("Failed to retrieve assignments");
        }
      }
    );
  }
}

returnToCalendar() {
  this.setState({viewState:0});
  this.getInfo();
  this.forceUpdate();
}

findClass() {
  this.setState({viewState:1});
}

openClass(course_id){
  console.log(this.state.courses);
  for (var course in this.state.courses) {
    console.log(course_id);
    console.log(course.course_id);
    if (course.course_id == course_id) {
      console.log(course);
      this.setState({['selected_course'] : course});
      this.setState({viewState:2});
    }
  }
}

openLeaderboard(){
  console.log("hey");
}

render() {
  const state = this.state;

  let view = null;
  switch (state.viewState) {
    case 0: //Full Calendar
    view = (
      <LinearCalendar data={state.assignments} user_data={this.props.user_name} session_key={this.props.session_key} onLogout={this.props.onLogout}/>
    );
    break;
    case 1:
    view = (
      <ViewPane session_key={this.props.session_key} user_name={this.props.user_name} onClose={this.returnToCalendar} data={state.courses} role={this.props.role} case={1}/>
    );
    break;
    case 2:
      view = (
        <ViewPane session_key={this.props.session_key} user_name={this.props.user_name} onClose={this.returnToCalendar} data={state.courses} role={this.props.role} course={state.selected_course} case={2}/>
      );
    break;
    default:
      this.setState({viewState:0});
      this.forceUpdate();
      break;
  }

  return (
    <Container>
      <Sidebar data={state.courses} user_name={this.props.user_name} addClass={this.findClass} dropdown_elements={this.dropdown_elements} showLeaderboard={this.openLeaderboard} session_key={this.props.session_key}/>
        {view}
    </Container>
  );
}
}

export default StudentView;
