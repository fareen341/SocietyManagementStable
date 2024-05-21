# Generated by Django 3.2.12 on 2024-05-20 08:31

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0087_auto_20240519_0544'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tenantmaster',
            name='tenant_aadhar_number',
            field=models.CharField(max_length=12, unique=True, validators=[django.core.validators.RegexValidator(message='Aadhar number must be exactly 12 digits', regex='^[a-zA-Z0-9]{12}$')]),
        ),
        migrations.AlterField(
            model_name='tenantmaster',
            name='tenant_pan_number',
            field=models.CharField(max_length=10, unique=True, validators=[django.core.validators.RegexValidator(message='PAN number must be exactly 10 digits', regex='^[a-zA-Z0-9]{10}$')]),
        ),
    ]