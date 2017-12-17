import React from 'react';
import styled from 'styled-components';
import DateTime from 'react-datetime';
import FaCalendar from 'react-icons/lib/fa/calendar';
import FaArrow from 'react-icons/lib/fa/arrow-left';
import {addAssignment} from '../../../../../../services/api/professor/add-assignment.js'


const FormContainer = styled.div`
  width:100%;
  height:100%;
  transition: opacity 0.5s;
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

class AssignmentFieldEditor extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCalendarChange = this.handleCalendarChange.bind(this);

    this.state = {
      assignment_id:"",
      assignment_name:"",
      description:"",
      date:""
    }
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
    var button_title, assignment_name, assignment_id, description;
    if (this.props.assignment) {
      assignment_name = this.props.assignment.assignment_name;
      assignment_id = this.props.assignment.assignment_id;
      description = this.props.assignment.description;
      button_title = "Update Assignment";
    } else {
      assignment_name = "";
      assignment_id = "";
      description = "";
      button_title ="Create Assignment";
    }

    return (
      <FormContainer>
        <ItemLabel>
          <TextLabel>Assignment Title:</TextLabel>
          <TextInput name="assignment_name" type="text" onChange={this.handleChange} value={assignment_name}/>
        </ItemLabel>
        <ItemLabel>
          <TextLabel>Assignment ID:</TextLabel>
          <TextInput name="assignment_id" type="text" onChange={this.handleChange} value={assignment_id}/>
        </ItemLabel>
        <ItemLabel>
          <TextLabel>Description:</TextLabel>
          <BigTextInput name="description" onChange={this.handleChange} value={description}></BigTextInput>
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
          <CreateButton onClick={this.handleSubmit}>{button_title}</CreateButton>
        </ItemLabel>
      </FormContainer>
    );
  }
}

export default AssignmentFieldEditor;
