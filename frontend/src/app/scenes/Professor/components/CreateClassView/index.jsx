import React from 'react';
import styled from 'styled-components';
import FaClose from 'react-icons/lib/fa/close';

const Container = styled.div`
  overflow:hidden;
  overflow-y:auto;
  height: 100%;
  width: 80%;
  position: absolute;
  right: 0;
  top: 0;
  margin: 0;
  padding: 0;
  padding-top:10px;
  background:white;
  text-align:center;
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

const Form = styled.form`
  width:80%;
`;

const Header = styled.h1`
  font-family:Avenir;
  font-size:24px;
`;

const TextInput = styled.input
`

`;

class CreateClassView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
        <Container>
          <XOut><FaClose/></XOut>
          <Header>Create a Class</Header>
          <Form onSubmit={this.handleSubmit}>
            <label>
              Course Title:
              <TextInput type="text" value={this.state.value} onChange={this.handleChange} />
            </label>

            <input type="submit" value="Submit" />
          </Form>
        </Container>
    )
  }
}

export default CreateClassView;
