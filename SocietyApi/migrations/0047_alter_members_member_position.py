# Generated by Django 3.2.12 on 2024-03-08 06:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0046_remove_members_flat_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='members',
            name='member_position',
            field=models.CharField(choices=[('nominal_member', 'Nominal Member'), ('associate_member', 'Associate Member'), ('member', 'Member')], max_length=200),
        ),
    ]
