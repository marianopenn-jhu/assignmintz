import React from 'react';
import styled from 'styled-components';
import FindClassView from '../../Student/components/FindClassView/index.jsx';

// const ViewPaneContainer = styled.div`
//     height: auto;
//     overflow: hidden;
// `;
const ViewPaneContainer = styled.div`
position: relative;
float: right;
left: 25vw;
width: 75vw;
`;

const ViewPanePanel = styled.div`
    overflow-x: hidden;
    min-height: 50px;
    height: 80%;
    width: 100%;
    left:inherit;
    position: fixed;
    background-color: #303030;

    -moz-border-radius-bottomright: 3px;
    border-bottom-right-radius: 3px;
    -moz-border-radius-topright: 3px;
    border-top-right-radius: 3px;
`;


class ViewPane extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <ViewPaneContainer>
            <ViewPanePanel>
              <FindClassView session_key={this.props.session_key} user_name={this.props.user_name} onClose={this.returnToCalendar}/>
            </ViewPanePanel>
          </ViewPaneContainer>
        );

    }
}

export default ViewPane;
