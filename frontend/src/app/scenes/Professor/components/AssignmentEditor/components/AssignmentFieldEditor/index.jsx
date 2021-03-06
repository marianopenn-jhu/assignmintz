import React from 'react';
import styled from 'styled-components';
import DateTime from 'react-datetime';
import FaCalendar from 'react-icons/lib/fa/calendar';
import FaArrow from 'react-icons/lib/fa/arrow-left';
import {addAssignment} from '../../../../../../services/api/professor/add-assignment.js'
import {editAssignment} from '../../../../../../services/api/professor/edit-assignment.js'

const FormContainer = styled.div`
  width:100%;
  height:100%;
  transition: opacity 0.5s;
`;

const ItemLabel = styled.div
`
  display:block;
  width:85%;
  padding-top:10px;
  padding-bottom:10px;
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
  border-radius: 15px;
  float:right;
  &:focus {
    outline:none;
  }
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

const TypeSelection = styled.select`
  width:70%;
`;

const SliderContainer = styled.div`
  width:70%;
  display:inline-block;
`;

const Slider = styled.input`

`;

class AssignmentFieldEditor extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCalendarChange = this.handleCalendarChange.bind(this);

    this.state = {
      assignment_name:"",
      assignment_type:"Homework",
      date:"",
      expected_difficulty:"",
      expected_time:"",
      description:"",
      sliderValue:5,
      button_title:""
    }

    if (this.props.assignment) {
      this.state.assignment_name = this.props.assignment.assignment_name;
      this.state.assignment_type = this.props.assignment.assignment_type;
      this.state.date = this.props.assignment.due_date;
      this.state.expected_difficulty = this.props.assignment.expected_difficulty;
      this.state.expected_time = this.props.assignment.expected_time;
      this.state.description = this.props.assignment.description;
      this.state.button_title = "Update Assignment";
    } else {
      this.state.button_title ="Create Assignment";
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleCalendarChange(value) {
    var local = value.local();
    var utc = local.utc().format('YYYY-MM-DDThh:mm:ss') + "Z";
    this.setState({['date']: utc});
  }

  handleSubmit(event) {
    // Change date string to accomodate server
    if (this.props.assignment) {
      editAssignment(
        this.props.assignment.assignment_id,
        this.props.session_key,
        this.props.user_name,
        this.state.assignment_name,
        this.state.assignment_type,
        "/backend/v1/course/" + this.props.course.course_id + "/",
        this.state.date,
        this.state.sliderValue.toString(),
        this.state.expected_time,
        this.state.description
      ).then((response) =>
      {
        if (response.status == false) {
          // TODO: Handle error
          console.log("Here");
        } else {
          this.props.onClose();
        }
      })
    }
    else {
      addAssignment(
        this.props.session_key,
        this.props.user_name,
        this.state.assignment_name,
        this.state.assignment_type,
        "/backend/v1/course/" + this.props.course.course_id + "/",
        this.state.date,
        this.state.sliderValue.toString(),
        this.state.expected_time,
        this.state.description
      ).then((response) =>
      {
        if (response.status == false) {
          // TODO: Handle error
        } else {
          this.props.onClose();
        }
      })
    }
  }

  render() {
    return (
      <FormContainer>
        <ItemLabel>
          <TextLabel>Assignment Title:</TextLabel>
          <TextInput name="assignment_name" type="text" onChange={this.handleChange} value={this.state.assignment_name}/>
        </ItemLabel>
        <ItemLabel>
          <TextLabel>Assignment Type:</TextLabel>
          <TypeSelection name="assignment_type" onChange={this.handleChange}>
            <option value="Homework">Homework</option>
            <option value="Exam">Quiz</option>
            <option value="Quiz">Exam</option>
          </TypeSelection>
        </ItemLabel>
        <ItemLabel>
          <TextLabel>Description:</TextLabel>
          <BigTextInput name="description" onChange={this.handleChange} value={this.state.description}></BigTextInput>
        </ItemLabel>
        <ItemLabel>
          <TextLabel>Expected Time:</TextLabel>
          <TextInput name="expected_time" type="text" onChange={this.handleChange} value={this.state.expected_time}/>
        </ItemLabel>
        <ItemLabel>
          <TextLabel>Expected Difficulty:</TextLabel>
          <SliderContainer>
            <Slider name="sliderValue" type="range" min="1" max="10" value={this.state.sliderValue} onChange={this.handleChange}/>
          </SliderContainer>
        </ItemLabel>
        <ItemLabel>
          <TextLabel>
            <FaCalendar/>
          </TextLabel>
          <DateContainer>
            <DateTime
              value={this.state.date}
              onChange={(value) => this.handleCalendarChange(value)}
            />
          </DateContainer>
        </ItemLabel>
        <ItemLabel>
          <CreateButton onClick={this.handleSubmit}>{this.state.button_title}</CreateButton>
        </ItemLabel>
      </FormContainer>
    );
  }
}

export default AssignmentFieldEditor;
