#!/bin/bash
pip install -r ../requirements.txt
createdb -h localhost -p 5432 -U postgres assignmintz
python3 ../manage.py makemigrations
python3 ../manage.py migrate
