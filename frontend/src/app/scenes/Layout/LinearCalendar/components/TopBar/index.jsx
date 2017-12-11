import React from 'react';
import styled from 'styled-components';
import FaSearchIcon from 'react-icons/lib/fa/search'
import FilterItem from './components/FilterItem/index.jsx';
import FaCogs from 'react-icons/lib/fa/cogs';
import {logoutUser} from '../../../../../services/api/user/logout-user.js';

const Container = styled.div`
  padding: 10px 20px 10px 20px;
  color:#A9A9A9;
  text-align:center;
  float: left;
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

const LogOutSpan = styled.span`
  padding-left:10px;
  display:inline-block;
  font-size:24px;

  &:hover {
    cursor:pointer;
    color:#545454;
  }
`;

class TopBar extends React.Component {
  constructor(props) {
    super(props);

    this.onWheelClick = this.onWheelClick.bind(this);
  }

  onWheelClick() {
    logoutUser(this.props.user_data, this.props.session_key);
    if (this.props.onLogout != null)
    {
      this.props.onLogout();
    }
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
        <LogOutSpan onClick={this.onWheelClick}>
          <FaCogs/>
        </LogOutSpan>
      </Container>
    );
  }
}

export default TopBar;
