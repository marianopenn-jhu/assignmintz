import React from 'react';
import styled from 'styled-components';
import Sidebar from '../Layout/index.jsx';
import Header from '../Layout/Header';


const Wrapper= styled.div`
    display: flex;
`;

const FullPage = syled.div`
    height: auto;
    overflow: hidden;
`;

const ViewPanel = styled.div `
    background-color: #FAFAFA;
    font-family: 'Trebuchet MS';
    left: 250px;
    right: inherit;
    position: absolute;
    width: auto;
    overflow: hidden;
    height:100vh;
`;

class StudentView extends React.Component {
  constructor(props) {
    super(props);


  }

  render() {
    return (
        <Wrapper>
          <FullPage>
            <div id="fullPage">
              <Sidebar/>

              <ViewPanel>
                <div>
                  <Header/>

                </div>
              </ViewPanel>
            </div>
          </FullPage>
        </Wrapper>
    );
  }
}

export default StudentView;
