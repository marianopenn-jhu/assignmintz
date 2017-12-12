import React from 'react';
import styled from 'styled-components';
import FaClose from 'react-icons/lib/fa/close';
import {createCourse} from '../../../../services/api/course/create-course.js';

const Wrapper = styled.div`
  position: relative;
  float: right;
  left: 25vw;
  width: 75vw;
`;

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

class CreateClassView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      course_id:'',
      course_title:'',
      description:''
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(event) {
    const {course_id, course_title, description} = this.state;

    createCourse(
      this.props.session_key,
      this.props.user_name,
      course_id,
      course_title,
      description,
      "/backend/v1/user/" + this.props.user_name + "/",
      []
    ).then((answer) =>
    {
      if (answer.status == false) {
        alert(answer.body);
      } else {
        this.props.onClose();
      }
    });
  }

  render() {
    return (
      <Wrapper>
        <Container>
          <XOut onClick={this.props.onClose}><FaClose/></XOut>
          <Header>Create a Class</Header>
          <FormContainer>
            <ItemLabel>
              <TextLabel>Course Title:</TextLabel>
              <TextInput name="course_title" type="text" onChange={this.handleChange} />
            </ItemLabel>
            <ItemLabel>
              <TextLabel>Course Number:</TextLabel>
              <TextInput name="course_id" type="text" onChange={this.handleChange} />
            </ItemLabel>
            <ItemLabel>
              <TextLabel>Description:</TextLabel>
              <BigTextInput name="description" onChange={this.handleChange}></BigTextInput>
            </ItemLabel>
            <ItemLabel onClick={this.handleSubmit}>
              <CreateButton type="button">Create Course</CreateButton>
            </ItemLabel>
          </FormContainer>
        </Container>
        </Wrapper>
    )
  }
}

export default CreateClassView;
