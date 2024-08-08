from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.apps import apps
from .models import VoucherType
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Ledger, GeneralLedger, Members
import requests
from SocietyApp.models import Childs
from SocietyApp.signals import constant_member_group



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
def create_general_ledger(sender, instance, created, **kwargs):
    if created:
        opening_balance = instance.opening_balance if instance.opening_balance is not None else 0
        grp_name = Childs.objects.get(name=instance.group_name).id

        api_url = f'http://127.0.0.1:8000/group_data/{grp_name}/'
        child_obj = None
        debit = None
        credit = None

        try:
            response = requests.get(api_url)
            response.raise_for_status()
            data = response.json()
            child_obj = data['groups'][0]['super_parent']

        except requests.exceptions.RequestException as e:
            print(f"Something went wrong...................................................: {e}")
            return  # Exit the function if there's an error

        # Initialize balance with the opening balance
        balance = opening_balance
        
        if str(child_obj) in ['Assets', 'Expenses']:
            if instance.dr_cr == 'Cr':
                balance = -balance
                
        elif str(child_obj) in ['Liabilities', 'Income']:
            if instance.dr_cr == 'Dr':
                balance = -balance

        if instance.dr_cr == 'Dr':
            debit = balance

        elif instance.dr_cr == 'Cr':
            credit = balance

        if instance.ledger_name != 'Opening Balance':
            GeneralLedger.objects.create(
                from_ledger=instance,
                particulars=Ledger.objects.get(ledger_name="Opening Balance"),
                debit=debit,
                credit=credit,
                balance=balance
            )
            print("Opening Balance Created Successfully!")


@receiver(post_save, sender=Members)
def create_ledger_for_member(sender, instance, created, **kwargs):
    if created:
        ledger_name = f"{instance.member_name}-{instance.wing_flat.wing_flat_unique}"
        Ledger.objects.create(
            ledger_name=ledger_name,
            nature='Fixed',
            group_name=constant_member_group,
            dr_cr='Dr',
        )

        
# do this step above post save of above code
# CREATE A SIGNAL FOR LEGDER WHERE SUNDRY DEBITORS & PURCHASES AND SALE, ALSO ADD OPENING BALANCE AS A LEDGER IS CONSTANT
# Also add purchase and sales group





# @receiver(post_save, sender=Ledger)
# def create_general_ledger(sender, instance, created, **kwargs):
#     if created:
#         opening_balance = instance.opening_balance if instance.opening_balance is not None else 0
        
#         # Ensure the "Opening Balance" ledger exists
#         opening_balance_ledger, created_ledger = Ledger.objects.get_or_create(ledger_name="Opening Balance")
        
#         GeneralLedger.objects.create(
#             from_ledger=instance,
#             particulars=opening_balance_ledger,
#             balance=opening_balance
#         )
#         print("Opening Balance Created Successfully!")