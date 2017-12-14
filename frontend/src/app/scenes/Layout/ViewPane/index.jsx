import React from 'react';
import styled from 'styled-components';
import FindClassView from '../../Student/components/FindClassView/index.jsx';
import CreateClassView from '../../Professor/components/CreateClassView/index.jsx';
//**  MIDDLE MAN FOR RHS PANEL  **//
//ensures panel dimensions correct//

const ViewPaneContainer = styled.div`
position: relative;
float: left;
left: 25vw;
width: 75vw;
height: 100vh;
`;

class ViewPane extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          courses:[],
          role:""
        };
  }

    render() {

      let view = null;
      if (this.props.role == "student") {
        if (this.props.case == 1) {
          view = (
            <FindClassView session_key={this.props.session_key} user_name={this.props.user_name} onClose={this.returnToCalendar} data={this.props.data}/>
          )
        } else if (this.props.case == 2) {
          view = (
            // <FindClassView session_key={this.props.session_key} user_name={this.props.user_name} onClose={this.returnToCalendar} data={this.props.data}/>
            <StudentClassView/>
          )
        }

      } else if (this.props.role == "professor") {
        view = (
          <CreateClassView session_key={this.props.session_key} user_name={this.props.user_name} onClose={this.returnToCalendar} data={this.props.data}/>
        )
      }
        return (
          <ViewPaneContainer>
            {view}
          </ViewPaneContainer>
        );

    }
}

export default ViewPane;
