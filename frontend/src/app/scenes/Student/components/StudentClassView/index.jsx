import React from 'react';
import styled from 'styled-components';
import FaClose from 'react-icons/lib/fa/close';
import {getCourses} from '../../../../services/api/course/get-course.js';

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
  overflow-x: auto;
  min-height: 70px;
  width: 100%;
  padding-top:10px;
  background:grey;
`;

const Container = styled.div`
  overflow:hidden;
  overflow-y:auto;
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

class StudentClassView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      course_id:'',
      courses:''
    }
  }

  handleChange(e) {
    this.setState({course_id: e.target.value});
  }

  handleSubmit(event) {
    const {course_id} = this.state.course_id;

    // getCourses(course_id).then((response) => {
    //   if (response.status) {
    //     {this.props.onClose};
    //   }
    //   else {
    //     alert(response.body);
    //   }
    // });
  }

  if(course_id){
    getCourses(this.state.course_id).then((response) => {
      if(response.status == true){
        var obj = response.body;
        this.setState({courses: obj.objects});
      } else {
        console.log("Failed to retrieve courses!");
      }
    });
  }

  render() {
    let classes = (
      <div>N/A</div>
    );
    if (this.state.course_id != null) {
      // classes = this.props.data.map((e, i) => {
      //   return (
      //     <FindClassElement key={i} course={e}/>
      //   )
      // });
      assignments = this.props.data.map((e,i)=> {
        return(
          <AssignmentElement key={i} course={e}/>
        )
      });
    };


    return (
      <PanelContainer>
        <Panel>
          <Container>
          <XOut onClick={this.props.onClose}><FaClose/></XOut>
          <Header>Add a Class</Header>
          <Form onSubmit={this.handleSubmit}>
            <ItemLabel>
              <TextLabel>Course Number:</TextLabel>
              <TextInput name={this.state.course_id} type="text" onChange={this.handleChange} disabled={true}/>
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
      </PanelContainer>

    )
  }
}

export default StudentClassView;
