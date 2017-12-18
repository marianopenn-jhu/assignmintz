import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import FaEllipsis from 'react-icons/lib/fa/ellipsis-v';

const Element = styled.li`
  width:100%;
  list-style:none;
  //mint green #BEE6CC
  background: #686868;
  color: #BEE6CC;
  //dark grey #4f1e3e;
  padding: 0;
  padding-bottom:10px;
  padding-top:10px;
  font-family:Avenir;
  font-size:15px;
  border-top:1px solid #303030;
  position: relative;

  &:hover {
    // blah green #80cc9b;
    // color: #170912;
    cursor:pointer;
    background: #484848;
    color: rgb(177, 217, 231);
    //greyy #686868;
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
  right: -125px;
  top: 3px;
  background-color: #959595;
  min-width: 130px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  font-size:12px;
`;

const DropdownElement = styled.a`
  color: black;
  padding: 8px 0px;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: #f1f1f1;
    color: #484848;
    text-decoration:none;
  }
`;

const ElipseSpan = styled.span`
  position: absolute;
  right: 0;
  margin-right: 2px;
`;

var styles = {
  hidden: {
    display:'none'
  },

  none: {
    display:'inline'
  }
};

class Mintz extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.openClass = this.openClass.bind(this);
        this.state = {
          hidden:true
        }
    }

    openClass() {
      if (this.props.triggerEvent) {
        this.props.triggerEvent();
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

      var elements = [];
      var dropdown_elements = (<div></div>);
      if (this.props.dropdown_elements) {
        elements = this.props.dropdown_elements;

        dropdown_elements = (
          elements.map(function(e, index){
            return <DropdownElement onClick={() => e.onClick(course_info.course_title, course_info.course_id)} key={ index }>{e.name}</DropdownElement>;
          })
        );
      }

      return (
          <Element onClick={this.props.openLeaderboard}>

          </Element>
      );
    }
}

export default Mintz;
