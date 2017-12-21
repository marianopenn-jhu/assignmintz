import React from 'react';
import styled from 'styled-components';
import FaClose from 'react-icons/lib/fa/close';

//**  MIDDLE MAN FOR RHS PANEL  **//
//ensures panel dimensions correct//

const PanelContainer = styled.div`
    margin 30px;
`;


const Panel = styled.div`
  overflow:hidden;
  position:relative;
  height: 100%;
  width: 100%;
`;


const Container = styled.div`
  overflow:hidden;
  overflow-y:auto;
  height: 100%;
  width: 100%;
  right: 0;
  top: 0;
  margin: 0;
  padding: 0;
  padding-top:10px;
  background:white;
`;


const LeaderboardContainer = styled.div`
  display: block;
  box-sizing: border-box;
`;

const LeaderboardModal = styled.div`
    overflow: hidden;
    position: relative;
    top: auto;
    right: auto;
    left: auto;
    bottom: auto;
    z-index: 1;
    display: block;
`;

const StaticModal = styled.div`
    position: relative;
    top: auto;
    right: auto;
    left: auto;
    bottom: auto;
    z-index: 1;
    display: block;
    height: 400px;
    width: 300px;
    background: white;
`;


const XOut = styled.span`
  font-size:40px;
  float:right;
  padding-right:10%;

  &:hover {
    color:gray;
    cursor:pointer;
  }
`;
const Header = styled.h1`
  font-family:Avenir;
  font-size:30px;
  padding-left:50px;
`;


class MintzModal extends React.Component {
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


        return (
          <PanelContainer>
            <Panel>
              <Container>
                <XOut onClick={this.props.onClose}><FaClose/></XOut>
                <Header>Add a Class</Header>

              </Container>
            </Panel>
          </PanelContainer>
        );

    }
}

export default MintzModal;
