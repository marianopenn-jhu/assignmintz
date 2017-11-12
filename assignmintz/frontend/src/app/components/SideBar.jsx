import React from 'react';
import {getCourses} from '../api/user/GETs/get-courses.js';

class SideBar extends React.components {
  constructor(props) {
    super(props);
    this.state = { courses: [] }
  }

  getCourseList() {
    const user_name = this.props;
    getCourses(userName).then(({courses}) =>
    {
      this.setState(courses);
    })
  }

  componentDidMount() {
    getCourseList();
  }

  render()
  {
    const {courses} = this.state;

    return (
      <ul class="list-unstyled components">
          <li class="header" style="color: white; text-align: center"><a>Classes</a></li>
          {
            courses.map(function(course)
            {
              return <li>{course.name}</li>;
            })
          }
      </ul>
    )
  }
}
