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

  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
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
