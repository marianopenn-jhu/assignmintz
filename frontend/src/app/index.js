import React from 'react';
import ReactDOM from 'react-dom';
import App from './scenes/index.jsx'; // The root scene of the app
import StudentView from './scenes/Student/index.jsx';

ReactDOM.render(<StudentView user_name={"sally"} session_key={"2a598eb4712c4a6e848bfdc7cdaba24a"} role={"Student"}/>, document.getElementById('app'));
