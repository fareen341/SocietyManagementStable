# Generated by Django 4.0 on 2024-06-10 11:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0091_costcenteronledger_related_ledger'),
    ]

    operations = [
        migrations.AlterField(
            model_name='costcenteronledger',
            name='related_ledger',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='SocietyApi.relatedledgersmodel'),
        ),
    ]
