# Generated by Django 4.0 on 2024-06-10 11:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0089_shareonledgermodel_vouchercreationmodel_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='costcenteronledger',
            name='related_ledger',
        ),
    ]
