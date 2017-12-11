import React from 'react';
import styled from 'styled-components';
import FaClose from 'react-icons/lib/fa/close';
import {deleteCourse} from '../../../../services/api/course/delete-course.js'

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

const Button = styled.div`
  text-align:center;
`;

class DeleteClassView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    deleteCourse(this.props.course_id);
  }

  render() {
    return (
        <Container>
          <XOut onClick={this.props.onClose}><FaClose/></XOut>
          <Header>Delete {this.props.course.course_name}?</Header>
        </Container>
    )
  }
}

export default DeleteClassView;
