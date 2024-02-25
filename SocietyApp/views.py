from django.shortcuts import render
from  SocietyApi.models import *

# Create your views here.

def create_society(request):
    return render(request,'society_creation.html')


def society_detail(request):
    soc_object = SocietyCreation.objects.all().values()
    society_id = SocietyCreation.objects.first().id
    soc_bank_object = SocietyBank.objects.all().values()
    return render(request,'society_details_view.html', {
        'soc_object': soc_object,
        'society_id': society_id,
        'soc_bank_object': soc_bank_object
    })


def member_details(request):
    return render(request, 'member_master_table.html')


def create_member(request):
    return render(request, 'member_master.html')


def create_house_help(request):
    return render(request, 'house_help/house_help_master.html')


def allocate_house_help(request):
    return render(request, 'house_help_allocation.html')


def create_tenant(request):
    return render(request, 'tenent_master.html')


def allocate_tenant(request):
    return render(request, 'tenent_allocation.html')


def meetings_view(request):
    return render(request, 'meetings.html')
