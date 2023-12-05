from django.db import models
from django.contrib.auth.models import User


class EmployeeState(models.TextChoices):
    ACTIVE = 'ACTIVE'
    INACTIVE = 'INACTIVE'


class EmployeeRoles(models.TextChoices):
    IT_MANAGER = 'IT Manager'
    IT_TECHNICAL = 'IT Technical'
    CARETAKER_CHIEF = 'Caretakers Manager'
    CARETAKER = 'Caretaker'
    ADMINISTRATIVE_MANAGER = 'Administrative Manager'
    ADMINISTRATIVE = 'Administrative'
    OPERATIONS_MANAGER = 'Operations Manager'
    CLEANING = 'Cleaning'
    MAINTENANCE = 'Maintenance'
    SALESMAN = 'Salesman'
    TICKET_TAKER = 'Ticket Taker'
    COLLECTION_RESEARCH_EDUCATION_MANAGER = 'Collection, Research & Education Manager'
    EDUCATOR = 'Educator'
    TOUR_GUIDE = 'Tour Guide'
    RESEARCHER = 'Researcher'
    PRESERVATION_MANAGER = 'Preservation Manager'
    RESTORER = 'Restorer'
    CURATOR = 'Curator'
    IDLE = 'Idle'

class EmployeeDepartment(models.TextChoices):
    IT = 'IT'
    ADMINISTRATIVE = 'Administrative'
    OPERATIONS = 'Operations'
    COLLECTION = 'Collection'
    RESEARCH = 'Research'
    EDUCATION = 'Education'
    PRESERVATION = 'Preservation'
    SECURITY = 'Security'
    EXTERNAL = 'External'


# Create your models here.
class Employee(models.Model):
    # Options for employee status
    user = models.OneToOneField('auth.User', on_delete=models.PROTECT)
    department = models.CharField(max_length=30, choices=EmployeeDepartment.choices,
                                  default=EmployeeDepartment.EXTERNAL)
    state = models.CharField(max_length=30, choices=EmployeeState.choices, default=EmployeeState.ACTIVE)
    role = models.CharField(max_length=100, choices=EmployeeRoles.choices, default=EmployeeRoles.IDLE)
    status = models.BooleanField(default=True)
    birthday = models.DateField()
    country = models.CharField(max_length=100, default="Mexico")
    city = models.CharField(max_length=100)
    province = models.CharField(max_length=100)
    zip = models.PositiveIntegerField()
    street = models.CharField(max_length=100)
    settlement = models.CharField(max_length=100)
    ext = models.PositiveIntegerField()
    int = models.PositiveIntegerField()
    phone = models.PositiveIntegerField()
    cellphone = models.PositiveIntegerField()
    bacherlor_degree = models.CharField(max_length=100)

    def __str__(self):
        return self.user.first_name + ' ' + self.user.last_name + ' | ' + self.department + ' : ' + self.role


class EmployeeDocuments(models.Model):
    employee = model.OneToOneField(Employee, on_delete=models.PROTECT)
    photo_link = models.CharField(max_length=1000)
    cv = models.CharField(max_length=1000)
    address_proof = models.CharField(max_length=1000)
    id_proof = models.CharField(max_length=1000)
    bacherlor_degree_proof = models.CharField(max_length=1000)

class EmployeeDocumentsCertificates(models.Model):
    employee_documents = models.ForeignKey(EmployeeDocuments, on_delete=models.PROTECT)
    document = models.CharField(max_length=1000)

class MedicalFiles(models.Model):
    employee = models.OneToOneField(Employee, on_delete=models.PROTECT)
    NSS = models.PositiveIntergerField()

class MedicalAlergy(models.Model):
    medical_file = models.ForeignKey(MedicalFile, on_delete=models.PROTECT)
    alergy = models.CharField(max_length=100)

class MedicalIlment(models.Model):
    medical_file = models.ForeignKey(MedicalFilem on_delete=models.PROTECT)
    ilment= model.CharField(max_length=100)

class PrivateMedicalInsurance(models.Model):
    medical_file = models.OneToOneField(MedicalFiles, on_delete=models.PROTECT)
    name = models.CharField(max_length=100)
    document = models.CharField(max_length=1000)

class DropType(models.TextChoices):
    RESIGNATION = "Resignation"
    DISMISSAL = "Dismissal"

class EmployeeDrop(model.Model):
    employee = models.OneToOneField(Employee)
    date = models.DateField(auto_now=True)
    description = models.CharField(max_length=1000)
    employee_letter = models.CharField(max_length=1000, null=True)
    museum_letter = models.CharField(max:length=1000, null=True)
    drop_type = models.CharField(max_length=100, choices=DropType.choices, default=DropType.RESIGNATION)
    
class DropProofs(models.Model):
