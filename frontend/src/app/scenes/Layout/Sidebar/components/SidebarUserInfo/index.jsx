import React from 'react';
import styled from 'styled-components';
import FaAngleDown from 'react-icons/lib/fa/caret-down'

const Element = styled.li`
  width:100%;
  list-style:none;
  background:#BEE6CC;
  color:#170912;
  padding: 0;
  padding-bottom:20px;
  padding-top:20px;
  display:inline-block;

  font-family:Avenir;
  font-size:20px;

  &:hover {
    background: #80cc9b;
    color:white;
    cursor:pointer;
  }
`;

const ArrowSpan = styled.span`
  padding-left:10px;
`;

const ArrowContainer = styled.div`
  padding-left:10px;
`;

class SidebarUserInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      const user_data = this.props.data;

      return (
          <Element>
            {user_data}<ArrowSpan><FaAngleDown/></ArrowSpan>
          </Element>
      );
    }
}

export default SidebarUserInfo;
