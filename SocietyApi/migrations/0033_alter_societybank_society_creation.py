# Generated by Django 3.2.12 on 2024-03-01 15:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0032_alter_societybank_society_creation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='societybank',
            name='society_creation',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='SocietyApi.societycreation'),
        ),
    ]
