"""
Django settings for ds_medical_care project.

Generated by 'django-admin startproject' using Django 1.8.3.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.8/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.8/howto/deployment/checklist/

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    '*']


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'webpack_loader',
    'ds_medical_care_web',
    'rest_framework',
    'rest_framework.authtoken',
    'allauth',
    'allauth.account',
    'rest_auth',
    'rest_auth.registration',

)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
)

AUTHENTICATION_BACKENDS = (
    # Needed to login by username in Django admin, regardless of `allauth`
    'django.contrib.auth.backends.ModelBackend',

    # `allauth` specific authentication methods, such as login by e-mail
    'allauth.account.auth_backends.AuthenticationBackend',
)

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    )
}

REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'ds_medical_care_web.serializers.UserSerializer'
}

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'


ROOT_URLCONF = 'ds_medical_care.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',

                # `allauth` specific context processors
                'allauth.account.context_processors.account',
                'allauth.socialaccount.context_processors.socialaccount',
            ],
        },
    },
]

WSGI_APPLICATION = 'ds_medical_care.wsgi.application'




# Internationalization
# https://docs.djangoproject.com/en/1.8/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

SITE_ID = 1


MEDIA_ROOT = os.path.join(BASE_DIR, 'userfiles')
MEDIA_URL = '/files/'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.8/howto/static-files/

#STATIC_ROOT = os.path.join(BASE_DIR, 'static').replace('\\', '/')
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

STATIC_URL = '/static/'


STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'assets'), # We do this so that django's collectstatic copies or our bundles to the STATIC_ROOT or syncs them to whatever storage we use.
)

WEBPACK_LOADER = {
    'BUNDLE_DIR_NAME': 'bundles/',
    'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
}

# TODO: Set database for production environment
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'dbdjango',
        'USER': 'dbuser',
        'PASSWORD': 'password',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}

from secret_settings import *

try:
    from production_settings import *
except:
    print('debug build')

if not DEBUG:
    WEBPACK_LOADER.update({
        'BUNDLE_DIR_NAME': 'dist/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats-prod.json')
    })

    # LOGGING = {
    #     'version': 1,
    #     'disable_existing_loggers': False,
    #     'filters': {
    #     'require_debug_false': {
    #       '()': 'django.utils.log.RequireDebugFalse'
    #     }
    #     },
    #     'handlers': {
    #     'logfile': {
    #       'class': 'logging.handlers.WatchedFileHandler',
    #       'filename': 'D:/home/site/wwwroot/error.log'
    #     },
    #     },
    #     'loggers': {
    #     'django': {
    #       'handlers': ['logfile'],
    #       'level': 'ERROR',
    #       'propagate': False,
    #     },
    #     }
    # }
