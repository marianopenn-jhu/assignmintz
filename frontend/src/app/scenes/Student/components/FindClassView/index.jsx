import React from 'react';
import styled from 'styled-components';
import FaClose from 'react-icons/lib/fa/close';

const Panel = styled.div`
  overflow:hidden;
  position:relative;
  height: 100%;
  width: 100%;
`;

const TopBarContainer = styled.div
`
  overflow-x: hidden;
  min-height: 50px;
  height:7%;
  width: 100%;
  left: inherit;
  padding-top:10px;
  background:grey;
`;


class FindClassView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      course_id:'',
      course_title:'',
      description:''
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(event) {
    const {course_id, course_title, description} = this.state;

  }

  render() {
    return (
        <Panel>
        <TopBarContainer>
          hello
        </TopBarContainer>
            <div>

            </div>
        </Panel>
    )
  }
}

export default FindClassView;
