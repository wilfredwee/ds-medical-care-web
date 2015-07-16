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
        fields = ('id', 'children')

class UserSerializer(UserDetailsSerializer):
    parent_type = serializers.CharField(source="parentprofile.parent_type", required=False)
    parentprofile = ParentProfileSerializer(many=False, required=False)

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('parent_type', 'parentprofile')

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('parentprofile', {})
        parent_type = profile_data.get('parent_type')

        instance = super(UserSerializer, self).update(instance, validated_data)

        # get and update user profile
        profile = instance.parentprofile
        if profile_data and parent_type:
            profile.parent_type = parent_type
            profile.save()
        return instance
