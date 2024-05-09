from django.shortcuts import render
from  SocietyApi.models import *
from SocietyApi.serializers import *
from .models import *

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
    datatable_columns = []
    return render(request, 'member_master.html', {'datatable_columns': datatable_columns})


def create_house_help(request):
    datatable_columns = [0, 2, 3, 4]
    return render(request, 'house_help/house_help_master.html', {'datatable_columns': datatable_columns})


def allocate_house_help(request):
    datatable_columns = [0, 1, 2, 3, 4, 5, 6, 7]
    return render(request, 'house_help_allocation.html', {'datatable_columns': datatable_columns})


def create_tenant(request):
    datatable_columns = [0, 2, 3, 4]
    return render(request, 'tenent_master.html', {'datatable_columns': datatable_columns})


def allocate_tenant(request):
    datatable_columns = [0, 1, 2, 3, 4]
    return render(request, 'tenent_allocation.html', {'datatable_columns': datatable_columns})


def meetings_view(request):
    datatable_columns = [0, 1, 2, 3, 4, 5]
    return render(request, 'meetings.html', {'datatable_columns': datatable_columns})


def extra(request):
    return render(request, 'extra3.html')


def nominee_register_view(request):
    status = request.GET.get('selected', None)
    print("QUERY URL-->", status)

    datatable_columns = []
    flats = WingFlatUnique.objects.values('id', 'wing_flat_unique').distinct().order_by('wing_flat_unique')
    data = []
    for flat in flats:
        members = Members.objects.filter(
            wing_flat__wing_flat_unique=flat['wing_flat_unique'],
            date_of_cessation__isnull=True,
        )
        if status == 'history':
            members = Members.objects.filter(
                wing_flat__wing_flat_unique=flat['wing_flat_unique'],
                date_of_cessation__isnull=False,
            )
        elif status == 'all':
            members = Members.objects.filter(
                wing_flat__wing_flat_unique=flat['wing_flat_unique']
            )
        serialized_members = MemberSerializersForNominees(members, many=True).data
        data.append({
            "flat_id": flat['id'],
            "flat_no": flat['wing_flat_unique'],
            "members": serialized_members
        })
    return render(request, 'register/nominee_register_table.html', {'datatable_columns': datatable_columns, 'nominees': data})


def form_i_view(request):
    datatable_columns = []
    status = request.GET.get('selected', None)
    print("QUERY URL-->", status)

    datatable_columns = []
    flats = WingFlatUnique.objects.values('id', 'wing_flat_unique').distinct().order_by('wing_flat_unique')
    data = []
    for flat in flats:
        members = Members.objects.filter(
                wing_flat__wing_flat_unique=flat['wing_flat_unique']
            )
        if status == 'history':
            members = Members.objects.filter(
                wing_flat__wing_flat_unique=flat['wing_flat_unique'],
                date_of_cessation__isnull=False,
            )
        elif status == 'current':
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
    return render(request, 'register/form_i.html', {'datatable_columns': datatable_columns, 'nominees': data})


def form_i_MH_view(request, pk):
    datatable_columns = []
    members = None
    shares_details = []
    try:
        members = Members.objects.get(id=pk)
        if members:
            try:
                shares_details = FlatShares.objects.filter(wing_flat=members.wing_flat)
            except FlatShares.DoesNotExist:
                print("Shares data not exists for the selected flat.")
    except Members.DoesNotExist:
       print("Member Not Found.")
    return render(request, 'register/form_i_MH.html', {
        'datatable_columns': datatable_columns,
        'members': members,
        'shares_details': shares_details,
        })


def vehicle_register(request):
    datatable_columns = []
    status = request.GET.get('selected', None)
    print("QUERY URL-->", status)

    datatable_columns = []
    flats = WingFlatUnique.objects.values('id', 'wing_flat_unique').distinct().order_by('wing_flat_unique')
    data = []
    for flat in flats:
        members = Members.objects.filter(
                wing_flat__wing_flat_unique=flat['wing_flat_unique'],
                date_of_cessation__isnull=True,
            )
        if status == 'history':
             members = Members.objects.filter(
                wing_flat__wing_flat_unique=flat['wing_flat_unique'],
                date_of_cessation__isnull=False,
            )
        elif status == 'all':
            members = Members.objects.filter(
                wing_flat__wing_flat_unique=flat['wing_flat_unique']
            )
        if(members):
            serialized_members = MemberSerializersForNominees(members, many=True).data
            data.append({
                "flat_id": flat['id'],
                "flat_no": flat['wing_flat_unique'],
                "members": serialized_members
            })
    return render(request, 'register/vehicle_register.html', {'datatable_columns': datatable_columns, 'vehicles': data})


def hypotication_register(request):
    datatable_columns = []
    status = request.GET.get('selected', None)
    print("QUERY URL-->", status)

    datatable_columns = []
    flats = WingFlatUnique.objects.values('id', 'wing_flat_unique').distinct().order_by('wing_flat_unique')
    data = []
    for flat in flats:
        members = Members.objects.filter(
                wing_flat__wing_flat_unique=flat['wing_flat_unique'],
                date_of_cessation__isnull=True,
            )
        if status == 'history':
             members = Members.objects.filter(
                wing_flat__wing_flat_unique=flat['wing_flat_unique'],
                date_of_cessation__isnull=False,
            )
        elif status == 'all':
            members = Members.objects.filter(
                wing_flat__wing_flat_unique=flat['wing_flat_unique']
            )
        if(members):
            serialized_members = MemberSerializersForNominees(members, many=True).data
            data.append({
                "flat_id": flat['id'],
                "flat_no": flat['wing_flat_unique'],
                "members": serialized_members
            })
    return render(request, 'register/hypotication_register.html', {'datatable_columns': datatable_columns, 'banks': data})


