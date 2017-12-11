import React from 'react';
import styled from 'styled-components';
import FaPlusCircle from 'react-icons/lib/fa/plus-square-o';

const Container = styled.li`
  // width:100%;
  // list-style:none;
  // padding:10px 30px 10px 30px;
  // margin:0;
  // font-family:'Avenir Next';
  // font-size:16px;
  //
  // background: #686868;
  // color: #BEE6CC;
  //
  // &:hover {
  //   background: #484848;
  // }

  width:100%;
  list-style:none;
  background: #686868;
  color: #BEE6CC;
  padding: 0;
  padding-bottom:10px;
  padding-top:10px;
  font-family:Avenir;
  font-size:15px;

  &:hover {
    cursor: pointer;
    background: #484848;
    color: rgb(177, 217, 231);
  }


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
  left: 25%;
  display:inline-block;
  text-align:center;
  font-size:18px;
`;

const RightContainer = styled.div`
  width:25%;
  display:inline-block;
  text-align:right;
`;

const Title = styled.span`
`;

const PlusSpan = styled.span`
  padding: 10px 0px 10px 10px;
  margin:0;
  font-size:20px;
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
