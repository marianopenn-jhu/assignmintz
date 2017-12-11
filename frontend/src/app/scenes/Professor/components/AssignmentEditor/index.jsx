import React from 'react';
import styled from 'styled-components';
import FaClose from 'react-icons/lib/fa/close';
import {getAssignment} from '../../../../services/api/professor/get-assignment.js'
import {addAssignment} from '../../../../services/api/professor/add-assignment.js'

const Container = styled.div`
  overflow:hidden;
  overflow-y:auto;
  height: 100%;
  width: 80%;
  position: absolute;
  right: 0;
  top: 0;
  margin: 0;
  padding: 0;
  padding-top:10px;
  background:white;
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

const Form = styled.form`
  width:100%;
`;

const Header = styled.h1`
  font-family:Avenir;
  font-size:30px;
  padding-left:50px;
`;

const AddAssignmentTest = styled.div`
  &:hover {
    background:red;
  }
`;

class AssignmentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.createAssignment = this.createAssignment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {

  }

  createAssignment() {
    addAssignment(
      this.props.session_key,
      this.props.user_name,
      "3",
      "Assignment 2",
      "hw",
      "/backend/v1/course/" + this.props.course.course_id + "/",
      "2013-01-29T12:34:56.00Z",
      "3",
      "4",
      "3.4",
      "5.6",
      "5",
      "33.3",
      "True",
      "A Random assignment"
    ).then((response) =>
    {
      if (response.status == false) {
          console.log(response.body);
      }
    })
  }

  render() {
    return (
        <Container>
          <XOut onClick={this.props.onClose}><FaClose/></XOut>
          <Header>Edit Assignments for {this.props.course.course_name}</Header>

          <AddAssignmentTest onClick={this.createAssignment}>Do it</AddAssignmentTest>
        </Container>
    )
  }
}

export default AssignmentEditor;
