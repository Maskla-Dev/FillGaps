from . import models
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        employee = models.Employee.objects.get(user=user)
        print(user.first_name + ' ' + user.last_name)
        token['name'] = user.first_name + ' ' + user.last_name
        token['role'] = employee.role
        return token


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Employee
        fields = '__all__'
        depth = 1


class EmployeeCardSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(source='employeedocuments.photo')
    employee_id = serializers.IntegerField(source='id')
    name = serializers.SerializerMethodField()
    email = serializers.EmailField(source='user.email')

    class Meta:
        model = models.Employee
        fields = ('employee_id', 'name', 'email', 'department', 'photo', 'role')

    def get_photo(self, obj):
        if hasattr(obj, 'employeedocuments') and obj.employeedocuments.photo:
            return obj.employeedocuments.photo.url
        return ''

    def get_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"


class EmployeeBriefSerializer(EmployeeCardSerializer):
    state = serializers.CharField()
    since = serializers.DateField()
    init_journey = serializers.TimeField()
    end_journey = serializers.TimeField()

    class Meta(EmployeeCardSerializer.Meta):
        fields = EmployeeCardSerializer.Meta.fields + ('state', 'since', 'init_journey', 'end_journey')


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
