import React from 'react';
import styled from 'styled-components';
import LinearCalendar from './components/LinearCalendar/index.jsx';

const Container = styled.div`
  position: absolute;
  top: 15%;
  left: 5%;
  width:90%;
`;

class ProfessorView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return(
      <Container>
        <LinearCalendar/>
      </Container>
    );
  }
}

export default ProfessorView;
