import React from 'react';
import styled from 'styled-components';

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

class AssignmentItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Item>
        <Header>{this.props.data.assignment_name}: Due by 5 pm</Header>
        <BodyWrapper>
          <Body>{this.props.data.assignment_type}</Body>
        </BodyWrapper>
      </Item>
    )
  }
}

export default AssignmentItem;
