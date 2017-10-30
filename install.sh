#!/bin/bash
python3 -m venv virtualEnv
source virtualEnv/bin/activate
pip install -r assignmintz/assignmintz/requirements/requirements.txt
createdb -h localhost -p 5432 -U postgres assignmintz
#psql -h localhost -p 5432 -U postgres assignmintz
#psql -d assignmintz -a -f  assignmintz/assignmintz/database/init.sql
source virtualEnv/bin/activate
