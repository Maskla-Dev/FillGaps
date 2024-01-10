# Generated by Django 4.2.6 on 2023-12-31 07:34

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='end_journey',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='employee',
            name='init_journey',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='employee',
            name='since',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='employee',
            name='state',
            field=models.CharField(choices=[('Active', 'Active'), ('Disability Leave', 'Disability Leave'), ('Parental Leave', 'Parental Leave'), ('Temporal Leave', 'Temporal Leave'), ('Dismissal', 'Dismissal'), ('Resignation', 'Resignation'), ('Medical Leave', 'Medical Leave')], default='Active', max_length=30),
        ),
        migrations.AlterField(
            model_name='employeedrop',
            name='drop_type',
            field=models.CharField(choices=[('Resignation', 'Resignation'), ('Dismissal', 'Dismissal'), ('Disability', 'Disability')], default='Resignation', max_length=100),
        ),
    ]
