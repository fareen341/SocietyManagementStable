from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.apps import apps
from .models import Childs, CostCenter


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
        Childs.objects.create(name='Curren Assest', parent=assets)
        Childs.objects.create(name='Misc Assets', parent=assets)

        # CHILDS OF LIABILITIES
        Childs.objects.create(name='Capital', parent=liabilities)
        Childs.objects.create(name='Reserve', parent=liabilities)
        Childs.objects.create(name='Loan', parent=liabilities)
        Childs.objects.create(name='Current Liabilities', parent=liabilities)
        Childs.objects.create(name='Misc Liabilities', parent=liabilities)

        # CHILDS OF INCOME
        Childs.objects.create(name='Direct Income', parent=income)
        Childs.objects.create(name='Indirect Income', parent=income)

        # CHILDS OF EXPENSES
        Childs.objects.create(name='Direct Expenses', parent=expenses)
        Childs.objects.create(name='Indirect Expenses', parent=expenses)

        print("Initial objects of childs models created successfully")


    # COST CENTER OBJECTS
    if not CostCenter.objects.exists():
        CostCenter.objects.create(name='Primary')
        print("Initial objects of cost center models created successfully")

