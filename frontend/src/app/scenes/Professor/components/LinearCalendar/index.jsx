import React from 'react';
import styled from 'styled-components';
import DayItem from './components/DayItem/index.jsx';

const ScrollableList=styled.ul`
  overflow:hidden;
  overflow-y:auto;
  min-height:500px;
  height:500px;
  max-height:auto;
`;

var obj = {
  title: "title",
  info:"info"
}

// TODO: Send the Calendar its items via props
class LinearCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return(
      <ScrollableList>
        
      </ScrollableList>
    );
  }
}

export default LinearCalendar;
