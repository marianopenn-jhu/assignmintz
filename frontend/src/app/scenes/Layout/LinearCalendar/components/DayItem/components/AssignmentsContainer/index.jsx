import React from 'react';
import styled from 'styled-components';
import AssignmentItem from './components/AssignmentItem/index.jsx';

var styles = {
  hiddenItem: {
    display:'none'
  },

  none: {
  }
};

class AssignmentsContainer extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    if (this.props.assignments)
    {
      var that = this;

      var assignmentNodes = this.props.assignments.map(function(a, i){
        return (
          <AssignmentItem key={i} data={a} session_key={that.props.session_key} user_name={that.props.user_name}/>
        );
      });

      return(
        <div style={that.props.hidden ? styles.hiddenItem : styles.none}>
          {assignmentNodes}
        </div>
      )
    }

    // Default empty case
    return(
      <div></div>
    )
  }
}

export default AssignmentsContainer;
