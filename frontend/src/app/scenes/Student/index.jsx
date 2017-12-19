import React from 'react';
import styled from 'styled-components';
import LinearCalendar from '../Layout/LinearCalendar/index.jsx';
// import FindClassView from './components/FindClassView/index.jsx';
import Sidebar from '../Layout/Sidebar/index.jsx';
import ViewPane from '../Layout/ViewPane/index.jsx';
import FaSmile from 'react-icons/lib/fa/smile-o';
import {getCourses} from '../../services/api/course/get-course.js';
import {getAssignment} from '../../services/api/professor/get-assignment.js';
import {getStudentAssignment} from '../../services/api/student/get-assignment.js';
//student can use gets from professor api

const Container = styled.div`
  display:inline-block
  vertical-align:top;
  width:100%;
`;

const ViewPaneContainer = styled.div`
  position: relative;
  float: left;
  left: 25vw;
  width: 75vw;
  height: 100vh;
  overflow:hidden;
  overflow-y:auto;
  z-index: -1;
  background:white;
`;

const Inner = styled.div`
position: absolute;
   margin: auto;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
   width: 100px;
   height: 100px;
`;

const SmileDiv = styled.span`
  font-size:50px;
`;

class StudentView extends React.Component {
  constructor(props) {
    super(props);

    this.returnToCalendar = this.returnToCalendar.bind(this);
    this.findClass = this.findClass.bind(this);
    this.openClass = this.openClass.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.getActualInfo = this.getActualInfo.bind(this);
    this.openLeaderboard = this.openLeaderboard.bind(this);
    this.state = {
      courses:[],
      assignments:[],
      studentAssignments:[],
      viewState: 3, // 0 = Calendar, 1 = Find a Class, 2 = Viewing Class, 3 = Loading
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

getActualInfo(aIndex) {
  if (aIndex == this.state.studentAssignments.length) {
    // We have set the assignment for each student assignment, so return.
    this.setState({['viewState'] : 0})
    this.forceUpdate();
    return;
  }

  // Get the corresponding student assignment
  var studentAssignment = this.state.studentAssignments[aIndex];

  // Get the id associated with the student assignment
  var assignment_id = studentAssignment.student_assignment_id.substring(0, studentAssignment.student_assignment_id.lastIndexOf("_"));

  // Get the assignment using the student assignment
  getAssignment("user=" + this.props.user_name + "&key=" + this.props.session_key + "&assignment_id=" + assignment_id).then((actualResponse) => {
    var as = actualResponse.body.objects;

    if (as.length > 1) {
      console.log("Unexpected query!");
    }

    var assignments = this.state.assignments;
    assignments[aIndex] = as[0];
    this.setState({['assignments']: assignments}, function () { // Wait until the new assignments are set, then add the user_assignment
      var more_assignments = this.state.assignments;
      more_assignments[aIndex].user_assignment = studentAssignment;

      this.setState({['assignments']: more_assignments}, function () {
        this.getActualInfo(aIndex + 1);
      });
    });
  });
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

    // Retrieve the student assignments fromt he server
    getStudentAssignment("user=" + this.props.user_name + "&key=" + this.props.session_key  + "&student=" + this.props.user_name).then((assignmentResponse) => {
        if (assignmentResponse.status == true) {
          this.setState({['studentAssignments']: assignmentResponse.body.objects}, function() { // Wait until the student's assignments are populated
            this.setState({['assignments']: new Array(this.state.studentAssignments.length)}, function() { // Wait until the assignment list is the right size
              this.getActualInfo(0);
            });
          });

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
  var courses = this.state.courses;
  for (var index = 0; index < courses.length; index++) {
    var course = courses[index];
    if (course.course_id == course_id) {
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
      <LinearCalendar data={state.assignments} user_name={this.props.user_name} session_key={this.props.session_key} onLogout={this.props.onLogout}/>
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
    case 3:
      view = (
        <ViewPaneContainer>
          <Inner><SmileDiv><FaSmile/></SmileDiv></Inner>
        </ViewPaneContainer>
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
