# Generated by Django 5.0.7 on 2024-08-06 06:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0125_alter_ledger_account_no_alter_ledger_address_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='SocietyMaintainanceBill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('invoice_date', models.DateField()),
                ('interest_rate', models.IntegerField(default=21)),
                ('invoice_due_date', models.DateField()),
            ],
        ),
    ]
