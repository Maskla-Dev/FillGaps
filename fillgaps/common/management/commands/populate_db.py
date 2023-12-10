from django.core.management.base import BaseCommand
from common.models import Employee, EmployeeDocuments, MedicalFiles, PrivateMedicalInsurance, MedicalAllergy, \
    MedicalAilment, EmployeeDrop, EmployeeDocumentsCertificates, DropProofs, EmployeeDepartment, DropType, \
    EmployeeRoles, EmployeeState
from chat.models import ChatChannel, ChannelMessage, ChannelEmployee, ChannelAdmin, ChannelType
import random
import string
from django.contrib.auth.models import User
from datetime import datetime, timedelta


def random_date(start_date, end_date):
    return start_date + timedelta(
        seconds=random.randint(0, int((end_date - start_date).total_seconds())))


start_date = datetime(1990, 1, 1)
end_date = datetime(2022, 12, 31)


class Command(BaseCommand):
    help = 'Populates the database with random data'

    def handle(self, *args, **options):
        self.stdout.write('Populating database...')

        # Populate Employee model
        for _ in range(100):
            Employee.objects.create(
                department=random.choice(EmployeeDepartment.choices)[0],
                state=random.choice(EmployeeState.choices)[0],
                role=random.choice(EmployeeRoles.choices)[0],
                status=random.choice([True, False]),
                birthday=random_date(start_date, end_date),
                country='Country',
                city='City',
                province='Province',
                zip=random.randint(10000, 99999),
                street='Street',
                settlement='Settlement',
                ext=random.randint(1, 100),
                int=random.randint(1, 100),
                phone=random.randint(1000000000, 9999999999),
                cellphone=random.randint(1000000000, 9999999999),
                bachelor_degree='Bachelor Degree',
                user=User.objects.create_user(
                    username=''.join(random.choices(string.ascii_letters + string.digits, k=10)), password='password')
            )
        # Populate ChatChannel model

        for i in range(10):
            channel = ChatChannel.objects.create(
                channel_name=f'Channel {i}',
                channel_description='This is a chat channel.',
                chat_type=random.choice(ChannelType.choices)[0],
                status=random.choice([True, False])
            )

        # Populate ChannelEmployee and ChannelAdmin models
        employees = Employee.objects.all()
        for employee in employees:
            ChannelEmployee.objects.create(channel=channel, employee=employee)
            if random.choice([True, False]):  # Randomly make some employees admins
                ChannelAdmin.objects.create(channel=channel, admin=employee)

        # Populate ChannelMessage model
        for _ in range(100):
            ChannelMessage.objects.create(
                message_content='This is a message.',
                channel=channel,
                sender=random.choice(employees)
            )

        # Populate other models similarly...

        self.stdout.write('Database populated successfully.')
