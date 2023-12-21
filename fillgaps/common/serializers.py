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
        return token


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Employee
        fields = '__all__'
        depth = 1


class EmployeeDocumentsCertificatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EmployeeDocumentsCertificates
        fields = '__all__'


class EmployeeDocumentsSerializer(serializers.ModelSerializer):
    certificates = EmployeeDocumentsCertificatesSerializer(many=True, read_only=True)

    class Meta:
        model = models.EmployeeDocuments
        fields = '__all__'


class MedicalAllergySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MedicalAllergy
        fields = '__all__'


class MedicalAilmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MedicalAilment
        fields = '__all__'


class MedicalFilesSerializer(serializers.ModelSerializer):
    allergies = MedicalAllergySerializer(many=True, read_only=True)
    ailments = MedicalAilmentSerializer(many=True, read_only=True)

    class Meta:
        model = models.MedicalFiles
        fields = '__all__'


class PrivateMedicalInsuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PrivateMedicalInsurance
        fields = '__all__'


class DropProofsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DropProofs
        fields = '__all__'


class EmployeeDropSerializer(serializers.ModelSerializer):
    proofs = DropProofsSerializer(many=True, read_only=True)

    class Meta:
        model = models.EmployeeDrop
        fields = '__all__'


class AllEmployeeDataSerializer(serializers.ModelSerializer):
    documents = EmployeeDocumentsSerializer(read_only=True)
    medical_files = MedicalFilesSerializer(read_only=True)
    insurance = PrivateMedicalInsuranceSerializer(read_only=True)
    drop = EmployeeDropSerializer(read_only=True)

    class Meta:
        model = models.Employee
        fields = '__all__'
