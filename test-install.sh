#!/bin/bash
python3 -m venv virtualEnv
source virtualEnv/bin/activate
apt-get install apache2
apt-get install libapache2-mod-wsgi-py3
pip install -r assignmintz/assignmintz/requirements/requirements.txt
createdb -h localhost -p 5432 -U postgres assignmintz
source virtualEnv/bin/activate
