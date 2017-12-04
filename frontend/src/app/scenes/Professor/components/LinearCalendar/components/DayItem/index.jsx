import React from 'react';
import styled from 'styled-components';

const Day = styled.li`
  background-color:	#D3D3D3;
  color: black;

  font-family:Avenir;
  font-size:16px;
  list-style:none;
  padding:25px;

  &:hover {
    background-color:white;
    cursor: pointer;
  }
`;

const Item = styled.li`
  background-color:	white;
  color: black;

  font-family:Avenir;
  font-size:16px;
  list-style:none;
  padding:25px;

  &:hover {
    background-color:#D3D3D3;
    cursor: pointer;
  }
`;

class DayItem extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.state={
      hidden:true
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
      <Item style={{visibility: this.state.hidden ? 'visible' : 'hidden' }}>Test Item 1</Item>
      </div>
    );
  }
}

export default DayItem;
