import React from 'react';
import styled from 'styled-components';
import FaClose from 'react-icons/lib/fa/close';
import FindClassElement from '../FindClassElement/index.jsx'
import {getCourses} from '../../../../services/api/course/get-course.js';
import {addToCourse} from '../../../../services/api/course/add-to-course.js';

const PanelContainer = styled.div `
  margin: 30px;
`;

const Panel = styled.div`
  overflow:hidden;
  position:relative;
  height: 100%;
  width: 100%;
`;


const TopBarContainer = styled.div
`
  overflow-x: hidden;
  min-height: 70px;
  height: 10%;
  width: 100%;
  left: inherit;
  padding-top:10px;
  background:grey;
`;

const ResultElementContainer = styled.div
`
  overflow:hidden;
  overflow-y:auto;
  min-height: 70px;
  width: 100%;
  padding-top:10px;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
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

const Header2 = styled.h1`
  font-family:Avenir;
  font-size:  25px;
  padding-left:50px;
`;

const ItemLabel = styled.div
`
  display:block;
  padding: 20px 50px;
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

class FindClassView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);

    this.state = {
      number:'',
      title:'',
      availableCourses:[],
      selectedCourses:[]
    }

    getCourses("user=" + this.props.user_name + "&key=" + this.props.session_key).then((response) => {
      if(response.status == true){
        this.setState({availableCourses: response.body.objects});
      } else {
        console.log("Failed to retrieve courses!");
      }
    })
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
    this.forceUpdate();
  }

  handleSubmit(event) {
    for (var index = 0; index < this.state.selectedCourses.length; index++) {
      addToCourse(this.state.selectedCourses[index], this.props.session_key, this.props.user_name, ["/backend/v1/user/" + this.props.user_name + "/"]);
    }
    this.props.onClose();
  }

  toggleSelected(course_id) {
    var index = this.state.selectedCourses.indexOf(course_id);
    if (index > -1)
    {
      this.state.selectedCourses.splice(index, 1);
    }
    else
    {
      this.state.selectedCourses.push(course_id);
    }
  }

  render() {
    let classes = (
      <div>N/A</div>
    );
    if (this.state.availableCourses) {
      classes = this.state.availableCourses.map((course, index) => {
        var index = this.state.selectedCourses.indexOf(course.course_id);
        var selected = false;
        if (index > -1) {
          selected = true;
        }
        return (
          <FindClassElement key={index} course={course} filter_id={this.state.number} filter_title={this.state.title} onClick={(course_id) => this.toggleSelected(course_id)}/>
        )
      })
    }


    return (
      <PanelContainer>
        <Panel>
          <Container>
          <XOut onClick={this.props.onClose}><FaClose/></XOut>
          <Header>Add a Class</Header>
          <Form onSubmit={this.handleSubmit}>
            <ItemLabel>
              <TextLabel>Course Number:</TextLabel>
              <TextInput name="number" type="text" onChange={this.handleChange}/>
            </ItemLabel>
            <ItemLabel>
              <TextLabel>Course Title:</TextLabel>
              <TextInput name="title" type="text" onChange={this.handleChange}/>
            </ItemLabel>
          </Form>
          </Container>
        </Panel>
        <Panel>
          <Container>
            <Header2>Results</Header2>
            <ItemLabel>
            <ResultElementContainer>
              {classes}
            </ResultElementContainer>
            </ItemLabel>
          </Container>
        </Panel>
        <Panel>
          <Container>
            <ItemLabel>
              <CreateButton type="button" onClick={this.handleSubmit}>Sign Up for Selected</CreateButton>
            </ItemLabel>
          </Container>
        </Panel>
      </PanelContainer>

    )
  }
}

export default FindClassView;
