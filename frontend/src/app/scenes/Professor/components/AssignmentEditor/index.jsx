import React from 'react';
import styled from 'styled-components';
import FaClose from 'react-icons/lib/fa/close';
import FaPencil from 'react-icons/lib/fa/pencil';
import AssignmentElement from './components/AssignmentElement/index.jsx';
import AssignmentFieldEditor from './components/AssignmentFieldEditor/index.jsx';
import {getAssignment} from '../../../../services/api/professor/get-assignment.js'

//position: absolute;
const Container = styled.div`
  overflow:hidden;
  overflow-y:auto;
  height: 90vh;
  right: 0;
  top: 0;
  margin: 0;
  padding: 0;
  padding-top:10px;
  background:white;
  margin: 30px;
`;

const XOut = styled.span`
  font-size:40px;
  float:right;
  padding-right:10%;

  &:hover {
    color:gray;
    cursor:pointer;
  }
`;

const Header = styled.h1`
  font-family:Avenir;
  font-size:30px;
  padding-left:50px;
`;

const PencilSpan = styled.span`
  font-size:40px;
  padding:10px;
`;

const AssignmentsContainer = styled.div`
  width:85%;
  height:100%;
  padding:50px;
`;

const AssignmentList = styled.ul`
  width:100%;
  height:100%;
  overflow:hidden;
  overflow-y:auto;
`;

class AssignmentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);

    this.state = {
      editingState: 0, // 0 = Assignment Picker, 1 = Editing an Assignment, 2 = Deleting an assignment
      selectedAssignment:null
    };
  }

  onEditClick(assignment) {
    this.setState({['editingState'] : 1});
    this.setState({['selectedAssignment'] : assignment});
    this.forceUpdate();
  }

  onDeleteClick(assignment) {
    this.setState({['editingState'] : 2});
    this.setState({['selectedAssignment'] : assignment});
    this.forceUpdate();
  }

  render() {
    // Render the view with the current assignments
    let current = null;
    switch (this.state.editingState) {
      case 0:
        // Get the current assignments
        var assignmentList = [];
        getAssignment("course=" + this.props.course.course_id + "&user=" + this.props.user_name + "&key=" + this.props.session_key).then((response) => {
          if (response.status) {
            assignmentList = response.body;
          }
          else {
            console.log(response);
          }
        });

        current = (
          <AssignmentsContainer>
            <AssignmentList>
              <AssignmentElement onEditClick={(assignment) => this.onEditClick(assignment)} onDeleteClick={(assignment) => this.onDeleteClick(assignment)} />
              <AssignmentElement onEditClick={(assignment) => this.onEditClick(assignment)} onDeleteClick={(assignment) => this.onDeleteClick(assignment)}/>
              <AssignmentElement onEditClick={(assignment) => this.onEditClick(assignment)} onDeleteClick={(assignment) => this.onDeleteClick(assignment)}/>
              <AssignmentElement onEditClick={(assignment) => this.onEditClick(assignment)} onDeleteClick={(assignment) => this.onDeleteClick(assignment)}/>
            </AssignmentList>
          </AssignmentsContainer>
        )
        break;
      case 1:
        current = (
          <AssignmentFieldEditor assignment={this.state.selectedAssignment}/>
        );
        break;
      case 2:
        break;
      default:
        break;
    }

    return (
      <Container>
        <XOut onClick={this.props.onClose}><FaClose/></XOut>
        <Header><PencilSpan><FaPencil/></PencilSpan>Edit Assignments for {this.props.course.course_name}</Header>
        {current}
      </Container>
    )
  }
}


export default AssignmentEditor;
