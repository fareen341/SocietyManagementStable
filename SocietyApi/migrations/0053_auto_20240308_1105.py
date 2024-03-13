# Generated by Django 3.2.12 on 2024-03-08 11:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0052_alter_flatmembervehicle_chargable'),
    ]

    operations = [
        migrations.AddField(
            model_name='flatmembervehicle',
            name='vehicle_chargable',
            field=models.CharField(choices=[('no', 'No'), ('yes', 'Yes')], default='no', max_length=200),
        ),
        migrations.AlterField(
            model_name='flatmembervehicle',
            name='chargable',
            field=models.CharField(max_length=200),
        ),
    ]