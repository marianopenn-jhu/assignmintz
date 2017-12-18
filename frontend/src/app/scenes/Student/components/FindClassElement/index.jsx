import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import FaCheck from 'react-icons/lib/fa/check';

const FindClassElementDiv = styled.li`
  width:100%;
  list-style:none;
  background: #484848;
  color: #BEE6CC;
  padding: 0;
  padding-bottom:10px;
  padding-top:10px;
  font-family:Avenir;
  font-size:15px;

  &:hover {
    cursor:pointer;
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

const ContentContainer = styled.span`

`;

const FaCheckContainer = styled.span`
  font-size:24px;
  padding-left:20px;
`;

var styles = {
  hidden: {
    'color':'green'
  },

  none: {
    'color':'#484848'
  }
};

class FindClassElement extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.state = {
          selected: false
        }
    }

    onClick() {
      this.setState({['selected']:!this.state.selected});
      this.props.onClick(this.props.course.course_id);
    }

    render() {

      if (this.props.course.course_id.toLowerCase().indexOf(this.props.filter_id.toLowerCase()) > -1
        && this.props.course.course_title.toLowerCase().indexOf(this.props.filter_title.toLowerCase()) > -1)
      {
        return (
            <FindClassElementDiv onClick={this.onClick}>
              <ContentContainer>{this.props.course.course_id}: {this.props.course.course_title}</ContentContainer>
              <FaCheckContainer style={this.state.selected ? styles.hidden : styles.none} ><FaCheck/></FaCheckContainer>
            </FindClassElementDiv>
        );
      } else {
        return (
            <div>
            </div>
        );
      }

    }
}

export default FindClassElement;
