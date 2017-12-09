import React from 'react';
import styled from 'styled-components';
import SidebarElement from './components/SidebarElement/index.jsx';
import SidebarUserInfo from './components/SidebarUserInfo/index.jsx';
import SidebarClassesTitle from './components/SidebarClassesTitle/index.jsx';

const SidebarPanel = styled.div`
    background:#BEE6CC;
    height: 100%;
    width: 20%;
    position: absolute;
    left: 0;
    top: 0;
    -moz-border-radius-bottomright: 3px;
    border-bottom-right-radius: 3px;
    -moz-border-radius-topright: 3px;
    border-top-right-radius: 3px;
`;

const SidebarTitleContainer = styled.div`
  width:90%;
  text-align:center;
`;

const SidebarTitle = styled.h1`
  color: black;
  font-family: Avenir;
  font-style: regular;
  font-weight: lighter;
  font-size: 34px;
  text-align: center;
`;

const SidebarElementContainer = styled.ul`
    width:100%;
    text-align:center;
    margin: 0;
    padding: 0;
`;

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Retrieve the classes from the props
        let classes = (
          <div>N/A</div>
        );
        if (this.props.data != null) {
          classes = this.props.data.map((e, i) => {
            return (
              <SidebarElement key={i} course={e}/>
            )
          });
        };

        return (
            <SidebarPanel>
              <SidebarTitleContainer>
                <SidebarTitle></SidebarTitle>
              </SidebarTitleContainer>
              <SidebarElementContainer>
                <SidebarUserInfo data={this.props.user_data}/>
                <SidebarClassesTitle triggerEvent={this.props.addClass}/>
                {classes}
              </SidebarElementContainer>
            </SidebarPanel>
        );

    }
}

export default Sidebar;


/*var sidebarTitle = (
    <div style="width: inherit; font-size: 40px;" id="p-1-box-13" data-component-type="text"
         className="box pos type-text liveUpdate-textColor changeProperty-textColor changeProperty-textAlign changeProperty-lineHeight changeProperty-textSpacingv2-text">
        <div className="text-contents  liveUpdate-backgroundColor changeProperty-backgroundColor"
             style="background-color: rgba(0,0,0,0);">
            <span data-editableproperty="text">Assign<span
                style="color:rgba(167,224,165,1);">Mintz</span></span>
        </div>
    </div>
);

var settingsLogo = (
    <span style="width: inherit">
        <SettingsLogo>
            <button type="button" className="btn btn-xs">
                <span className="glyphicon glyphicon-cog"></span>
            </button>
        </SettingsLogo>
    </span>

);
var sidebarHeader = (
    <div class="sidebar-header">
        <h3 style="color: white"> Welcome <span id="username"> </span> </h3>
        <div id="app">app</div>
        <div id="root">root</div>
    </div>
);*/
