import React from 'react';
import styled from 'styled-components';
import FadeIn from 'react-fade-in';
import MintzModal from '../MintzModal/index.jsx';
import FindClassView from '../../Student/components/FindClassView/index.jsx';
import StudentClassView from '../../Student/components/StudentClassView/index.jsx';
import CreateClassView from '../../Professor/components/CreateClassView/index.jsx';
import DeleteClassView from '../../Professor/components/DeleteClassView/index.jsx';
import AssignmentEditor from '../../Professor/components/AssignmentEditor/index.jsx';
//**  MIDDLE MAN FOR RHS PANEL  **//
//ensures panel dimensions correct//

const ViewPaneContainer = styled.div`
position: relative;
float: left;
left: 25vw;
width: 75vw;
height: 100vh;
overflow: scroll;
`;

class ViewPane extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          // demo props
          run: false,
          // fade props
          in: true,
          interval: 50,
          delay: 500
        };
    }

    render() {
      let view = null;
      if (this.props.role == "Student") {
        console.log("got to student");
        if (this.props.case == 1) {
          view = (
            <FindClassView session_key={this.props.session_key} user_name={this.props.user_name} onClose={this.props.onClose}/>
          )
        } else if (this.props.case == 2) { // View single class
          view = (
            <StudentClassView course={this.props.course} session_key={this.props.session_key} user_name={this.props.user_name} onClose={this.props.onClose}/>
          )
        } else if (this.props.case == 4) { //leaderboard
          view = (
            <MintzModal />
          )
          console.log("we got a case 4");
        }

      } else if (this.props.role == "Professor") {
        if (this.props.case == 1) {
          view = (
            <CreateClassView session_key={this.props.session_key} user_name={this.props.user_name} onClose={this.props.onClose} data={this.props.data}/>
          )
        } else if (this.props.case == 3) {
          view = (
            <DeleteClassView user_name={this.props.user_name} session_key={this.props.session_key} onClose={this.props.onClose} course={this.props.course}/>
          )
        }else if (this.props.case == 4) {
          view = (
            <AssignmentEditor session_key={this.props.session_key} user_name={this.props.user_name} onClose={this.props.onClose} course={this.props.course}/>
          )
        }
      }
        return (
          <FadeIn>
            <ViewPaneContainer>
              {view}
            </ViewPaneContainer>
          </FadeIn>
        );

    }
}

export default ViewPane;
