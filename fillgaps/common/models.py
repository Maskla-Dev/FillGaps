from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Department(models.Model):
    department_name = models.CharField(max_length=50)
    status = models.BooleanField

    def __str__(self):
        return self.department_name


class Role(models.Model):
    role_name = models.CharField(max_length=50, unique=True)
    status = models.BooleanField

    def __str__(self):
        return self.role_name


class Employee(models.Model):
    department = models.ForeignKey(Department, on_delete=models.PROTECT)
    user = models.ForeignKey('auth.User', on_delete=models.PROTECT)
    role = models.ForeignKey(Role, on_delete=models.PROTECT)
    status = models.BooleanField
    photo_link = models.CharField(max_length=1000)

    def __str__(self):
        return self.user.first_name + ' ' + self.user.last_name
