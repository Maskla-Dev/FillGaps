# Generated by Django 4.2.6 on 2023-12-31 08:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0002_employee_end_journey_employee_init_journey_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='end_journey',
        ),
        migrations.RemoveField(
            model_name='employee',
            name='init_journey',
        ),
    ]