import React from 'react';
import styled from 'styled-components';
import DayItem from './components/DayItem/index.jsx';

const ScrollableList=styled.ul`
  overflow:hidden;
  overflow-y:auto;
  height: 100%;
  width: 80%;
  position: absolute;
  right: 0;
  top: 0;
  margin: 0;
  padding: 0;
  padding-top:10px;
  background:white;
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
          <DayItem key={i} day="December nth, 2017" assignments={[e]}/>
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
