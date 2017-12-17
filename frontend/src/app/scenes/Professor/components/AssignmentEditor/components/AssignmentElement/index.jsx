import React from 'react';
import styled from 'styled-components';
import FaEdit from 'react-icons/lib/fa/pencil-square';
import FaMinus from 'react-icons/lib/fa/minus-square';

const Container = styled.li`
  font-size:20px;
  font-family:Avenir;
  list-style-type: none;
  margin-bottom:10px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconContainer = styled.span`
  width:100%;
`;

const TextContainer = styled.span`
  width:100%;
`;

const IconSpan = styled.span`
  font-size:20px;
  float:right;
  &:hover {
    cursor:pointer;
    color:gray;
  }
`;

const DescriptionContainer = styled.div`
  font-size:14px;
`;

class AssignmentElement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <HeaderContainer>
          <TextContainer>{this.props.assignment.assignment_name}</TextContainer>
          <IconContainer><IconSpan onClick={() => this.props.onEditClick(this.props.assignment)}><FaEdit/></IconSpan><IconSpan onClick={() => this.props.onDeleteClick(this.props.assignment)}><FaMinus/></IconSpan></IconContainer>
        </HeaderContainer>
        <DescriptionContainer>
          {this.props.assignment.description}
        </DescriptionContainer>
      </Container>
    );
  }
}

export default AssignmentElement;
