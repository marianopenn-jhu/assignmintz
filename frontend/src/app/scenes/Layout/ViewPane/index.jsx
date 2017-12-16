import React from 'react';
import styled from 'styled-components';
import FindClassView from '../../Student/components/FindClassView/index.jsx';
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
          courses:[]
        };
    }


    render() {
        return (
          <ViewPaneContainer>
            <FindClassView session_key={this.props.session_key} user_name={this.props.user_name} onClose={this.returnToCalendar} data={this.state.courses}/>
          </ViewPaneContainer>
        );

    }
}

export default ViewPane;
