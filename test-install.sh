#!/bin/bash
pip install -r assignmintz/assignmintz/requirements/requirements.txt
createdb -h localhost -p 5432 -U postgres assignmintz
