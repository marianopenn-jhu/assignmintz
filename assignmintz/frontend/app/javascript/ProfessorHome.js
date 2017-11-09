
const React = require("react");

class Course extends React.Component {
    constructor() {
        super();
        //this stuff
    }
    render() {


        return (
            <div style="color: red;">
            THIS IS IT
            </div>
        );
    }
}

export default Course;

ReactDOM.render(<Course />,
    document.getElementById("displayClasses"));