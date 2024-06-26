# Generated by Django 3.2.12 on 2024-03-28 09:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0057_rename_assets_ledger'),
    ]

    operations = [
        migrations.CreateModel(
            name='VoucherType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('voucher_type', models.CharField(max_length=200)),
                ('voucher_short_name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='VoucherIndexing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_date', models.DateField()),
                ('to_date', models.DateField()),
                ('prefix', models.CharField(max_length=200)),
                ('suffix', models.CharField(max_length=200)),
                ('voucher_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='SocietyApi.vouchertype')),
            ],
        ),
    ]
