from . import models
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        employee = models.Employee.objects.get(user=user)
        token['name'] = user.first_name + ' ' + user.last_name
        token['role'] = employee.role
        token['photo'] = employee.photo_link
        return token


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Employee
        fields = '__all__'
        depth = 1
