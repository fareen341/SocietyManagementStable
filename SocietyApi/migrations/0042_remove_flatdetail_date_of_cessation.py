# Generated by Django 3.2.12 on 2024-03-04 08:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0041_alter_flatdetail_wing_flat'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='flatdetail',
            name='date_of_cessation',
        ),
    ]