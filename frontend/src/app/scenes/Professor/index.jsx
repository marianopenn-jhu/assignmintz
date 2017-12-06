import React from 'react';
import styled from 'styled-components';
import LinearCalendar from './components/LinearCalendar/index.jsx';
import {getCourses} from '../../services/api/course/get-course.js';

const Container = styled.div`
  position: absolute;
  top: 15%;
  left: 5%;
  width:90%;
`;

/*
  The professor will have props with:
    user_name
*/
class ProfessorView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses:[]
    };
  }

  componentWillMount() {
    // Load courses
    if (this.props.user_name) {
      getCourses("teacher=" + this.props.user_name).then((response) =>
      {
          if (response.status == true) {
            var obj = response.body;
            this.setState({['courses']: obj.objects})
          }
          else {
            console.log(response);
          }
        }
      );
    }
  }

  render() {


    return(
      <Container>
        <LinearCalendar/>
      </Container>
    );
  }
}

export default ProfessorView;
