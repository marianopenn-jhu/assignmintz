import React from 'react';
import styled from 'styled-components';

const TabElement = styled.li`
  position: relative;
  float: left;
  width: 50%;
  list-style: none;
  text-align: center;
`;

const TabBorder = styled.span`
  position: relative;
  width: 100%;
  float: left;
  background-color: #999;
  height: 2px;
`;

const TabLink = styled.a`
  text-decoration: none;
  font-family: Avenir;
  font-size: 20px;
  color: #999;
  line-height: 14px;
  padding: 20px ;
  display: block;
  transition: all 0.5s;

  &:hover {
    color: #666;
    text-decoration:none;
  }

  &:focus {
    color: #999;
    text-decoration:none;
  }
`;

class Tab extends React.Component {
  constructor(props) {
    super(props);
  }

  onFocus()
  {
    if (this.props.onClicked != null)
    {
        this.props.onClicked();
    }
  }

  render()
  {
    var currentBorder;
    if (this.props.selected) {
      currentBorder = {backgroundColor: '#69FF7A'};
    } else {
      currentBorder = {backgroundColor: '#999'};
    }

    return (
      <TabElement>
        <TabLink href="#" onFocus={this.onFocus.bind(this)} >{this.props.title}</TabLink>
        <TabBorder style={currentBorder}></TabBorder>
      </TabElement>
    );
  }
}

export default Tab;
