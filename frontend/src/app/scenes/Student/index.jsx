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
    this.openClass = this.openClass.bind(this);
    this.state = {
      courses:[],
      assignments:[],
      viewState: 0 // 0 = Calendar, 1 = Find a Class
    };

    if (this.props.user_name) {
      // Retrieve courses
      getCourses("user=" + this.props.user_name).then((response) => {
        if (response.status == true) {
          var obj = response.body;
          this.setState({courses: obj.objects});
        } else {
          console.log("Failed to retrieve courses!");
        }
      }
    );

    // Retrieve assignments
    getAssignment("user=" + this.props.user_name + "&key=" + this.props.session_key).then((response) => {
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
openClass(){
  this.setState({viewState:3});
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
    view = (  //Find Class to add to class list/schedule
      // <FindClassView session_key={this.props.session_key} user_name={this.props.user_name} onClose={this.returnToCalendar}/>
      <ViewPane session_key={this.props.session_key} user_name={this.props.user_name} onClose={this.returnToCalendar} data={state.courses} role={this.props.role} case={1}/>
    );
    break;
      case 2: // View single class
      view = (
        <ViewPane session_key={this.props.session_key} user_name={this.props.user_name} onClose={this.returnToCalendar} data={state.courses} role={this.props.role} case={2}/>
      );
    break;
    default:
    this.setState({viewState:0});
  }

  return (
    <Container>
      <Sidebar data={state.courses} user_data={this.props.user_name} addClass={this.findClass} viewClass={this.openClass} session_key={this.props.session_key}/>
        {view}
    </Container>
  );
}
}

export default StudentView;
