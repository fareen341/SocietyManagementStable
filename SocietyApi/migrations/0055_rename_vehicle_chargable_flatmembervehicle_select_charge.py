# Generated by Django 3.2.12 on 2024-03-08 11:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0054_alter_flatmembervehicle_chargable'),
    ]

    operations = [
        migrations.RenameField(
            model_name='flatmembervehicle',
            old_name='vehicle_chargable',
            new_name='select_charge',
        ),
    ]