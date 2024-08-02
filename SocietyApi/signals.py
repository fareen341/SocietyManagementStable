from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.apps import apps
from .models import VoucherType
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Ledger, GeneralLedger



@receiver(post_migrate)
def create_initial_objects(sender, **kwargs):
    if not VoucherType.objects.exists():
        # Create initial objects here
        VoucherType.objects.create(voucher_type='purchase_voucher', voucher_name='Purchase Voucher', voucher_short_name='PV')
        VoucherType.objects.create(voucher_type='sale_voucher', voucher_name='Sale Voucher', voucher_short_name='SV')
        VoucherType.objects.create(voucher_type='general_voucher', voucher_name='General Voucher', voucher_short_name='GV')
        VoucherType.objects.create(voucher_type='expenses_voucher', voucher_name='Expenses Voucher', voucher_short_name='EV')
        VoucherType.objects.create(voucher_type='income_voucher', voucher_name='Income Voucher', voucher_short_name='IV')
        VoucherType.objects.create(voucher_type='payment_voucher', voucher_name='Payment Voucher', voucher_short_name='PV')
        VoucherType.objects.create(voucher_type='receipt_voucher', voucher_name='Receipt Voucher', voucher_short_name='RV')


# When voucher entry is done, create its general entry with opening balane if given else 0
@receiver(post_save, sender=Ledger)
def create_or_update_general_ledger(sender, instance, created, **kwargs):
    if created:
        opening_balance = instance.opening_balance if instance.opening_balance is not None else 0
        GeneralLedger.objects.create(
            from_ledger = instance,
            particulars = Ledger.objects.get(ledger_name="Opening Balance"),
            balance = opening_balance
        )
        print("Opening Balance Created Successfully!")


# do this step above post save of above code
# CREATE A SIGNAL FOR LEGDER WHERE SUNDRY DEBITORS & PURCHASES AND SALE, ALSO ADD OPENING BALANCE AS A LEDGER IS CONSTANT
# Also add purchase and sales group
