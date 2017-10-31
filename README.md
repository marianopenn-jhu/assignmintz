------Installation------

The application is simply installed by running 'source install.sh' on the script 
found in the main directory. In order to run this script, you must have Python 3, 
PostgreSQL 9.6, and pip installed on your system. 
This script will create and initialize a virtual environment with all the
required packages. It will also create a database named 'assignmintz' and 
initialize the database with the required tables. You must also have the react 
framework installed. You can build the project using install.sh and then use 
run.sh everytime you run the project

To build and run through command line:  <br />
% &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source install.sh <br />
%	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source run.sh <br />


You can also build using npm <br />
To build the frontend: <br />
(1) Install npm onto your machine <br />
(2) Navigate to assignmintz/frontend <br />
(3) Type 'npm run build' in your terminal <br />
(4) Type 'npm run start' in your terminal <br />
(5) Navigate to localhost:8080/build in your browser to see the running app. <br />
Disclaimer: Due to some issue with CORS, the front-end will NOT talk to the 
backend in common browsers. However, we are able to make queries to the back-end with POSTMAN.
This problem will be resolved by the next iteration.
