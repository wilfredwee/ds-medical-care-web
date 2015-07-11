# ds-medical-care-web
The web part of DS-Medical-Care

## Setting up your dev env
1. Make sure you have Python 2.7.10 and Node.js installed.
2. Clone the repo.
3. Set up Python virtualenv:
 1. `pip install virtualenv`
 2. `virtualenv env`
 3. `pip install -r requirements.tx`
4. Install npm packages:
 1. `npm install`
5. Activate virtualenv
 1. `env/Scripts/activate`
6. Start Django server
 1. `cd ds_medical_care`
 2. `python manage.py runserver`
7. Start Node server
 1. `node server.js`
8. Go to `localhost:8000` in your browser.
