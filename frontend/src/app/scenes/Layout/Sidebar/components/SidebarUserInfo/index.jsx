import React from 'react';
import styled from 'styled-components';

const Element = styled.li`
  width:100%;
  list-style:none;
  background:#BEE6CC;
  color:#4f1e3e;
  padding: 0;
  padding-bottom:10px;
  padding-top:10px;

  &:hover {
    background: #80cc9b;
    color: #170912;
  }
`;

class SidebarUserInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      const user_data = this.props.data;

      return (
          <Element>
            {user_data}
          </Element>
      );
    }
}

export default SidebarUserInfo;
