from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.apps import apps
from .models import Childs, CostCenter
from SocietyApi.models import Ledger



constant_groups = [
    'Fixed Assets', 'Investment', 'Cash and Bank Balances', 'Loans and Advances',
    'Current Assest', 'Profit and Loss Account', 'Share Capital', 'Subscription Towards Shares',
    'Reserve Fund and Other Funds', 'Secured Loans', 'Unsecured Loans', 'Deposits',
    'Current Liabilities And Provisions', 'Interest Accrued Due But Not Paid'
]

constant_member_group = "Receivable from Members"

@receiver(post_migrate)
def create_initial_objects(sender, **kwargs):
    # CHILDS CENTER OBJECTS
    if not Childs.objects.exists():
        # Create initial objects here
        assets = Childs.objects.create(name='Assets')
        liabilities = Childs.objects.create(name='Liabilities')
        income = Childs.objects.create(name='Income')
        expenses = Childs.objects.create(name='Expenses')

        # APART FROM ABOVE
        bank = Childs.objects.create(name='Bank')

        # CHILDS OF ASSETS
        Childs.objects.create(name='Fixed Assets', parent=assets)
        Childs.objects.create(name='Investment', parent=assets)
        cash = Childs.objects.create(name='Cash and Bank Balances', parent=assets)
        Childs.objects.create(name='Loans and Advances', parent=assets)
        current_assets = Childs.objects.create(name='Current Assest', parent=assets)
        Childs.objects.create(name='Profit and Loss Account', parent=assets)

        # CHILDS OF LIABILITIES WHICH NEEDS TO BE SHOW IN (BALANCE SHEET)
        Childs.objects.create(name="Share Capital", parent=liabilities)
        Childs.objects.create(name="Subscription Towards Shares", parent=liabilities)
        Childs.objects.create(name="Reserve Fund and Other Funds", parent=liabilities)
        Childs.objects.create(name="Secured Loans", parent=liabilities)
        Childs.objects.create(name="Unsecured Loans", parent=liabilities)
        Childs.objects.create(name="Deposits", parent=liabilities)
        current_liablity = Childs.objects.create(name="Current Liabilities And Provisions", parent=liabilities)
        Childs.objects.create(name='Interest Accrued Due But Not Paid', parent=liabilities)

        # CHILDS OF INCOME
        Childs.objects.create(name='Direct Income', parent=income)
        Childs.objects.create(name='Indirect Income', parent=income)
        # Childs.objects.create(name='Sales', parent=income)

        # CHILDS OF EXPENSES
        Childs.objects.create(name='Direct Expenses', parent=expenses)
        Childs.objects.create(name='Indirect Expenses', parent=expenses)
        # Childs.objects.create(name='Purchases', parent=expenses)

        # Sub-Childs of Current Assets
        sundry_debtor = Childs.objects.create(name="Sundry Debtor", parent=current_assets)
        Childs.objects.create(name=constant_member_group, parent=sundry_debtor)

        # Sub-Childs of Current Liability
        Childs.objects.create(name="Sundry Creditor", parent=current_liablity)

        # Opening balance group
        opening_balance = Childs.objects.create(name='Opening Balance')

        if not Ledger.objects.exists():
            Ledger.objects.create(ledger_name="Opening Balance", group_name=opening_balance, nature='Fixed', dr_cr='Dr')
            Ledger.objects.create(ledger_name="Cash", group_name=cash, nature='Fixed', dr_cr='Dr')
            Ledger.objects.create(ledger_name="Purchases", group_name=expenses, nature='Fixed', dr_cr='Dr')
            Ledger.objects.create(ledger_name="Sales", group_name=income, nature='Fixed', dr_cr='Dr')
            Ledger.objects.create(ledger_name="Excess of Income over Expenses", group_name=expenses, nature='Fixed', dr_cr='Dr')
            Ledger.objects.create(ledger_name="Excess of Expenses over Income", group_name=income, nature='Fixed', dr_cr='Dr')

        print("Initial objects of childs models created successfully")

    # COST CENTER OBJECTS
    if not CostCenter.objects.exists():
        CostCenter.objects.create(name='Primary')
        print("Initial objects of cost center models created successfully")

