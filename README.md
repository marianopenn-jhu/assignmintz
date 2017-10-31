------Installation------
The application is simply installed by running 'source install.sh' on the script
found in the main directory. In order to run this script, you must have Python 3,
PostgreSQL 9.6, and pip installed on your system.
This script will create and initialize a virtual environment with all the
required packages. It will also create a database named 'assignmintz' and
initialize the database with the required tables.

To build the frontend:
(1) Install npm onto your machine
(2) Navigate to assignmintz/frontend
(3) Type 'npm run build' in your terminal
(4) Type 'npm run start' in your terminal
(5) Navigate to localhost:8080 in your browser to see the running app.
Disclaimer: Due to some issue with CORS, the application will NOT talk to the
server in Google Chrome. It will still run, but it will not function as
it is intended to. This problem will be resolved by the next iteration,
but we caught it too late for this iteration.
