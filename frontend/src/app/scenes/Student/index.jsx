import React from 'react';
import styled from 'styled-components';
import LinearCalendar from '../Layout/LinearCalendar/index.jsx';
import Sidebar from '../Layout/Sidebar/index.jsx';
import {getCourses} from '../../services/api/course/get-course.js';
import {getAssignment} from '../../services/api/professor/get-assignment.js';
//student can use gets from professor api
const Container = styled.div`
  display:inline-block
  vertical-align:top;
  width:100%;
`;

const Wrapper= styled.div`
display: flex;
`;

const FullPage = styled.div`
height: auto;
overflow: hidden;
`;

const ViewPanel = styled.div `
background-color: #FAFAFA;
font-family: 'Trebuchet MS';
left: 250px;
right: inherit;
position: absolute;
width: auto;
overflow: hidden;
height:100vh;
`;

class StudentView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses:[],
      assignments:[]
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
      getAssignment("students=" + this.props.user_name).then((response) => {
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
  return (
    <Container>
      <Sidebar data={state.courses} user_data={this.props.user_name} session_key={this.props.session_key}/>
      <LinearCalendar data={state.assignments} user_data={this.props.user_name} session_key={this.props.session_key} onLogout={this.props.onLogout}/>
    </Container>
    // <Wrapper>
    // <FullPage>
    // <div id="fullPage">
    // <Sidebar/>
    //
    // <ViewPanel>
    // <div>
    //
    // </div>
    // </ViewPanel>
    // </div>
    // </FullPage>
    // </Wrapper>
  );
}
}

export default StudentView;
