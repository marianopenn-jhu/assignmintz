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
  width:100%;
`;

const Header = styled.h1`
  font-family:Avenir;
  font-size:24px;
`;

const ItemLabel = styled.label
`
  padding:0;
  margin:0;
  width:100%;
`;

const TextLabel = styled.div
`
  width:50%;
  display:inline-block;
`;

const TextInput = styled.input
`
  width:50%;
  display:inline-block;
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
          <XOut onClick={this.props.onClose}><FaClose/></XOut>
          <Header>Create a Class</Header>
          <Form onSubmit={this.handleSubmit}>
            <ItemLabel>
              <TextLabel>Course Title:</TextLabel>
              <TextInput type="text" value={this.state.value} onChange={this.handleChange} />
            </ItemLabel>
            <ItemLabel>
              <TextLabel>Course Title:</TextLabel>
              <TextInput type="text" value={this.state.value} onChange={this.handleChange} />
            </ItemLabel>

            <input type="submit" value="Submit" />
          </Form>
        </Container>
    )
  }
}

export default CreateClassView;
