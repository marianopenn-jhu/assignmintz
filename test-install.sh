#!/bin/bash
psql -c 'create database travis_ci_test;' -U postgres
pip install -r assignmintz/assignmintz/requirements/requirements.txt
createdb -h localhost -p 5432 -U postgres assignmintz
