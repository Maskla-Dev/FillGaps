from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework import decorators, response, status
from rest_framework.permissions import AllowAny

from . import models, serializers
from rest_framework import serializers as rest_serializers
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView


# Create your views here.

class CustomTokenView(TokenObtainPairView):
    serializer_class = serializers.CustomTokenSerializer


@decorators.api_view(['GET'])
@decorators.permission_classes([AllowAny])
def directory(request, employee_id):
    print(employee_id)
    if employee_id is None:
        employees = models.Employee.objects.all()
        serializer = serializers.EmployeeSerializer(employees, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
    else:
        try:
            employee = models.Employee.objects.get(id=employee_id)
            serializer = serializers.EmployeeSerializer(employee)
            return response.Response(serializer.data, status=status.HTTP_200_OK)
        except models.Employee.DoesNotExist:
            return response.Response(status=status.HTTP_404_NOT_FOUND)
