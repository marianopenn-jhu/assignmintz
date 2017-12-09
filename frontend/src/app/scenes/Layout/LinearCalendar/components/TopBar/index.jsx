import React from 'react';
import styled from 'styled-components';
import FaSearchIcon from 'react-icons/lib/fa/search'
import FilterItem from './components/FilterItem/index.jsx';

const Container = styled.div`
  padding: 10px 20px 10px 20px;
  color:#A9A9A9;
  text-align:center;
`;

const InputWrapper = styled.input`
  display: inline-block;
  border-radius:5px;
  -moz-border-radius:5px;
  -webkit-border-radius:5px;
  border:1px solid #cccccc;

  &:focus {
    outline:none;
  }
`;

const SearchIconSpan = styled.span`
  padding-left:10px;
  display:inline-block;

  &:hover {
    cursor:pointer;
  }
`;


class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Container>
        <FilterItem name="Homework"/>
        <FilterItem name="Tests"/>
        <FilterItem name="Quizzes"/>
        <InputWrapper type="text"/>
        <SearchIconSpan>
          <FaSearchIcon/>
        </SearchIconSpan>
      </Container>
    );
  }
}

export default TopBar;
