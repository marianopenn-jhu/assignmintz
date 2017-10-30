import React from 'react';
//http://localhost:8000/backend/v1/user/
class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : true
    }
  }

  componentDidMount() {
    return fetch
  }

   render() {
      return (
         <div>
            
         </div>
      );
   }
}

export default UserInfo;
