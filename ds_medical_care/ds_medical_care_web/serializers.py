from rest_framework import serializers
from rest_auth.serializers import UserDetailsSerializer

from ds_medical_care_web.models import Child, ParentProfile, SleepBehavior

class SleepBehaviorSerializer(serializers.ModelSerializer):

    class Meta:
        model = SleepBehavior
        fields = ('average_sleep', 'has_regular_bedtime')

class ChildSerializer(serializers.ModelSerializer):
    sleep_behavior = SleepBehaviorSerializer(many=False, required=False)

    class Meta:
        model = Child
        fields = ('id', 'first_name', 'last_name', 'parent', 'date_of_birth', 'gender', 'picture', 'sleep_behavior')

    def create(self, validated_data):
        sleep_behavior_data = validated_data.pop('sleep_behavior')
        child = Child.objects.create(**validated_data)

        if sleep_behavior_data:
            SleepBehavior.objects.create(child=child, **sleep_behavior_data)

        return child

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
    parentprofile = ParentProfileSerializer(many=False, required=False)

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('parentprofile',)

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('parentprofile', {})
        instance = super(UserSerializer, self).update(instance, validated_data)

        if profile_data:
            profile = instance.parentprofile

            for key, value in profile_data.iteritems():
                setattr(profile, key, value)

            profile.save()

        return instance
