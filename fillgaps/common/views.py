from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from datetime import datetime
from django.contrib.auth.hashers import make_password
from rest_framework import decorators, response, status
from rest_framework.permissions import AllowAny, IsAuthenticated
import base64
from django.core.files.base import ContentFile
from .models import Employee, EmployeeDepartment, EmployeeDocuments, MedicalFiles, MedicalAllergy, \
    PrivateMedicalInsurance, EmployeeState, MedicalAilment
from .serializers import CustomTokenSerializer, AllEmployeeDataSerializer, EmployeeSerializer, EmployeeCardSerializer, \
    EmployeeBriefSerializer, MedicalFilesSerializer, MedicalAllergySerializer
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
        photo_path = employee_documents.photo.url
        return response.Response({"photo": photo_path}, status=status.HTTP_200_OK)
    except Employee.DoesNotExist:
        return response.Response(status=status.HTTP_404_NOT_FOUND)
    except EmployeeDocuments.DoesNotExist:
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
def edit_employee_data(request):
    user = JWTAuthentication().authenticate(request)[0]
    data = request.data
    # print keys in data
    print(data.keys())
    # print keys in data['general_data']
    print(data['general_data'].keys())
    # print keys in data['worker_data']
    print(data['worker_data'].keys())
    # print keys in data['documents']
    print(data['employee_documents'].keys())
    # print keys in data['medical']
    print(data['medical_file'].keys())
    new_user = None
    try:
        print(data['employee_id'])
        employee = Employee.objects.get(user=user)
        if employee.department != EmployeeDepartment.ADMINISTRATIVE:
            return response.Response({"detail": "Unauthorized access"}, status=status.HTTP_403_FORBIDDEN)
        if data['employee_id'] == -1:
            # Create a new user and employee
            username = (data['general_data']['first_name'] + data['general_data']['last_name']).lower()
            password = make_password(username)
            new_user = User.objects.create(username=username, password=password,
                                           email=data['general_data'].get('email'),
                                           first_name=data['general_data'].get('first_name'),
                                           last_name=data['general_data'].get('last_name'))
            print(data['general_data'].get('birthday'))
            birthday = data['general_data'].get('birthday')
            if not birthday:
                return response.Response({"detail": "Birthday is required"}, status=status.HTTP_400_BAD_REQUEST)
            # Convert the date-time string to a date string
            birthday = datetime.strptime(birthday, '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%Y-%m-%d')
            zip_code = data['general_data'].get('zip')
            if not zip_code:
                return response.Response({"detail": "Zip code is required"}, status=status.HTTP_400_BAD_REQUEST)
            since = data['worker_data'].get('since')
            if not since:
                return response.Response({"detail": "Since is required"}, status=status.HTTP_400_BAD_REQUEST)
            init_journey = data['worker_data'].get('init_journey')
            end_journey = data['worker_data'].get('end_journey')
            if not init_journey or not end_journey:
                return response.Response({"detail": "Journey is required"}, status=status.HTTP_400_BAD_REQUEST)
            init_journey = datetime.strptime(init_journey, '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%H:%M:%S')
            end_journey = datetime.strptime(end_journey, '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%H:%M:%S')
            # Convert the date-time string to a date string
            since = datetime.strptime(since, '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%Y-%m-%d')
            print("Creating new employee")
            salary = data['worker_data'].get('salary')
            if not salary:
                return response.Response({"detail": "Salary is required"}, status=status.HTTP_400_BAD_REQUEST)
            salary = int(salary)
            if not isinstance(salary, (int, float)):
                return response.Response({"detail": "Salary must be a number"}, status=status.HTTP_400_BAD_REQUEST)
            employee = Employee.objects.create(
                user=new_user,
                birthday=birthday,
                zip=zip_code,
                role=data['worker_data'].get('role'),
                department=data['worker_data'].get('department'),
                phone=data['general_data'].get('phone'),
                state=EmployeeState.ACTIVE,
                status=True,
                country=data['general_data'].get('country'),
                city=data['general_data'].get('city'),
                province=data['general_data'].get('province'),
                street=data['general_data'].get('street'),
                settlement=data['general_data'].get('settlement'),
                ext=data['general_data'].get('ext'),
                int=data['general_data'].get('int'),
                cellphone=data['general_data'].get('cellphone'),
                bachelor_degree=data['employee_documents'].get('bachelor_degree'),
                since=since,
                init_journey=init_journey,
                end_journey=end_journey,
                salary=data['worker_data'].get('salary'),
                bank_account=data['worker_data'].get('bank_account'),
                bank=data['worker_data'].get('bank'),
                clabe=data['worker_data'].get('clabe'),
            )
            print("Creating new employee documents")
            employee_documents_data = data['employee_documents']
            print(employee_documents_data.keys())
            if employee_documents_data:
                photo_data = employee_documents_data.get('photo')
                cv_data = employee_documents_data.get('CV')
                address_proof_data = employee_documents_data.get('addressProof')
                id_proof_data = employee_documents_data.get('ID')
                bachelors_degree_proof_data = employee_documents_data.get('bachelorDegreeProof')

                # Check if the data exists before trying to split it
                if not all([photo_data, cv_data, address_proof_data, id_proof_data, bachelors_degree_proof_data]):
                    return response.Response({"detail": "All document data is required"},
                                             status=status.HTTP_400_BAD_REQUEST)
                # Decode the base64 data and create ContentFile objects
                photo_file = ContentFile(base64.b64decode(photo_data.split(',')[1]), name=username + 'photo.jpg')
                cv_file = ContentFile(base64.b64decode(cv_data.split(',')[1]), name=username + 'cv.pdf')
                address_proof_file = ContentFile(base64.b64decode(address_proof_data.split(',')[1]),
                                                 name=username + 'address_proof.pdf')
                id_proof_file = ContentFile(base64.b64decode(id_proof_data.split(',')[1]),
                                            name=username + 'id_proof.pdf')
                bachelors_degree_proof_file = ContentFile(base64.b64decode(bachelors_degree_proof_data.split(',')[1]),
                                                          name=username + 'bachelors_degree_proof.pdf')

                # Create a new EmployeeDocuments instance
                employee_documents = EmployeeDocuments.objects.create(
                    employee=employee,
                    photo=photo_file,
                    cv=cv_file,
                    address_proof=address_proof_file,
                    id_proof=id_proof_file,
                    bachelors_degree_proof=bachelors_degree_proof_file,
                )
            else:
                return response.Response({"detail": "Employee documents required"}, status=status.HTTP_400_BAD_REQUEST)
            print("Creating new medical file")
            medical_file = MedicalFiles.objects.create(
                employee=employee,
                NSS=data['medical_file'].get('SSN'),
            )
            print("Creating new medical allergies")
            ailments = data['medical_file'].get('ailments')
            ailments_objects = []
            if ailments:
                for ailment in ailments:
                    ailments_objects.append(MedicalAilment.objects.create(
                        medical_file=MedicalFiles.objects.get(employee=employee),
                        ailment=ailment
                    ))
            print("Creating new medical allergies")
            allergies = data['medical_file'].get('allergies')
            allergies_objects = []
            if allergies:
                for allergy in allergies:
                    allergies_objects.append(MedicalAllergy.objects.create(
                        medical_file=MedicalFiles.objects.get(employee=employee),
                        allergy=allergy
                    ))
            medical_insurance = None
            print("Verifying new employee medical insurance")
            if data['medical_file'].get('hasMedicalInsurance'):
                if data['medical_file'].get('externalMedicalInsuranceProof') and data['medical_file'].get(
                        'externalMedicalInsuranceName'):
                    external_medical_insurance_proof = ContentFile(
                        base64.b64decode(data['medical_file'].get('externalMedicalInsuranceProof').split(',')[1]),
                        name=username + 'external_medical_insurance_proof.pdf')
                    medical_insurance = PrivateMedicalInsurance.objects.create(
                        medical_file=MedicalFiles.objects.get(employee=employee),
                        name=data['medical_file'].get('externalMedicalInsuranceName'),
                        document=external_medical_insurance_proof,
                    )
                return response.Response({"detail": "External medical insurance document and name required"},
                                         status=status.HTTP_400_BAD_REQUEST)
            print("Saving new employee")
            employee.save()
            print("Saving new employee documents")
            employee_documents.save()
            print("Saving new medical file")
            medical_file.save()
            print("Saving new medical allergies")
            for ailment in ailments_objects:
                ailment.save()
            print("Saving new medical allergies")
            for allergy in allergies_objects:
                allergy.save()
            print("Saving new employee medical insurance")
            if medical_insurance:
                medical_insurance.save()
            return response.Response({"detail": "Edit Success"}, status=status.HTTP_201_CREATED)
        else:
            # Update instances
            return response.Response(status=status.HTTP_201_CREATED)
    except Exception as e:
        if new_user:
            try:
                employee = Employee.objects.get(user=new_user)
                employee.user = None  # disassociate the Employee instance from the User instance
                employee.save()
            except Employee.DoesNotExist:
                pass
        new_user.delete()
        raise e
    except Employee.DoesNotExist:
        return response.Response({"detail": "Requested employee does not exist"}, status=status.HTTP_404_NOT_FOUND)
    except EmployeeDocuments.DoesNotExist:
        return response.Response({"detail": "Employee documents does not exist"}, status=status.HTTP_404_NOT_FOUND)
    except MedicalFiles.DoesNotExist:
        return response.Response({"detail": "Medical files does not exist"}, status=status.HTTP_404_NOT_FOUND)


@decorators.api_view(['GET'])
@decorators.permission_classes([IsAuthenticated])
def get_employees_by_work_area(request, work_area):
    print(work_area)
    try:
        employees = Employee.objects.filter(department=work_area)
        serializer = EmployeeCardSerializer(employees, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
    except Employee.DoesNotExist:
        return response.Response(status=status.HTTP_404_NOT_FOUND)


@decorators.api_view(['GET'])
@decorators.permission_classes([IsAuthenticated])
def get_employee_brief(request, employee_id):
    print(employee_id)
    try:
        employee = Employee.objects.get(id=employee_id)
        serializer = EmployeeBriefSerializer(employee)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
    except Employee.DoesNotExist:
        print("Employee does not exist")
        return response.Response(status=status.HTTP_404_NOT_FOUND)
