from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class EmployeeState(models.TextChoices):
    ACTIVE = 'Active'
    DISABILITY_LEAVE = "Disability Leave"
    PARENTAL_LEAVE = "Parental Leave"
    TEMPORAL_LEAVE = "Temporal Leave"
    DISMISSAL = "Dismissal"
    RESIGNATION = "Resignation"
    MEDICAL_LEAVE = "Medical Leave"


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
    bachelor_degree = models.CharField(max_length=100)
    since = models.DateField(default=timezone.now)
    init_journey = models.TimeField(null=True, blank=True)
    end_journey = models.TimeField(null=True, blank=True)
    salary = models.PositiveIntegerField(default=0)
    bank_account = models.PositiveIntegerField(default=123456789012345678)
    bank = models.CharField(max_length=100, default="Banamex")
    clabe = models.PositiveIntegerField(default=123456789012345678)

    def __str__(self):
        return self.user.first_name + ' ' + self.user.last_name + ' | ' + self.department + ' : ' + self.role


class EmployeeDocuments(models.Model):
    employee = models.OneToOneField(Employee, on_delete=models.PROTECT)
    photo = models.ImageField()
    cv = models.FileField()
    address_proof = models.FileField()
    id_proof = models.FileField()
    bachelors_degree_proof = models.FileField()


class EmployeeDocumentsCertificates(models.Model):
    employee_documents = models.ForeignKey(EmployeeDocuments, on_delete=models.PROTECT)
    document = models.FileField()


class MedicalFiles(models.Model):
    employee = models.OneToOneField(Employee, on_delete=models.PROTECT)
    NSS = models.PositiveIntegerField()


class MedicalAllergy(models.Model):
    medical_file = models.ForeignKey(MedicalFiles, on_delete=models.PROTECT)
    allergy = models.CharField(max_length=100)


class MedicalAilment(models.Model):
    medical_file = models.ForeignKey(MedicalFiles, on_delete=models.PROTECT)
    ailment = models.CharField(max_length=100)


class PrivateMedicalInsurance(models.Model):
    medical_file = models.OneToOneField(MedicalFiles, on_delete=models.PROTECT)
    name = models.CharField(max_length=100)
    document = models.FileField()


class DropType(models.TextChoices):
    RESIGNATION = "Resignation"
    DISMISSAL = "Dismissal"
    DISABILITY = "Disability"


class EmployeeDrop(models.Model):
    employee = models.OneToOneField(Employee, on_delete=models.PROTECT)
    date = models.DateField(auto_now=True)
    description = models.CharField(max_length=1000)
    employee_letter = models.FileField(null=True)
    museum_letter = models.FileField(null=True)
    drop_type = models.CharField(max_length=100, choices=DropType.choices, default=DropType.RESIGNATION)


class DropProofs(models.Model):
    employee_drop = models.ForeignKey(EmployeeDrop, on_delete=models.PROTECT)
    file = models.FileField()
