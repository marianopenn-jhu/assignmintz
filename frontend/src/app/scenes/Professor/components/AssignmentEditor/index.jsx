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

const Header = styled.h1`
  font-family:Avenir;
  font-size:30px;
  padding-left:50px;
`;

const FormContainer = styled.div`
  width:100%;
`;

const ItemLabel = styled.div
`
  display:block;
  width:85%;
  padding-top:20px;
  padding-bottom:20px;
  text-align:center;
`;

const TextLabel = styled.div
`
  display:inline-block;
  font-family:Avenir;
  font-size:16px;
  width:25%;
  text-align:right;
  padding-right:20px;
`;

const TextInput = styled.input
`
  display:inline-block;
  width:70%;
`;

const BigTextInput = styled.textarea
`
  display:inline-block;
  width:70%;
  height:150px;
  resize: none;
`;

const CreateButton = styled.button
`

`;

class AssignmentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      assignment_id:"",
      assignment_name:"",
      due_date_year:"",
      due_date_month:"",
      due_date_day:"",
      due_date_time:"",
      description:""
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(event) {
    addAssignment(
      this.props.session_key,
      this.props.user_name,
      this.state.assignment_id,
      this.state.assignment_name,
      "hw",
      "/backend/v1/course/" + this.props.course.course_id + "/",
      this.state.due_date_year + "-" + this.state.due_date_month + "-" + this.state.due_date_day + "T" + this.state.due_date_time + ":" + "00:00.00Z",
      "3",
      "4",
      "3.4",
      "5.6",
      "5",
      "33.3",
      "True",
      this.state.description
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

        <FormContainer>
          <ItemLabel>
            <TextLabel>Assignment Title:</TextLabel>
            <TextInput name="assignment_name" type="text" onChange={this.handleChange} />
          </ItemLabel>
          <ItemLabel>
            <TextLabel>Assignment ID:</TextLabel>
            <TextInput name="assignment_id" type="text" onChange={this.handleChange} />
          </ItemLabel>
          <ItemLabel>
            <TextLabel>Description:</TextLabel>
            <BigTextInput name="description" onChange={this.handleChange}></BigTextInput>
          </ItemLabel>
          <ItemLabel>
            <TextLabel>Due Year:</TextLabel>
            <BigTextInput name="due_date_year" onChange={this.handleChange}></BigTextInput>
          </ItemLabel>
          <ItemLabel>
            <TextLabel>Due Month:</TextLabel>
            <BigTextInput name="due_date_month" onChange={this.handleChange}></BigTextInput>
          </ItemLabel>
          <ItemLabel>
            <TextLabel>Due Day:</TextLabel>
            <BigTextInput name="due_date_day" onChange={this.handleChange}></BigTextInput>
          </ItemLabel>
          <ItemLabel>
            <TextLabel>Due Time:</TextLabel>
            <BigTextInput name="due_date_time" onChange={this.handleChange}></BigTextInput>
          </ItemLabel>
          <ItemLabel onClick={this.handleSubmit}>
            <CreateButton type="button">Create Course</CreateButton>
          </ItemLabel>
        </FormContainer>
      </Container>
    )
  }
}


export default AssignmentEditor;
