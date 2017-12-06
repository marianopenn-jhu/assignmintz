import React from 'react';
import styled from 'styled-components';

const Item = styled.li`
  background-color:	white;
  color: black;

  font-family:Avenir;
  font-size:16px;
  list-style:none;
  padding:15px;

  &:hover {
    background-color:#D3D3D3;
    cursor: pointer;
  }
`;

const Header=styled.h1`
  color:red;
`;

const Body=styled.p`
  color:green;
`;

class AssignmentItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Item>
        <Header>{this.props.data.assignment_name}</Header>
        <Body>{this.props.data.assignment_type}</Body>
      </Item>
    )
  }
}

export default AssignmentItem;
