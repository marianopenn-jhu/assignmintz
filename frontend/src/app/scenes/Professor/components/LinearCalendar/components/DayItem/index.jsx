import React from 'react';
import styled from 'styled-components';
import AssignmentsContainer from './components/AssignmentsContainer/index.jsx';

const Day = styled.li`
  background-color:	#808080;
  color: black;

  font-family:Avenir;
  font-size:16px;
  list-style:none;
  padding:15px;

  &:hover {
    background-color:#A9A9A9;
    cursor: pointer;
  }
`;

class DayItem extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.state={
      hidden:false,
    };
  }

  onClick() {
    const {hidden} = this.state;
    this.setState({['hidden']: !hidden});
  }

  render() {
    return(
      <div>
        <Day onClick={this.onClick}>{this.props.day}</Day>
        <AssignmentsContainer hidden={this.state.hidden} assignments={this.props.assignments}/>
      </div>
    );
  }
}

export default DayItem;
