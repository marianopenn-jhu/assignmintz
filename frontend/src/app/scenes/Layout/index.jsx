import React from 'react';
import styled from 'styled-components';


const SidebarPanel = styled.nav`
    left: 0px;
    float: right;
    min-width: 250px;
    max-width: 250px;
    height: 100vh;
    /*background-image: linear-gradient(-87deg, #042c6c 08%, #053787 100%);*/
    background-color: #303030;
    `;
const SidebarComponents = style.ul`
    padding: 10px 0;
    /*border-bottom: 1px solid #47748b;*/
`;

const NewClass = style.div`
    position: relative;
    color: black;
    bottom: 10px;
/*
#newClassDiv:hover{
    color: #BEE6CC;
    box-shadow: 0px 5px 2px #212121, 0px -5px 2px #212121;
    background-color: #686868;
}*/
`;


class Sidebar extends React.Component {
    constructor(props) {
        super(props);

    }

    /*my functions*/

    render() {
        let current = null;

        current = (
            <div>
            </div>
        );

        sidebarTitle = (
            <div style="width: inherit; font-size: 40px;" id="p-1-box-13" data-component-type="text"
                 className="box pos type-text liveUpdate-textColor changeProperty-textColor changeProperty-textAlign changeProperty-lineHeight changeProperty-textSpacingv2-text">
                <div className="text-contents  liveUpdate-backgroundColor changeProperty-backgroundColor"
                     style="background-color: rgba(0,0,0,0);">
                    <span data-editableproperty="text">Assign<span
                        style="color:rgba(167,224,165,1);">Mintz</span></span>
                </div>
            </div>
        );

        settingsLogo = (
            <span style="width: inherit">
                <SettingsLogo>
                    <button type="button" className="btn btn-xs">
                        <span className="glyphicon glyphicon-cog"></span>
                    </button>
                </SettingsLogo>
            </span>

        );
        sidebarHeader = (
            <div class="sidebar-header">
                <h3 style="color: white"> Welcome <span id="username"> </span> </h3>
                <div id="app">app</div>
                <div id="root">root</div>
            </div>
        );

        classes = (
            <ul class="list-unstyled components">
                <li classname="header"><a>Classes</a></li>
                <li data-selected="true">
                    <a data-selected="true" id="class1"> course </a>
                </li>
                <li data-selected="false">
                    <a> course </a>
                </li>
                <li data-selected="false">
                    <a> course </a>
                </li>
                <li data-selected="false">
                    <a> course </a>
                </li>
            </ul>
        );

        return (
            <SidebarPanel>
                {sidebarTitle}
                {/*settinglogo*/}
                {sidebarHeader}
                Emily
                <div>
                    {classes}
                </div>
                <NewClass
                    onmouseover={this.writeJSfn}
                />
            </SidebarPanel>
        );

    }
}

export default Sidebar;
