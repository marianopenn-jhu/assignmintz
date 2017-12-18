import React from 'react';
import styled from 'styled-components';


const AccButton = styled.button`
  display: inline-block;
  border-radius: 4px;
  background-color: #424242;
  width: 120px;
  margin: 5px;
  font-family: Avenir;
  font-size: 14px;
  color: rgb(177, 217, 231);
  padding: 4px;

  .clicked {
    color: orange;
    background-color:white;
  }

  &:hover, &:focus, &:active {
    color: #BEE6CC;
    box-shadow: 0px 0px 1px 1px #c6c6c6;
    background-color: #686868;
  }

`;

class AccountButton extends React.Component {
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
      <AccButton>{this.props.value}</AccButton>
      // <TabElement>
      //   <TabLink href="#" onFocus={this.onFocus.bind(this)} >{this.props.title}</TabLink>
      //   <TabBorder style={currentBorder}></TabBorder>
      // </TabElement>
    );
  }
}

export default AccountButton;
