import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import FaEllipsis from 'react-icons/lib/fa/ellipsis-v';

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

  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
`;

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

const ElipseSpan = styled.span`
  font-size:20px;
`;

var styles = {
  hidden: {
    display:'none'
  },

  none: {
    display:'inline'
  }
};

class SidebarElement extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.state = {
          hidden:true
        }
    }

    componentWillMount() {
      document.addEventListener('click', this.handleClick, false);
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.handleClick, false);
    }

    handleClick(e) {
      if(!ReactDOM.findDOMNode(this).contains(e.target)) {
        this.setState({['hidden']: true});
      }
      else {
        const {hidden} = this.state;
        this.setState({['hidden']: !hidden});
      }
    }

    render() {
      const course_info = this.props.course;

      return (
          <Element>
            {course_info.course_title} ({course_info.course_id}) <ElipseSpan><FaEllipsis/></ElipseSpan>

            <Dropdown style={this.state.hidden ? styles.hidden : styles.none}>
              <DropdownElement href="#">Edit</DropdownElement>
              <DropdownElement href="#">Delete</DropdownElement>
            </Dropdown>
          </Element>
      );
    }
}

export default SidebarElement;
