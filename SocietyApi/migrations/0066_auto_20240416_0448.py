# Generated by Django 3.2.12 on 2024-04-16 04:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SocietyApi', '0065_alter_unittest_review'),
    ]

    operations = [
        migrations.AddField(
            model_name='vouchertype',
            name='voucher_name',
            field=models.CharField(default='-', max_length=200),
        ),
        migrations.AlterField(
            model_name='vouchertype',
            name='voucher_type',
            field=models.CharField(choices=[('purchase_voucher', 'Purchase Voucher'), ('sale_voucher', 'Sale Voucher'), ('general_voucher', 'General Voucher'), ('expenses_voucher', 'Expenses Voucher'), ('income_voucher', 'Income Voucher'), ('payment_voucher', 'Payment Voucher'), ('receipt_voucher', 'Receipt Voucher')], max_length=200),
        ),
    ]
