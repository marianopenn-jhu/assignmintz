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

const Content = styled.p`
  font-family:Avenir;
  font-size:14px;
  padding-left:50px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

class StudentClassView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      assignments: []
    }
  }

  render() {

    return (
      <PanelContainer>
        <Panel>
          <Container>
            <XOut onClick={this.props.onClose}><FaClose/></XOut>
            <Header>{this.props.course.course_title}: {this.props.course.course_id}</Header>
            <Content>
              <b>Description </b> {this.props.course.description}
            </Content>
          </Container>
        </Panel>
      </PanelContainer>

    )
  }
}

export default StudentClassView;
