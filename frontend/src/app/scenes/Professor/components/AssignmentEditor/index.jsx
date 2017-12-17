import React from 'react';
import styled from 'styled-components';
import FaClose from 'react-icons/lib/fa/close';
import FaCalendar from 'react-icons/lib/fa/calendar';
import FaPencil from 'react-icons/lib/fa/pencil';
import DateTime from 'react-datetime';
import AssignmentElement from './components/AssignmentElement/index.jsx';
import {getAssignment} from '../../../../services/api/professor/get-assignment.js'
import {addAssignment} from '../../../../services/api/professor/add-assignment.js'

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
  height:50%;
  padding:50px;
`;

const AssignmentList = styled.ul`
  width:100%;
  height:100%;
  overflow:hidden;
  overflow-y:auto;
`;

const FormContainer = styled.div`
  width:100%;
  height:50%;
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
`  width:70%;
`;

const BigTextInput = styled.textarea
`
  display:inline-block;
  width:70%;
  height:100px;
  resize: none;
`;

const CreateButton = styled.button
`
  float:right;
`;

const CalendarContainer = styled.span`
  display:inline-block;
  font-size:30px;
  text-align:right;
`

const DateContainer = styled.span`
  display:inline-block;
  width:70%;
`;

class AssignmentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCalendarChange = this.handleCalendarChange.bind(this);

    this.state = {
      assignment_id:"",
      assignment_name:"",
      description:"",
      date:"",
      assignmentList:[]
    };

    // Get the current assignments
    getAssignment("course=" + this.props.course.course_id + "&user=" + this.props.user_name + "&key=" + this.props.session_key).then((response) => {
      if (response.status) {
        this.setState({['assignmentList'] : response.body});
      }
      else {
        this.setState({['assignmentList'] : ["Failed to fetch assignment list!"]});
      }
    });
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleCalendarChange(value) {
    this.setState({['date']: value});
    console.log(value);
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
      } else {
        this.onClose();
      }
    })
  }

  render() {
    // Render the view with the current assignments
    return (
      <Container>
        <XOut onClick={this.props.onClose}><FaClose/></XOut>
        <Header><PencilSpan><FaPencil/></PencilSpan>Edit Assignments for {this.props.course.course_name}</Header>

        <AssignmentsContainer>
          <AssignmentList>
            <AssignmentElement/>
            <AssignmentElement/>
            <AssignmentElement/>
            <AssignmentElement/>
          </AssignmentList>
        </AssignmentsContainer>

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
            <TextLabel>
              <FaCalendar/>
            </TextLabel>
            <DateContainer>
              <DateTime
                inputProps={{ placeholder: "Select a Due Date/Time"}}
                onChange={(value) => this.handleCalendarChange(value)}
              />
            </DateContainer>
          </ItemLabel>
          <ItemLabel>
            <CreateButton onClick={this.handleSubmit}>Create Assignment</CreateButton>
          </ItemLabel>
        </FormContainer>
      </Container>
    )
  }
}


export default AssignmentEditor;
