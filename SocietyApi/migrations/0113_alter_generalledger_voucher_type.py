# Generated by Django 5.0.7 on 2024-07-16 04:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0112_alter_generalledger_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='generalledger',
            name='voucher_type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='SocietyApi.vouchertype'),
        ),
    ]