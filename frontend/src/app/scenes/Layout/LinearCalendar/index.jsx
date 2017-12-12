import React from 'react';
import styled from 'styled-components';
import DayItem from './components/DayItem/index.jsx';
import TopBar from './components/TopBar/index.jsx';

const Wrapper = styled.div`
  position: relative;
  float: right;
  left: 25vw;
  width: 75vw;
`;

const TopBarContainer = styled.div
`
  overflow-x: hidden;
  min-height: 50px;
  height:7%;
  width: 100%;
  left: inherit;
  position:fixed;
  padding-top:10px;
  background:white;
`;

const ScrollableList=styled.ul`
  overflow:hidden;
  overflow-y:auto;
  height: 93%;
  width: 80%;
  position: absolute;
  right: 0;
  top: 7%;
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
      <Wrapper>
        <TopBarContainer>
          <TopBar user_data={this.props.user_data} session_key={this.props.session_key} onLogout={this.props.onLogout}/>
        </TopBarContainer>
        <ScrollableList>
          {current}
        </ScrollableList>
      </Wrapper>
    );
  }
}

export default LinearCalendar;
