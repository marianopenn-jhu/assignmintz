import React from 'react';
import styled from 'styled-components';
import FaPlus from 'react-icons/lib/fa/plus-square';

const Container = styled.li`
  font-size:20px;
  font-family:Avenir;
  list-style-type: none;
  margin-bottom:10px;
  padding-top:20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TextContainer = styled.span`
  display:inline-block;
`;

const IconSpan = styled.span`
  display:inline-block;
  font-size:20px;
  padding-left:12px;
  &:hover {
    cursor:pointer;
    color:gray;
  }
`;

class AddAssignmentElement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <HeaderContainer>
          <TextContainer>Add New Assignment </TextContainer>
          <IconSpan onClick={() => this.props.onClick()}><FaPlus/></IconSpan>
        </HeaderContainer>
      </Container>
    );
  }
}

export default AddAssignmentElement;
