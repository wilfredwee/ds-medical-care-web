from django.conf import settings

from redcap import Project

from ds_medical_care_web.redcap_handlers.RedCapDataConverter import get_redcap_records_for_parent

def import_redcap_records_for_parent(parentId):
    redcapProject = Project(settings.REDCAP_PROJECT_URL, settings.REDCAP_PROJECT_API_KEY)
    records = get_redcap_records_for_parent(parentId)
    return redcapProject.import_records(records)

