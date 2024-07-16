# Generated by Django 5.0.7 on 2024-07-16 15:13

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0116_remove_againstrefrencemodel_voucher_type_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='againstrefrencemodel',
            name='voucher_type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='SocietyApi.vouchercreationmodel'),
        ),
        migrations.AlterField(
            model_name='againstrefrencemodel',
            name='against_related_ledger',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='SocietyApi.relatedledgersmodel'),
        ),
    ]
