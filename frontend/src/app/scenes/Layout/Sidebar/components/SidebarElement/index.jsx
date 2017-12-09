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
  font-family:Avenir;
  font-size:15px;

  &:hover {
    background: #80cc9b;
    color: #170912;
    cursor:pointer;
  }
`;

class SidebarElement extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      const course_info = this.props.course;

      return (
          <Element>
            {course_info.course_title} ({course_info.course_id})
          </Element>
      );
    }
}

export default SidebarElement;
