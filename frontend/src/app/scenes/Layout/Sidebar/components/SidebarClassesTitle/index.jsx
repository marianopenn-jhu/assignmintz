import React from 'react';
import styled from 'styled-components';
import FaPlusCircle from 'react-icons/lib/fa/plus-square-o';

const Container = styled.li`
  width:100%;
  list-style:none;
  color:#5d2349;
  padding:0px 30px 0px 30px;
  margin:0;
  font-family:'Avenir Next';
  font-size:16px;

  -webkit-touch-callout: none; /* iOS Safari */
   -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Firefox */
       -ms-user-select: none; /* Internet Explorer/Edge */
           user-select: none; /* Non-prefixed version, currently
                                 supported by Chrome and Opera */
`;

const LeftContainer = styled.div`
  width:50%;
  display:inline-block;
  text-align:left;
  font-size:18px;

  &:hover {
    color:black;
  }
`;

const RightContainer = styled.div`
  width:50%;
  display:inline-block;
  text-align:right;
`;

const Title = styled.span`
`;

const PlusSpan = styled.span`
  padding: 10px 10px 10px 10px;
  margin:0;
  font-size:20px;

  &:hover {
    color:black;
    cursor:pointer;
  }
`;

const Tooltip = styled.div`
  font-size:12px;
  text-align:center;
  position:absolute;
`;

class SidebarClassesTitle extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onPlusHover = this.onPlusHover.bind(this);
        this.onPlusUnHover = this.onPlusUnHover.bind(this);

        this.state = {
          tootltip_visibile: false
        }
    }

    onClick() {
      if (this.props.triggerEvent) {
          this.props.triggerEvent();
      }
    }

    onPlusHover() {
      this.setState({['tootltip_visibile'] : true});
    }

    onPlusUnHover() {
      this.setState({['tootltip_visibile'] : false});
    }

    // TODO: Add tooltip
    render() {
        let tooltip = null;
        if (this.state.tootltip_visibile) {
          tooltip = (
            <Tooltip>Create a Class</Tooltip>
          )
        }
        else {
          tooltip = (
            <div></div>
          )
        }

        return (
          <Container>
            <LeftContainer>
              <Title>Classes</Title>
            </LeftContainer>
            <RightContainer>
              {/*tooltip*/}
              <PlusSpan onClick={this.onClick} onMouseOver={this.onPlusHover} onMouseOut={this.onPlusUnHover}><FaPlusCircle/></PlusSpan>
            </RightContainer>
          </Container>
        );
    }
}

export default SidebarClassesTitle;
