# Generated by Django 3.2.12 on 2024-03-02 03:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0035_flatdetails'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='FlatDetails',
            new_name='FlatDetail',
        ),
    ]