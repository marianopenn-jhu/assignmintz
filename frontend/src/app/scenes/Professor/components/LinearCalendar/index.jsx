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

class LinearCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return(
      <ScrollableList>
        <DayItem day="Sunday"/>
        <DayItem day="Monday"/>
        <DayItem day="Tuesday"/>
        <DayItem day="Wednesday"/>
        <DayItem day="Thursday"/>
        <DayItem day="Friday"/>
        <DayItem day="Saturday"/>
        <DayItem day="Sunday"/>
        <DayItem day="Monday"/>
        <DayItem day="Tuesday"/>
        <DayItem day="Wednesday"/>
        <DayItem day="Thursday"/>
        <DayItem day="Friday"/>
        <DayItem day="Saturday"/>
      </ScrollableList>
    );
  }
}

export default LinearCalendar;
