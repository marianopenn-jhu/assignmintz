------Installation------

The application is simply installed by running 'source install.sh' on the script 
found in the install-scripts directory. In order to run this script, you must have Python 3, 
PostgreSQL 9.6, and pip installed on your system. 
This script will create and initialize a virtual environment with all the
required packages. It will also create a database named 'assignmintz' and 
initialize the database with the required tables. You must also have the react 
framework installed. You can build the project using install.sh and then use 
run.sh everytime you run the project.

To build and run for local development:  <br />
% &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source install.sh <br />
%	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source run.sh <br />

To run tests locally:  <br />
% source run_tests.sh <br />

To build the frontend: <br />
(1) Install npm onto your machine <br />
(2) Navigate to assignmintz/frontend <br />
(3) Type 'npm run build' in your terminal <br />

The app should now be ready to go!
Navigate to 'localhost:8000/home/' to begin using the app. 
Alternatively, you can check out the deployed app at:
'https://mighty-mountain-99483.herokuapp.com/home/'
NOTE: On the Heroku deployed app. User creation is currently failing. 
Our deploy process is as follows:
    -Make changes to current branch
    -commit changes
    -run 'git push heroku master'
