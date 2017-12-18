import React from 'react';
import styled from 'styled-components';
import FaClose from 'react-icons/lib/fa/close';
import {deleteCourse} from '../../../../services/api/course/delete-course.js'

const Container = styled.div`
overflow:hidden;
overflow-y:auto;
right: 0;
top: 0;
margin: 30px;
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
const ItemLabel = styled.div
`
  display:block;
  width:85%;
  padding-top:20px;
  padding-bottom:20px;
  text-align:center;
`;
const DeleteButton = styled.button
`

`;

class DeleteClassView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    var filter = "?course_id=" + this.props.course.course_id + "&user=" + this.props.user_name + "&key=" + this.props.session_key;
    deleteCourse(filter);
  }

  render() {
    return (
        <Container>
          <XOut onClick={this.props.onClose}><FaClose/></XOut>
          <Header>Delete {this.props.course.course_name}?</Header>
          <ItemLabel onClick={this.handleSubmit}>
            <DeleteButton type="button" onClick={this.handleSubmit}>Delete Course</DeleteButton>
          </ItemLabel>
        </Container>
    )
  }
}

export default DeleteClassView;
