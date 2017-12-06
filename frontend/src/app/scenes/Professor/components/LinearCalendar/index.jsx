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
        <DayItem day="Sunday December 10th, 2017"/>
        <DayItem day="Monday December 11th, 2017"/>
        <DayItem day="Tuesday December 12th, 2017"/>
        <DayItem day="Wednesday December 13th, 2017"/>
        <DayItem day="Thursday December 14th, 2017"/>
        <DayItem day="Friday December 15th, 2017"/>
        <DayItem day="Saturday December 16th, 2017"/>
        <DayItem day="Sunday December 17th, 2017"/>
        <DayItem day="Monday December 18th, 2017"/>
        <DayItem day="Tuesday December 19th, 2017"/>
        <DayItem day="Wednesday December 20th, 2017"/>
        <DayItem day="Thursday December 21th, 2017"/>
        <DayItem day="Friday December 22th, 2017"/>
        <DayItem day="Saturday December 23th, 2017"/>
      </ScrollableList>
    );
  }
}

export default LinearCalendar;
