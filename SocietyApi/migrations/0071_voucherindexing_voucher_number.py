# Generated by Django 3.2.12 on 2024-04-23 08:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0070_alter_voucherindexing_unique_together'),
    ]

    operations = [
        migrations.AddField(
            model_name='voucherindexing',
            name='voucher_number',
            field=models.CharField(default='', max_length=250),
        ),
    ]