# Generated by Django 3.2.12 on 2024-03-01 12:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0030_alter_meetings_minutes_content'),
    ]

    operations = [
        migrations.AlterField(
            model_name='flatmembervehicle',
            name='unique_member_shares',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vehicles', to='SocietyApi.members'),
        ),
    ]
