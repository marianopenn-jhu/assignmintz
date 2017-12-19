import React from 'react';
import styled from 'styled-components';
import LinearCalendar from '../Layout/LinearCalendar/index.jsx';
import CreateClassView from './components/CreateClassView/index.jsx';
import DeleteClassView from './components/DeleteClassView/index.jsx';
import AssignmentEditor from './components/AssignmentEditor/index.jsx';
import Sidebar from '../Layout/Sidebar/index.jsx';
import ViewPane from '../Layout/ViewPane/index.jsx'
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

    this.addClassView = this.addClassView.bind(this);
    this.showClasses = this.showClasses.bind(this);
    this.editClassView = this.editClassView.bind(this);
    this.deleteClassView = this.deleteClassView.bind(this);
    this.editAssignmentsView = this.editAssignmentsView.bind(this);
    this.returnToCalendar = this.returnToCalendar.bind(this);
    this.getInfo = this.getInfo.bind(this);

    this.state = {
      courses:[],
      assignments:[],
      viewState: 0, // 0 = Calendar, 1 = Creating a Class, 2 = Editing a class, 3 = Deleting a class, 4 = Assignment editor
      selected_course:{course_name:'', course_id:''}
    };

    this.getInfo();

    // Set dropdown elements for sidebar (this is bad code)
    var that = this;
    var edit_class = new Object();
    edit_class.home = this;
    edit_class.name = "Edit Class";
    edit_class.onClick = ((course_title, course_id) => {
      that.editClassView(course_title, course_id);
    });

    var delete_class = new Object();
    delete_class.name = "Delete Class";
    delete_class.onClick = ((course_title, course_id) => {
      that.deleteClassView(course_title, course_id);
    });

    var edit_assignments = new Object();
    edit_assignments.name = "Edit Assignments";
    edit_assignments.onClick = ((course_title, course_id) => {
      that.editAssignmentsView(course_title, course_id);
    });

    this.dropdown_elements = [
      edit_class,
      delete_class,
      edit_assignments
    ];
  }

  addClassView() {
    this.setState({['viewState']:1});
    this.forceUpdate();
  }

  showClasses() {
    this.setState({['viewState']:0});
    this.forceUpdate();
  }

  editClassView(course_title, course_id) {
    this.setState({['viewState']:2});
    this.setState({selected_course:{course_name:course_title, course_id:course_id}});
    this.forceUpdate();
  }

  deleteClassView(course_title, course_id) {
    this.setState({['viewState']:3});
    this.setState({selected_course:{course_name:course_title, course_id:course_id}});
    this.forceUpdate();
  }

  editAssignmentsView(course_title, course_id) {
    this.setState({['viewState']:4});
    this.setState({selected_course:{course_name:course_title, course_id:course_id}});
    this.forceUpdate();
  }

  returnToCalendar() {
    this.setState({['viewState']:0});
    this.getInfo();
  }

  getInfo() {
    if (this.props.user_name) {
      // Retrieve courses
      getCourses("user=" + this.props.user_name + "&key=" + this.props.session_key + "&professor=" + this.props.user_name).then((courseResponse) => {
          if (courseResponse.status == true) {
            var cs = courseResponse.body.objects;
            this.setState({courses: cs});
            // Retrieve assignments
            for (var courseIndex = 0; courseIndex < cs.length; courseIndex++) {
              var c = cs[courseIndex];
              getAssignment("user=" + this.props.user_name + "&key=" + this.props.session_key + "&course=" + c.course_id).then((assignmentResponse) => {
                  if (assignmentResponse.status == true) {
                    var as = assignmentResponse.body.objects;
                    var currAssignments = this.state.assignments.concat(as);
                    this.setState({assignments: currAssignments});
                  } else {
                    console.log("Failed to retrieve assignments");
                  }
                }
              );
            }
          } else {
            console.log("Failed to retrieve courses!");
          }
        }
      );
    }
  }

  render() {
    const state = this.state;

    let view = null;
    switch (state.viewState) {
      case 0:
        view = (
          <LinearCalendar data={state.assignments} user_name={this.props.user_name} session_key={this.props.session_key} onLogout={this.props.onLogout}/>
        );
        break;
      case 1:
        view = (
          // <CreateClassView session_key={this.props.session_key} user_name={this.props.user_name} onClose={this.returnToCalendar}/>
          <ViewPane session_key={this.props.session_key} user_name={this.props.user_name} onClose={this.returnToCalendar} data={state.courses} role={this.props.role} case={1}/>
        );
        break;
      case 2:
      //what case is this...?
        view = (
          <ViewPane session_key={this.props.session_key} user_name={this.props.user_name} onClose={this.returnToCalendar} data={state.courses} role={this.props.role} case={2}/>
        );
        break;
      case 3:
        view = (
          // <DeleteClassView session_key={this.props.session_key} onClose={this.returnToCalendar} course={this.state.selected_course}/>
          <ViewPane session_key={this.props.session_key} user_name={this.props.user_name} onClose={this.returnToCalendar} course={this.state.selected_course} role={this.props.role} case={3}/>
        )
        break;
      case 4:
        view = (
          //<AssignmentEditor session_key={this.props.session_key} user_name={this.props.user_name} onClose={this.returnToCalendar} course={this.state.selected_course}/>
          <ViewPane session_key={this.props.session_key} user_name={this.props.user_name} onClose={this.returnToCalendar} course={this.state.selected_course} role={this.props.role} case={4}/>
        );
        break;
      default:
        this.setState({viewState:0});
        this.forceUpdate();
        break;
    }

    return(
      <Container>
        <Sidebar data={state.courses} user_data={this.props.user_name} session_key={this.props.session_key} clickClasses={this.showClasses} addClass={this.addClassView} dropdown_elements={this.dropdown_elements}/>
        {view}
      </Container>
    );
  }
}

export default ProfessorView;
