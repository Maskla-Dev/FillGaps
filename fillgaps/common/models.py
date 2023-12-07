from django.db import models
from django.contrib.auth.models import User


class EmployeeState(models.TextChoices):
    ACTIVE = 'Active'
    INACTIVE = 'Inactive'
    HOLIDAYS = "In Holidays"
    MATERNITY = "Maternity"
    PATERNITY = "Paternity"
    SICK = "Sick"


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