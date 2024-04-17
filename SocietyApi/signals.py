from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.apps import apps
from .models import VoucherType


@receiver(post_migrate)
def create_initial_objects(sender, **kwargs):
    if not VoucherType.objects.exists():
        # Create initial objects here
        VoucherType.objects.create(voucher_type='purchase_voucher', voucher_name='-', voucher_short_name='PV')
        VoucherType.objects.create(voucher_type='sale_voucher', voucher_name='-', voucher_short_name='SV')
        VoucherType.objects.create(voucher_type='general_voucher', voucher_name='-', voucher_short_name='GV')
        VoucherType.objects.create(voucher_type='expenses_voucher', voucher_name='-', voucher_short_name='EV')
        VoucherType.objects.create(voucher_type='income_voucher', voucher_name='-', voucher_short_name='IV')
        VoucherType.objects.create(voucher_type='payment_voucher', voucher_name='-', voucher_short_name='PV')
        VoucherType.objects.create(voucher_type='receipt_voucher', voucher_name='-', voucher_short_name='RV')
