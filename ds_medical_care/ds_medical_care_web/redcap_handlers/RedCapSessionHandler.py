from redcap import Project

from ds_medical_care_web.redcap_handlers.RedCapDataConverter import get_redcap_records_for_parent

def import_redcap_records_for_parent(parentId):
    redcapProject = Project('https://neurodevnet.med.ualberta.ca/api/', '4CBE5D79FF50BBC6B0102FBDBA8609A8')
    records = get_redcap_records_for_parent(parentId)
    return redcapProject.import_records(records)

