------Installation------

The application is simply installed by running 'source install.sh' on the script 
found in the main directory. In order to run this script, you must have Python 3, 
PostgreSQL 9.6, and pip installed on your system. 
This script will create and initialize a virtual environment with all the
required packages. It will also create a database named 'assignmintz' and 
initialize the database with the required tables. You must also have the react 
framework installed. You can build the project using install.sh and then use 
run.sh everytime you run the project

To build and run through command line: 
% 	source install.sh
%	  source run.sh


If you also have npm installed,
To build the frontend:
(1) Install npm onto your machine
(2) Navigate to assignmintz/frontend
(3) Type 'npm run build' in your terminal
(4) Type 'npm run start' in your terminal
(5) Navigate to localhost:8080/build in your browser to see the running app.
Disclaimer: Due to some issue with CORS, the front-end will NOT talk to the
backend in common browsers. However, we are able to make queries to the back-end with POSTMAN.
This problem will be resolved by the next iteration.
