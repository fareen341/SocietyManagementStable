# Generated by Django 3.2.12 on 2024-05-11 05:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0080_alter_societycreation_pin_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='wingflat',
            name='society_creation',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='SocietyApi.societycreation'),
        ),
    ]
