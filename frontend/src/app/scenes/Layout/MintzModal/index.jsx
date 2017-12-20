import React from 'react';
import styled from 'styled-components';

//**  MIDDLE MAN FOR RHS PANEL  **//
//ensures panel dimensions correct//

const ViewPaneContainer = styled.div`
    position: relative;
    float: left;
    left: 25vw;
    width: 75vw;
    height: 100vh;
    color: green;
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
          <ViewPaneContainer>
            hellow

          </ViewPaneContainer>
        );

    }
}

export default MintzModal;
