# Generated by Django 5.0.7 on 2024-07-24 16:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0122_alter_ledger_allow_against_refrence'),
    ]

    operations = [
        migrations.AddField(
            model_name='vouchercreationmodel',
            name='cheque_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]