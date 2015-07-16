from rest_framework import serializers
from rest_auth.serializers import UserDetailsSerializer

class UserSerializer(UserDetailsSerializer):
    parent_type = serializers.CharField(source="parentprofile.parent_type")
    parent_id = serializers.ReadOnlyField(source="parentprofile.id")

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('parent_type', 'parent_id')

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
