from django.shortcuts import render
from  SocietyApi.models import *
from SocietyApi.serializers import MemberSerializersForNominees

# Create your views here.

def create_society(request):
    return render(request,'society_creation.html')


def society_detail(request):
    soc_object = SocietyCreation.objects.all().values()
    society_id = SocietyCreation.objects.first().id
    soc_bank_object = SocietyBank.objects.all().values()
    wing_flat_list = WingFlat.objects.all()
    soc_other_document_object = SocietyOtherDocument.objects.all().values()
    soc_document_object = SocietyRegistrationDocument.objects.all().values()
    return render(request,'society_details_view.html', {
        'soc_object': soc_object,
        'society_id': society_id,
        'soc_bank_object': soc_bank_object,
        'wing_flat_list': wing_flat_list,
        'soc_other_document_object': soc_other_document_object,
        'soc_document_object': soc_document_object
    })


def member_details(request):
    datatable_columns = [0, 2, 3, 4, 5, 6, 7]
    return render(request, 'member_master_table.html', {'datatable_columns': datatable_columns})


def create_member(request):
    return render(request, 'member_master.html')


def create_house_help(request):
    datatable_columns = [0, 2, 3, 4]
    return render(request, 'house_help/house_help_master.html', {'datatable_columns': datatable_columns})


def allocate_house_help(request):
    datatable_columns = [0, 2, 3, 4, 5, 6, 7]
    return render(request, 'house_help_allocation.html', {'datatable_columns': datatable_columns})


def create_tenant(request):
    datatable_columns = [0, 2, 3, 4]
    return render(request, 'tenent_master.html', {'datatable_columns': datatable_columns})


def allocate_tenant(request):
    datatable_columns = [0, 2, 3, 4]
    return render(request, 'tenent_allocation.html', {'datatable_columns': datatable_columns})


def meetings_view(request):
    datatable_columns = [0, 2, 3, 4, 5, 6, 7]
    return render(request, 'meetings.html', {'datatable_columns': datatable_columns})


def extra(request):
    return render(request, 'extra3.html')


def nominee_register_view(request):
    datatable_columns = []
    flats = WingFlatUnique.objects.values('id', 'wing_flat_unique').distinct()
    data = []
    for flat in flats:
        members = Members.objects.filter(
            wing_flat__wing_flat_unique=flat['wing_flat_unique'],
            date_of_cessation__isnull=True,
        )
        if(members):
            serialized_members = MemberSerializersForNominees(members, many=True).data
            data.append({
                "flat_id": flat['id'],
                "flat_no": flat['wing_flat_unique'],
                "members": serialized_members
            })
    print('data============', data[0])
    return render(request, 'register/nominee_register_table.html', {'datatable_columns': datatable_columns, 'nominees': data})
