from django.db import models


# Create your models here.
class EmployeeDocuments(models.Model):
    employee = models.OneToOneField('common.Employee', on_delete=models.PROTECT)
    photo = models.ImageField()
    cv = models.FileField()
    address_proof = models.FileField()
    id_proof = models.FileField()
    bacherlor_degree_proof = models.FileField()


class EmployeeDocumentsCertificates(models.Model):
    employee_documents = models.ForeignKey(EmployeeDocuments, on_delete=models.PROTECT)
    document = models.FileField()


class MedicalFiles(models.Model):
    employee = models.OneToOneField('common.Employee', on_delete=models.PROTECT)
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


class EmployeeDrop(models.Model):
    employee = models.OneToOneField('common.Employee', on_delete=models.PROTECT)
    date = models.DateField(auto_now=True)
    description = models.CharField(max_length=1000)
    employee_letter = models.FileField(null=True)
    museum_letter = models.FileField(null=True)
    drop_type = models.CharField(max_length=100, choices=DropType.choices, default=DropType.RESIGNATION)


class DropProofs(models.Model):
    employee_drop = models.ForeignKey(EmployeeDrop, on_delete=models.PROTECT)
    file = models.FileField()
