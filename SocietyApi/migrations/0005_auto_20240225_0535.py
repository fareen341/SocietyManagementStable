# Generated by Django 3.2.12 on 2024-02-25 05:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0004_members_nominees'),
    ]

    operations = [
        migrations.AlterField(
            model_name='members',
            name='age_at_date_of_admission',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='members',
            name='same_flat_member_identification',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
