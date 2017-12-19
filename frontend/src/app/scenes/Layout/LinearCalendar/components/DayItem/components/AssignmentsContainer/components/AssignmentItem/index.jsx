import React from 'react';
import styled from 'styled-components';
import Moment from 'moment';
import {editAssignment} from '../../../../../../../../../services/api/student/edit-assignment.js';

const Item = styled.li`
  background-color:	white;
  color: black;
  list-style:none;
  padding-top:5px;
  padding-left:15px;
  padding-right:15px;
  padding-bottom:10px;
`;

const Header=styled.h1`
  font-family: Avenir;
  color:#4f1e3e;
  font-size:15px;

  &:hover {
    cursor:pointer;
  }
`;

const QSpan=styled.span`
  color:#dca3c9;
`;

const InfoWrapper = styled.div`
  margin-left:2%;
  margin-right:2%;
  padding-top:1%;
  padding-bottom:1%;
`;

const Info = styled.div`
  font-family:Avenir;
  font-size:14px;
`;

const BodyWrapper=styled.div`
  margin-left:2%;
  margin-right:2%;
`;

const Body=styled.p`
  font-family:Avenir;
  font-size:14px;
  color:black
`;

var styles = {
  done : {
    'textDecoration' : 'line-through'
  },

  hidden : {
    'display' : 'none'
  },

  none : {

  }
}

const TextLabel = styled.div
`
  display:inline-block;
  font-family:Avenir;
  font-size:14px;
  width:25%;
`;

const TextInput = styled.input
`
  display:inline-block;
  width:70%;
`;

const SliderContainer = styled.div
`
  display:inline-block;
  width:70%;
`;

const ButtonContainer = styled.div
`
  padding:10px;
  padding-right:50px;
  float:right;
`;

class AssignmentItem extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onHover = this.onHover.bind(this);
    this.onUnhover = this.onUnhover.bind(this);
    this.finishAssignment = this.finishAssignment.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      confirming: false,
      ask_question:"",
      actual_difficulty:0,
      actual_time:0,
      assign_info:this.props.data.user_assignment,
      sliderValue:0
    }

    console.log(this.state.assign_info);
  }

  onHover() {
    if (!this.state.assign_info.done) {
        this.setState({['ask_question']: "Mark as Complete?"});
    }
  }

  onUnhover() {
    this.setState({['ask_question']: ""});
  }

  onClick() {
    if (!this.state.assign_info.done) {
      this.setState({['confirming']: !this.state.confirming});
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  finishAssignment() {
    var data = this.state.assign_info;

    editAssignment(
      data.student_assignment_id,
      this.props.session_key,
      this.props.user_name,
      this.props.user_name,
      this.state.actual_difficulty,
      this.state.actual_time,
      "True"
    ).then((result) => {
      if (result.status == true) {
        this.setState({['assign_info'] : result.body});
        this.setState({['ask_question']: ""});
        this.setState({['confirming']: false});
        this.forceUpdate();
      }
    })
  }

  render() {
    Moment.locale('en');
    var localText = Moment.utc(this.props.data.due_date).format('hh:mm a');

    let current = null;
    if (this.state.assign_info != null) {
      current = (
        <div>
          <Header onMouseEnter={this.onHover} onMouseLeave={this.onUnhover} onClick={this.onClick} style={this.state.assign_info.done ? styles.done : styles.none}>{this.props.data.assignment_name}: Due by {localText} <QSpan>{this.state.ask_question}</QSpan></Header>
          <InfoWrapper style={this.state.confirming ? styles.none : styles.hidden}>
            <Info>
              <TextLabel>Difficulty</TextLabel>
              <SliderContainer>
                <input name="sliderValue" type="range" min="1" max="10" value={this.state.sliderValue} onChange={this.handleChange}/>
              </SliderContainer>
            </Info>
            <Info>
              <TextLabel>Time</TextLabel>
              <TextInput name="actual_time" type="text" onChange={this.handleChange} />
            </Info>
            <Info>
            <ButtonContainer>
              <input onClick={this.finishAssignment} type="button" value="Complete Assignment"/>
            </ButtonContainer>
            </Info>
          </InfoWrapper>
          <InfoWrapper style={this.state.assign_info.done ? styles.done : styles.none}>
            <Info><b>Course </b>{this.props.data.course}</Info>
            <Info><b>Difficulty </b> {this.props.data.expected_difficulty} out of 10</Info>
            <Info><b>Assignment Type </b>{this.props.data.assignment_type}</Info>
            <Info><b>Expected Time </b>{this.props.data.expected_time}</Info>
          </InfoWrapper>
          <BodyWrapper style={this.state.assign_info.done ? styles.done : styles.none}>
            <Body><b>Description </b>{this.props.data.description}</Body>
          </BodyWrapper>
        </div>
      );
    } else {
      current = (
        <div>
          <Header>{this.props.data.assignment_name}: Due by {localText}</Header>
          <InfoWrapper>
            <Info><b>Course </b>{this.props.data.course}</Info>
            <Info><b>Difficulty </b> {this.props.data.expected_difficulty} out of 10</Info>
            <Info><b>Assignment Type </b>{this.props.data.assignment_type}</Info>
            <Info><b>Expected Time </b>{this.props.data.expected_time}</Info>
          </InfoWrapper>
          <BodyWrapper>
            <Body><b>Description </b>{this.props.data.description}</Body>
          </BodyWrapper>
        </div>
      );
    }

    return(
      <Item>
        {current}
      </Item>
    )
  }
}

export default AssignmentItem;
