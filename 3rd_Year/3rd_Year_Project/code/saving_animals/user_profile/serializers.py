from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class TimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Time
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class VetLocationSerializer(serializers.ModelSerializer):
    distance = serializers.DecimalField(source='distance.mi', max_digits=10, 
                                        decimal_places=2, required=False,
                                        read_only=True)
    class Meta:
        model = VetProfile
        fields = '__all__'


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'

class VetProfileSerializer(serializers.ModelSerializer):
    distance = serializers.DecimalField(source='distance.mi', max_digits=10, 
                                        decimal_places=2, required=False,
                                        read_only=True)
    class Meta:
        model = VetProfile
        fields = '__all__'


class OrgProfileSerializer(serializers.ModelSerializer):
    distance = serializers.DecimalField(source='distance.mi', max_digits=10, 
                                        decimal_places=2, required=False,
                                        read_only=True)
    class Meta:
        model = OrgProfile
        fields = '__all__'

class VetScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = VetSchedule
        fields = '__all__'
        depth = 1

class OrgReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrgReport
        fields = '__all__'
        depth = 1