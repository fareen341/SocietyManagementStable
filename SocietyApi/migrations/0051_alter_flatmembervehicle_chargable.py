# Generated by Django 3.2.12 on 2024-03-08 10:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0050_alter_flathomeloan_bank_loan_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='flatmembervehicle',
            name='chargable',
            field=models.CharField(choices=[('no', 'No'), ('yes', 'Yes')], default='no', max_length=200),
        ),
    ]
