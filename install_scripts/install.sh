#!/bin/bash
python3 -m venv virtualEnv
source virtualEnv/bin/activate
pip install -r requirements.txt
createdb -h localhost -p 5432 -U postgres assignmintz
source virtualEnv/bin/activate
