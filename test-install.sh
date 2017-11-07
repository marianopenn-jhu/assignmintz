#!/bin/bash
sudo apt-get install apache2-prefork-dev
sudo apt-get install libapache2-mod-wsgi-py3
sudo apt-get httpd-devel
python3 -m venv virtualEnv/
source virtualEnv/bin/activate
pip install -r assignmintz/assignmintz/requirements/requirements.txt
createdb -h localhost -p 5432 -U postgres assignmintz
