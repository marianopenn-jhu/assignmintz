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

/*
  A linear calendar, expecting a props list of assignments
  as its data. Props:
    data
*/
class LinearCalendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // TODO: For now, we assume that the due data is December 9th
    if (this.props.data != null) {
      var current = this.props.data.map((e, i) => {
        return (
          <DayItem key={i} day="December 9th, 2017" assignments={[e]}/>
        )
      });
    } else {
      current = <DayItem day="Your schedule is free!"/>
    }

    return(
      <ScrollableList>
        {current}
      </ScrollableList>
    );
  }
}

export default LinearCalendar;
