import React from 'react';
import styled from 'styled-components';
import DayItem from './components/DayItem/index.jsx';
import TopBar from './components/TopBar/index.jsx';

const ViewPane = styled.div`
position: relative;
float: left;
left: 25vw;
width: 75vw;
height: 100vh;
`;

const TopBarContainer = styled.div`
  overflow-x: hidden;
  height: 10vh;
  width: 100%;
  left: inherit;
  position:fixed;
  padding-top:10px;
  background:white;
`;

const ScrollableList=styled.ul`
  margin-top: 10vh;
  overflow:hidden;
  overflow-y:auto;
  padding-top:10px;
  background:white;
`;

var obj = {
  title: "title",
  info:"info"
}

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

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
    // Create a dictionary with dates corresponding to assignments
    var assignmentDict = {};
    var arrayLength = this.props.data.length;
    for (var i = 0; i < arrayLength; i++) {
        var e = this.props.data[i];

        var due_date = e.due_date;

        // Find month and year
        var ss = due_date.split('-');
        var year = ss[0];
        var month = ss[1];

        // Find day and time
        var sss = ss[2].split('T');
        var day = sss[0];
        var time = sss[1];

        var bucket = month + "/" + day + "/" + year;
        if (bucket in assignmentDict) {
          var items = assignmentDict[bucket];

          // Find if item is already in dictionary
          var itemIndex = 0;
          for (; itemIndex < items.length; itemIndex++) {
              if (items[itemIndex].assignment_id == e.assignment_id) {
                  break;
              }
          }

          // Add it if its not
          if (itemIndex == items.length) {
            items.push(e);
            assignmentDict[bucket] = items;
          }
        } else {
          assignmentDict[bucket] = [e];
        }
    }

    var current = (<DayItem day="Your schedule is free!"/>);
    var current = Object.keys(assignmentDict).map((key, index) => (
       <DayItem key={index} day={key} assignments={assignmentDict[key]}/>
    ));

    return(
      <ViewPane>
        <TopBarContainer>
          <TopBar user_name={this.props.user_name} session_key={this.props.session_key} onLogout={this.props.onLogout}/>
        </TopBarContainer>
        <ScrollableList>
          {current}
        </ScrollableList>
      </ViewPane>
    );
  }
}

export default LinearCalendar;
