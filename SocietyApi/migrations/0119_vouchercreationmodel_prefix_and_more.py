# Generated by Django 5.0.7 on 2024-07-23 07:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0118_againstrefrencemodel_allocated_amt'),
    ]

    operations = [
        migrations.AddField(
            model_name='vouchercreationmodel',
            name='prefix',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='vouchercreationmodel',
            name='suffix',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
