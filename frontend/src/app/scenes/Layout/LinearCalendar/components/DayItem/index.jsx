import React from 'react';
import styled from 'styled-components';
import AssignmentsContainer from './components/AssignmentsContainer/index.jsx';

const Container = styled.div`
  width:95%;
  background:white;
  margin: 0 auto;
  text-align: left;
`;

const Day = styled.li`
  overflow: hidden;
  background-color:	white;
  color: #A9A9A9;
  width:100%;

  font-family:Avenir;
  font-size:16px;
  padding-top:5px;
  padding-bottom:5px;
  list-style:none;
  margin: 0;
  padding: 0;
  text-align: center;

  /*&:hover {
    background-color:lightgray;
    cursor: pointer;
  }*/

  &:before,
  &:after {
   background-color: #A9A9A9;
   content: "";
   display: inline-block;
   height: 1px;
   position: relative;
   vertical-align: middle;
   width: 50%;
  }

  &:before {
   right: 0.5em;
   margin-left: -50%;
  }

  &:after {
   left: 0.5em;
   margin-right: -50%;
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
    //const {hidden} = this.state;
    //this.setState({['hidden']: !hidden});
  }

  render() {
    return(
      <Container>
        <Day onClick={this.onClick}>{this.props.day}</Day>
        <AssignmentsContainer hidden={this.state.hidden} assignments={this.props.assignments}/>
      </Container>
    );
  }
}

export default DayItem;
