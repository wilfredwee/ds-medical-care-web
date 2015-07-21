from ds_medical_care_web.models import ParentProfile


def get_redcap_records_for_parent(parentId):
    parent = ParentProfile.objects.get(id=parentId)

    # for child in parent.children:
    #     # TODO: Iterate over the children and create separate records
    #     # for each child.
    #     pass

    payload = {}
    payload['dem_name_p_f'] = parent.user.first_name
    payload['dem_name_p_l'] = parent.user.last_name
    payload['dem_email'] = parent.user.email
    payload['dem_phone'] = parent.phone_number
    payload['dem_address'] = parent.address
    payload['dem_city'] = parent.city
    payload['dem_province'] = parent.province
    # TODO: Figure out what a valid postal code is
    # payload['dem_postalcode'] = parent.postal_code
    payload['dem_code'] = parent.participant_code
    # TODO: We need to figure out how we want to deal with the record here
    payload['record'] = parent.user.email

    return [payload]





