import React from 'react';
import styled from 'styled-components';
import SidebarElement from './components/SidebarElement/index.jsx';
import SidebarUserInfo from './components/SidebarUserInfo/index.jsx';

const SidebarContainer = styled.div`
    height: auto;
    overflow: hidden;
`;

const SidebarPanel = styled.div`
    background-color: #303030;
    height: 100%;
    min-width: 250px;
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
  left: 5%;
  right: 5%;
  text-align:center;
`;

// const SidebarTitle = styled.h1`
//   color: black;
//   font-family: Avenir;
//   font-style: regular;
//   font-weight: lighter;
//   font-size: 34px;
//   text-align: center;
// `;
const SidebarTitle = styled.span`
    background-color: rgba(0,0,0,0);
    width: inherit;
    font-size: 34px;
    line-height: 123px;
    letter-spacing: 0px;
    color: rgb(177, 217, 231);
    font-family: Roboto;
    font-style: italic;
    font-weight: lighter;
    text-align: center;
`;
const SidebarTitleMintz = styled.span`
    color:rgba(167,224,165,1);
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
          <SidebarContainer>
            <SidebarPanel>
              <SidebarTitleContainer>
                <SidebarTitle>Assign
                <SidebarTitleMintz>Mintz</SidebarTitleMintz>
                </SidebarTitle>
              </SidebarTitleContainer>
              <SidebarElementContainer>
                "element"
                <SidebarUserInfo data={this.props.user_data}/>
                {classes}
              </SidebarElementContainer>
            </SidebarPanel>
          </SidebarContainer>
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
