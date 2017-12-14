import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import FaEllipsis from 'react-icons/lib/fa/ellipsis-v';

const FindClassElementDiv = styled.li`
  width:100%;
  list-style:none;
  background: #686868;
  color: #BEE6CC;
  padding: 0;
  padding-bottom:10px;
  padding-top:10px;
  font-family:Avenir;
  font-size:15px;

  &:hover {
    cursor:pointer;
    background: #484848;
    color: rgb(177, 217, 231);
  }

  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
`;

const ElipseSpan = styled.span`
  font-size:20px;
`;

class FindClassElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          course : this.props.course,
          course_id : this.props.course.course_id
        }
    }

    render() {
      const id = this.state.course_id;
      // var FindClassElements = [];

      return (
          <FindClassElementDiv>
            {id}
          </FindClassElementDiv>
      );
    }
}

export default FindClassElement;
