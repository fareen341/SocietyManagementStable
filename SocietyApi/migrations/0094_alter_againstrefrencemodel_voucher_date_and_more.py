# Generated by Django 4.0 on 2024-06-11 05:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0093_remove_againstrefrencemodel_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='againstrefrencemodel',
            name='voucher_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='againstrefrencemodel',
            name='voucher_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='SocietyApi.vouchercreationmodel'),
        ),
    ]