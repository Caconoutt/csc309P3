#note: please run with the command: source startup.sh
#!/bin/bash
cd petpal
python3 -m venv venv
source venv/bin/activate
pip install -r packages.txt
python3 manage.py makemigrations account
python3 manage.py makemigrations pet
python3 manage.py makemigrations comment
python3 manage.py migrate
cd ..