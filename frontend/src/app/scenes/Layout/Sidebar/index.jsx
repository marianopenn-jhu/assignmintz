import React from 'react';
import styled from 'styled-components';
import TransitionGroup from 'react-addons-transition-group';
import SidebarElement from './components/SidebarElement/index.jsx';
import SidebarUserInfo from './components/SidebarUserInfo/index.jsx';
import SidebarClassesTitle from './components/SidebarClassesTitle/index.jsx';

const SidebarContainer = styled.div`
    height: auto;
`;

const SidebarPanel = styled.div`
    background-color: #303030;
    height: 100%;
    min-width: 25vw;
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

  &:hover {
    cursor:pointer;
  }
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
    font-family: Helvetica;
    font-style: italic;
    font-weight: lighter;
    text-align: center;
`;
const SidebarTitleMintz = styled.span`
    font-family: Helvetica;
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

    componentWillEnter (callback) {
      const el = this.container;
      TweenMax.fromTo(el, 0.3, {y: 100, opacity: 0}, {y: 0, opacity: 1, onComplete: callback});
    }

    componentWillLeave (callback) {
      const el = this.container;
      TweenMax.fromTo(el, 0.3, {y: 0, opacity: 1}, {y: -100, opacity: 0, onComplete: callback});
    }

    render() {
        // Retrieve the classes from the props
        let classes = (
          <div>N/A</div>
        );
        if (this.props.data != null) {
          classes = this.props.data.map((e, i) => {
            return (
              <SidebarElement key={i} course={e} dropdown_elements={this.props.dropdown_elements} triggerEvent={this.props.viewClass}/>
            )
          });
        };

        return (
          <TransitionGroup>
          <SidebarContainer>
            <SidebarPanel>
              <SidebarTitleContainer>
                <SidebarTitle>Assign
                <SidebarTitleMintz>Mintz</SidebarTitleMintz>
                </SidebarTitle>
              </SidebarTitleContainer>
              <SidebarElementContainer>
                <SidebarUserInfo data={this.props.user_data}/>
                <SidebarClassesTitle triggerEvent={this.props.addClass}/>
                {classes}
              </SidebarElementContainer>
            </SidebarPanel>
          </SidebarContainer>
          </TransitionGroup>
        );
    }
}

export default Sidebar;
