from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework import decorators, response, status
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Employee, EmployeeDepartment, EmployeeDocuments
from .serializers import CustomTokenSerializer, AllEmployeeDataSerializer, EmployeeSerializer
from rest_framework import serializers as rest_serializers
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from django.http import FileResponse


# Create your views here.

class CustomTokenView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer


@decorators.api_view(['GET'])
@decorators.permission_classes([IsAuthenticated])
def employee_photo(request):
    user = JWTAuthentication().authenticate(request)[0]
    try:
        employee = Employee.objects.get(user=user)
        employee_documents = EmployeeDocuments.objects.get(employee=employee)
        photo_path = employee_documents.photo.path
        return FileResponse(open(photo_path, 'rb'))
    except Employee.DoesNotExist:
        return response.Response(status=status.HTTP_404_NOT_FOUND)


@decorators.api_view(['GET'])
@decorators.permission_classes([AllowAny])
def directory(request, employee_id):
    print(employee_id)
    if employee_id is None:
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
    else:
        try:
            employee = Employee.objects.get(id=employee_id)
            serializer = EmployeeSerializer(employee)
            return response.Response(serializer.data, status=status.HTTP_200_OK)
        except Employee.DoesNotExist:
            return response.Response(status=status.HTTP_404_NOT_FOUND)


@decorators.api_view(['GET'])
@decorators.permission_classes([IsAuthenticated])
def get_employee_data(request):
    user = JWTAuthentication().authenticate(request)[0]
    try:
        employee = Employee.objects.get(user=user)
        if employee.department != EmployeeDepartment.ADMINISTRATIVE:
            return response.Response({"detail": "Unauthorized access"}, status=status.HTTP_403_FORBIDDEN)
        serializer = AllEmployeeDataSerializer(employee)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
    except Employee.DoesNotExist:
        return response.Response(status=status.HTTP_404_NOT_FOUND)


@decorators.api_view(['POST'])
@decorators.permission_classes([IsAuthenticated])
def create_employee_data(request):
    user = JWTAuthentication().authenticate(request)[0]
    try:
        employee = Employee.objects.get(user=user)
        if employee.department != EmployeeDepartment.ADMINISTRATIVE:
            return response.Response({"detail": "Unauthorized access"}, status=status.HTTP_403_FORBIDDEN)
        serializer = AllEmployeeDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Employee.DoesNotExist:
        return response.Response(status=status.HTTP_404_NOT_FOUND)
