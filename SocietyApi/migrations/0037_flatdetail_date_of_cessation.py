# Generated by Django 3.2.12 on 2024-03-02 03:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0036_rename_flatdetails_flatdetail'),
    ]

    operations = [
        migrations.AddField(
            model_name='flatdetail',
            name='date_of_cessation',
            field=models.DateField(blank=True, null=True),
        ),
    ]