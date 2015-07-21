from rest_framework import serializers
from rest_auth.serializers import UserDetailsSerializer

from ds_medical_care_web.models import Child, ParentProfile

class ChildSerializer(serializers.ModelSerializer):

    class Meta:
        model = Child
        fields = ('id', 'first_name', 'last_name', 'parent')

class ParentProfileSerializer(serializers.ModelSerializer):
    children = ChildSerializer(many=True, required=False)

    class Meta:
        model = ParentProfile
        fields = (
            'id',
            'children',
            'phone_number',
            'address',
            'city',
            'province',
            'postal_code',
            'participant_code')

class UserSerializer(UserDetailsSerializer):
    parent_type = serializers.CharField(source="parentprofile.parent_type", required=False)
    parentprofile = ParentProfileSerializer(many=False, required=False)

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('parent_type', 'parentprofile')

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('parentprofile', {})
        parent_type = profile_data.get('parent_type')
        phone_number = profile_data.get('phone_number')
        address = profile_data.get('address')
        city = profile_data.get('city')
        province = profile_data.get('province')
        postal_code = profile_data.get('postal_code')
        participant_code = profile_data.get('participant_code')

        instance = super(UserSerializer, self).update(instance, validated_data)

        # get and update user profile
        profile = instance.parentprofile
        if profile_data:
            if parent_type:
                profile.parent_type = parent_type
            if phone_number:
                profile.phone_number = phone_number
            if address:
                profile.address = address
            if city:
                profile.city = city
            if province:
                profile.province = province
            if postal_code:
                profile.postal_code = postal_code
            if participant_code:
                profile.participant_code = participant_code

            profile.save()
        return instance
