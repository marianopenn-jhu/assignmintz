import React from 'react';
import styled from 'styled-components';

const Dropdown = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);

  z-index: 1;
`;

const DropdownElement = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: #f1f1f1;
  }
`;

var styles = {
  hidden: {
    display:'none'
  },

  none: {
    display:'inline'
  }
};

class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.state = {
          hidden:true
        }
    }
    render() {
      let current = null;

      this.props.items.map(function(e, index)
      {
        current = (
          <DropdownElement key={index} href={e.link}>{e.name}/DropdownElement>
        );
      });

      return (
          <Dropdown style={this.state.hidden ? styles.hidden : styles.none}>
            {current}
          </Dropdown>
      );
    }
}
