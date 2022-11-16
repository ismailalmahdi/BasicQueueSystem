# BasicQueueSystem
 A simple ticketing system

 Project Setup 
#------FOR LINUX/MAC---------#
#installing venv 
sudo apt-get install python3.6-venv
#creating virtual env
python3 -m venv env
#activating virtual env
source env/bin/activate


#-------FOR WINDOWS----------#
#installing venv
py -m pip install --user virtualenv
#creating virtual env
py -m venv env
#activating virtual env
.\env\Scripts\activate


Install all required libs 
pip install -r requirements.txt


Database migrations setup
python manage.py migrate