def unit_register(request):
    datatable_columns = []
    status = request.GET.get('selected', None)
    wing_flat_unique_instances = WingFlatUnique.objects.all().order_by('wing_flat_unique')
    serialized_instances = UnitRegisterSerializers(wing_flat_unique_instances, many=True, context={'request': request} )
    context = {
        'datatable_columns': datatable_columns,
        'units': serialized_instances.data,
        'status': status
    }
    return render(request, 'register/unit_register.html', context)




from django.http import HttpResponse, JsonResponse



def form_j_view(request):
    datatable_columns = []
    data = []
    status = request.GET.get('selected', None)
    '''
    TO CALCULATE SGM:
        COUNT OF ALL MEETINGS HELD
        --------------------------
        NO. OF TIME PARTICULAR FLAT MEMBER PRESENT

        EXAMPLE:
        SGM HELD 10 TIMES:

            10
        ----------
        A-WING-1 MEMBER(LATIKA(CURRENT)) PRESENT FOR 2 TIMES

        SO, THAT MEMBER WILL BE DEFAULTER
        AND ONLY MEMBER WILL BE SHOWN IN FORM J
    '''

    flats = WingFlatUnique.objects.values('id', 'wing_flat_unique').distinct().order_by('wing_flat_unique')
    for flat in flats:
        print("FLATS==========", flat)
        # annual_general_meeting
        annual_general_meeting = Attendance.objects.filter(
            flat_no=flat['id'], meeting_id__meeting_type='annual_general_meeting',
            flat_no__members__date_of_cessation__isnull=True,
            flat_no__members__member_is_primary=True,
        )
        # print("GET MEETING====>", annual_general_meeting.values('flat_no__members__member_name'))

        # special_general_body_meeting
        special_general_body_meeting = Attendance.objects.filter(
            flat_no=flat['id'], meeting_id__meeting_type='special_general_body_meeting',
            flat_no__members__date_of_cessation__isnull=True,
            flat_no__members__member_is_primary=True,
        )
        print("GET MEETING====>", special_general_body_meeting.values('flat_no__members__member_name'))


        members = Members.objects.filter(
                wing_flat__wing_flat_unique=flat['wing_flat_unique'],
                date_of_cessation__isnull=True,
                member_is_primary = True
            )
        if(members):
            serialized_members = MemberSerializersForNominees(members, many=True).data
            data.append({
                "flat_id": flat['id'],
                "flat_no": flat['wing_flat_unique'],
                "members": serialized_members
            })
    # return JsonResponse({'flats': data})
    return render(request, 'register/form_j.html', {'datatable_columns': datatable_columns, 'members': data})


def unit_master(request):
    datatable_columns = [0, 3, 4, 5, 6]
    return render(request, 'unit_master.html', {'datatable_columns': datatable_columns})


def ledger_creation(request):
    datatable_columns = [0, 1, 2]
    # GROUPS LIST VIEW
    under_grps = ["Assets", "Liabilities", "Income", "Expenses", "Bank"]
    all_child_investments = {}
    for under_grp in under_grps:
        parent_investment = Childs.objects.get(name=under_grp)
        # parent_investment = CostCenter.objects.get(name=under_grp)
        all_child_investments[under_grp] = get_all_child_investments(parent_investment)

    # COST CENTER LIST VIEW
    parent_investment = CostCenter.objects.get(name="Primary")
    all_cost_center_group = get_all_child_investments(parent_investment, cost_center=True)

    return render(request, 'ledger_creation.html', {
        'datatable_columns': datatable_columns,
        'all_child_investments': all_child_investments,
        'all_cost_center_group': all_cost_center_group
    })


def get_all_child_investments(parent, cost_center=False):
    all_childs = []
    def traverse_children(investment, depth=0):
        child = 0
        if cost_center:
            children = investment.cost_center.all()
        else:
            children = investment.children.all()
        if children:
            for child in children:
                show = f"{'→'* depth} {child}"
                # show = f"{child}"
                all_childs.append(show)
                traverse_children(child, depth + 1)
    traverse_children(parent)
    return all_childs


# UNIT TESTING VIEW
def unit_test(request):
    datatable_columns = [0, 2, 3]
    return render(request, 'Unit-Test/unit_test.html', {'datatable_columns': datatable_columns})


# FOR GROUPS
def get_group_datatable(request, id=None):
    data = []
    group_data_obj = Childs.objects.all()
    if id:
        group_data_obj = Childs.objects.filter(id=id)
    def find_root_parent(child):
        if child.parent:
            return find_root_parent(child.parent)
        else:
            return child

    for child in group_data_obj:
        root_parent = find_root_parent(child)

        group_data = {
            'id': child.pk,
            'name': child.name,
            'parent': str(child.parent),
            'super_parent': root_parent.name
        }
        data.append(group_data)

    return JsonResponse({'groups': data})


# FOR COST CENTER
def get_cost_center_datatable(request, id=None):
    data = []
    cost_center_obj = CostCenter.objects.all()
    if id:
        cost_center_obj = CostCenter.objects.filter(id=id)
    for child in cost_center_obj:
        group_data = {
            'id': child.pk,
            'name': child.name,
            'parent': str(child.parent),
        }
        data.append(group_data)
    return JsonResponse({'groups': data})


def voucher_creation(request):
    datatable_columns = [0, 1]
    return render(request, 'voucher_creation_new.html', {'datatable_columns': datatable_columns})


def balance_sheet(request):
    datatable_columns = [0, 1]
    return render(request, 'balance_sheet.html', {'datatable_columns': datatable_columns})


def profit_and_loss(request):
    datatable_columns = [0, 1]
    return render(request, 'profit_and_loss.html', {'datatable_columns': datatable_columns})

