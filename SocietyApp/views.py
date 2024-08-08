from django.shortcuts import render
from  SocietyApi.models import *
from SocietyApi.serializers import *
from .models import *
from django.http import HttpResponse, JsonResponse
from collections import defaultdict


# Create your views here.

def create_society(request):
    datatable_columns = [0, 2, 3]
    return render(request,'society_creation.html', {'datatable_columns': datatable_columns})


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
    datatable_columns = [0, 2]
    # GROUPS LIST VIEW
    under_grps = ["Assets", "Liabilities", "Income", "Expenses", "Bank"]    # Give these in signals as constants
    all_child_investments = {}
    for under_grp in under_grps:
        parent_investment = Childs.objects.get(name=under_grp)
        all_child_investments[under_grp] = get_all_child_investments(parent_investment)

    # COST CENTER LIST VIEW
    parent_investment = CostCenter.objects.get(name="Primary")
    all_cost_center_group = get_all_child_investments(parent_investment, cost_center=True)

    return render(request, 'ledger_creation.html', {
        'datatable_columns': datatable_columns,
        'all_child_investments': all_child_investments,
        'all_cost_center_group': all_cost_center_group
    })


def get_all_child_investments(parent, cost_center=False, balance_sheet=False):
    all_childs = []
    balance_sheet_childs = []
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
                if balance_sheet:
                    balance_sheet_childs.append(child)
                else:
                    all_childs.append(show)
                traverse_children(child, depth + 1)
    traverse_children(parent)
    if balance_sheet:
        return balance_sheet_childs
    return all_childs



def calling_balance_sheet(request):
    filter_zero_param = request.GET.get('filter_zero', None)
    from_date_param = request.GET.get('from_date', None)
    to_date_param = request.GET.get('to_date', None)
    type_param = request.GET.get('type', None)
    type_list = type_param.split(',')
    previous_from_date = request.GET.get('previous_from_date', None)
    previous_to_date = request.GET.get('previous_to_date', None)
    print("Type is========================>", type_list)

    assets_response = []
    liabilities_response = []
    groups = type_list
    for grp in groups:
        function_call, current_total, previous_total = balance_sheet_groups(
            Childs.objects.get(name=grp), filter_zero_param,
            from_date_param, to_date_param,
            previous_from_date, previous_to_date
        )
        if grp == type_list[0]:
            print(f"current total: {current_total}, previous_total: {previous_total}]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]")
            asset_current_total = current_total
            asset_previous_total = previous_total
            assets_response.append(function_call)
        else:
            liabilities_current_total = current_total
            liabilities_previous_total = previous_total
            liabilities_response.append(function_call)

    return JsonResponse({
        'assets_response': assets_response,
        'libility_response': liabilities_response,
        'asset_current_total': asset_current_total,
        'asset_previous_total': asset_previous_total,
        'liabilities_current_total': liabilities_current_total,
        'liabilities_previous_total': liabilities_previous_total
    })


import datetime
from datetime import datetime as dt
from dateutil.relativedelta import relativedelta
from SocietyApp.signals import constant_groups

def balance_sheet_groups(parent, filter_zero, from_date, to_date, previous_from_date, previous_to_date):
    def traverse_children(investment):
        def helper(node):
            ledgers_dict = {}
            children_dict = {}
            total_balance = 0
            previous_total_balance = 0

            today = dt.today().date()
            current_year = today.year

            if today.month < 4:
                start_date = dt.strptime(f"01-04-{current_year - 1}", "%d-%m-%Y").date()
                end_date = dt.strptime(f"31-03-{current_year}", "%d-%m-%Y").date()
            else:
                start_date = dt.strptime(f"01-04-{current_year}", "%d-%m-%Y").date()
                end_date = dt.strptime(f"31-03-{current_year + 1}", "%d-%m-%Y").date()

            current_start_date = start_date - relativedelta(years=1)
            current_end_date = end_date - relativedelta(years=1)
            previous_start_date = start_date - relativedelta(years=2)
            previous_end_date = end_date - relativedelta(years=2)

            current_query = GeneralLedger.objects.filter(
                from_ledger__group_name=node.name,
                # date__range=(current_start_date, current_end_date)
            )

            previous_query = GeneralLedger.objects.filter(
                from_ledger__group_name=node.name,
                date__range=(previous_start_date, previous_end_date)
            )

            if from_date and to_date:
                print("current dates are.................", from_date, to_date)
                current_query = current_query.filter(date__range=(from_date, to_date))
                # previous_query = previous_query.filter(date__range=(from_date, to_date))

            if previous_from_date and previous_to_date:
                print("previous dates are.................", previous_from_date, previous_to_date)
                previous_query = previous_query.filter(date__range=(previous_from_date, previous_to_date))

            current_date_subquery = current_query.values('from_ledger__ledger_name').annotate(max_id=Max('id')).values('max_id')
            previous_date_subquery = previous_query.values('from_ledger__ledger_name').annotate(max_id=Max('id')).values('max_id')

            gl_objs = GeneralLedger.objects.filter(id__in=Subquery(current_date_subquery))
            previous_gl_objs = GeneralLedger.objects.filter(id__in=Subquery(previous_date_subquery))

            for gl_obj in gl_objs.values('from_ledger__ledger_name', 'balance'):
                ledger_name = gl_obj['from_ledger__ledger_name']
                balance = gl_obj['balance']
                ledgers_dict[ledger_name] = balance
                total_balance += balance

            for prev_gl_obj in previous_gl_objs.values('from_ledger__ledger_name', 'balance'):
                previous_total_balance += prev_gl_obj['balance']

            children = node.cost_center.all() if hasattr(node, 'cost_center') else node.children.all()

            child_totals = {'current': 0, 'previous': 0}
            for child in children:
                child_result, child_total, child_previous_total = helper(child)
                if filter_zero == 'all' or (filter_zero == 'zero' and (child_total !=0 and child_previous_total !=0 )):
                    children_dict[child.name] = child_result
                    total_balance += child_total
                    previous_total_balance += child_previous_total
                    child_totals['current'] += child_total
                    child_totals['previous'] += child_previous_total

            result_dict = {}
            if ledgers_dict:
                result_dict['ledgers'] = ledgers_dict
            if children_dict:
                result_dict.update(children_dict)
            result_dict['final_total'] = total_balance
            result_dict['previous_final_total'] = previous_total_balance

            # Add parent_group flag if node name matches specific values
            if node.name in constant_groups:
                result_dict['parent_group'] = True

            return result_dict, total_balance, previous_total_balance

        final_result, total_balance, previous_total_balance = helper(investment)

        return final_result, total_balance, previous_total_balance

    nested_dict, total_balance, previous_total_balance = traverse_children(parent)
    # Return the overall totals
    return nested_dict, total_balance, previous_total_balance


# bkp code:
# def balance_sheet_groups(parent, filter_zero, from_date, to_date):
#     def traverse_children(investment):
#         Total = 0  # Initialize overall total

#         def helper(node):
#             nonlocal Total
#             ledgers_dict = {}
#             children_dict = {}
#             total_balance = 0

#             today = dt.today().date()
#             current_year = today.year

#             if today.month < 4:
#                 start_date = dt.strptime(f"01-04-{current_year - 1}", "%d-%m-%Y").date()
#                 end_date = dt.strptime(f"31-03-{current_year}", "%d-%m-%Y").date()
#             else:
#                 start_date = dt.strptime(f"01-04-{current_year}", "%d-%m-%Y").date()
#                 end_date = dt.strptime(f"31-03-{current_year + 1}", "%d-%m-%Y").date()

#             current_start_date = start_date - relativedelta(years=1)
#             current_end_date = end_date - relativedelta(years=1)
#             previous_start_date = start_date - relativedelta(years=2)
#             previous_end_date = end_date - relativedelta(years=2)

#             print(f"For current year: 2023 - 2024 =========={current_start_date}-{current_end_date}")
#             print(f"For previous year: 2022 - 2023 =========={previous_start_date}-{previous_end_date}")

#             # current_date_subquery = GeneralLedger.objects.filter(from_ledger__group_name=node.name).values('from_ledger__ledger_name').annotate(max_id=Max('id')).values('max_id')
#             current_date_subquery = GeneralLedger.objects.filter(from_ledger__group_name=node.name, date__range=(current_start_date, current_end_date)).values('from_ledger__ledger_name').annotate(max_id=Max('id')).values('max_id')
#             previous_date_subquery = GeneralLedger.objects.filter(from_ledger__group_name=node.name, date__range=(previous_start_date, previous_end_date)).values('from_ledger__ledger_name').annotate(max_id=Max('id')).values('max_id')
#             # For Previous Year Use:

#             gl_objs = GeneralLedger.objects.filter(id__in=Subquery(current_date_subquery))

#             if from_date and to_date:
#                 gl_objs = gl_objs.filter(date__range=(from_date, to_date))

#             for gl_obj in gl_objs.values('from_ledger__ledger_name', 'balance'):
#                 ledger_name = gl_obj['from_ledger__ledger_name']
#                 balance = gl_obj['balance']
#                 ledgers_dict[ledger_name] = balance
#                 total_balance += balance

#             children = node.cost_center.all() if hasattr(node, 'cost_center') else node.children.all()

#             for child in children:
#                 child_result, child_total = helper(child)
#                 if filter_zero == 'all' or (filter_zero == 'zero' and child_total > 0):
#                     children_dict[child.name] = child_result
#                     total_balance += child_total

#             result_dict = {}
#             if ledgers_dict:
#                 result_dict['ledgers'] = ledgers_dict
#             if children_dict:
#                 result_dict.update(children_dict)
#             result_dict['final_total'] = total_balance

#             return result_dict, total_balance

#         final_result, Total = helper(investment)
#         final_result['Total'] = Total
#         return final_result

#     nested_dict = traverse_children(parent)
#     return nested_dict


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


from django.core.exceptions import ObjectDoesNotExist


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
    datatable_columns = [0, 2, 3, 4, 5]
    return render(request, 'voucher_creation_new.html', {'datatable_columns': datatable_columns})


def balance_sheet(request):
    datatable_columns = [0, 1]

    # GROUPS OF LIALIBILITIES.
    # group0 = Ledger.objects.filter(group_name="Share Capital")
    # group0 = defaultdict(list)
    # all_cost_center_group = get_all_child_investments(Childs.objects.get(name="Share Capital"), cost_center=False, balance_sheet=True)
    # all_cost_center_group.append("Share Capital")
    # filtered_ledgers = Ledger.objects.filter(group_name__in=all_cost_center_group)
    # for ledger in filtered_ledgers:
    #     group0[ledger.group_name].append(ledger.ledger_name)
    # group0 = dict(group0)


    # # group1 = Ledger.objects.filter(group_name="Subscription Towards Shares")
    # group1 = defaultdict(list)
    # all_cost_center_group = get_all_child_investments(Childs.objects.get(name="Subscription Towards Shares"), cost_center=False, balance_sheet=True)
    # all_cost_center_group.append("Subscription Towards Shares")
    # filtered_ledgers = Ledger.objects.filter(group_name__in=all_cost_center_group)
    # for ledger in filtered_ledgers:
    #     group1[ledger.group_name].append(ledger.ledger_name)
    # group1 = dict(group1)

    # # group2 = Ledger.objects.filter(group_name="Reserve Fund And Other Funds")
    # group2 = defaultdict(list)
    # all_cost_center_group = get_all_child_investments(Childs.objects.get(name="Reserve Fund And Other Funds"), cost_center=False, balance_sheet=True)
    # all_cost_center_group.append("Reserve Fund And Other Funds")
    # filtered_ledgers = Ledger.objects.filter(group_name__in=all_cost_center_group)
    # for ledger in filtered_ledgers:
    #     group2[ledger.group_name].append(ledger.ledger_name)
    # group2 = dict(group2)

    # # group3 = Ledger.objects.filter(group_name="Secured Loans")
    # group3 = defaultdict(list)
    # all_cost_center_group = get_all_child_investments(Childs.objects.get(name="Secured Loans"), cost_center=False, balance_sheet=True)
    # all_cost_center_group.append("Secured Loans")
    # filtered_ledgers = Ledger.objects.filter(group_name__in=all_cost_center_group)
    # for ledger in filtered_ledgers:
    #     group3[ledger.group_name].append(ledger.ledger_name)
    # group3 = dict(group3)

    # # group4 = Ledger.objects.filter(group_name="Unsecured Loans")
    # group4 = defaultdict(list)
    # all_cost_center_group = get_all_child_investments(Childs.objects.get(name="Unsecured Loans"), cost_center=False, balance_sheet=True)
    # all_cost_center_group.append("Unsecured Loans")
    # filtered_ledgers = Ledger.objects.filter(group_name__in=all_cost_center_group)
    # for ledger in filtered_ledgers:
    #     group4[ledger.group_name].append(ledger.ledger_name)
    # group4 = dict(group4)

    # # group5 = Ledger.objects.filter(group_name="Deposits")
    # group5 = defaultdict(list)
    # all_cost_center_group = get_all_child_investments(Childs.objects.get(name="Deposits"), cost_center=False, balance_sheet=True)
    # all_cost_center_group.append("Deposits")
    # filtered_ledgers = Ledger.objects.filter(group_name__in=all_cost_center_group)
    # for ledger in filtered_ledgers:
    #     group5[ledger.group_name].append(ledger.ledger_name)
    # group5 = dict(group5)

    # # group6 = Ledger.objects.filter(group_name="Current Liabilities And Provisions")
    # group6 = defaultdict(list)
    # all_cost_center_group = get_all_child_investments(Childs.objects.get(name="Current Liabilities And Provisions"), cost_center=False, balance_sheet=True)
    # # print("all grops print===>", all_cost_center_group)
    # abcd = []
    # for i in all_cost_center_group:
    #     if isinstance(i, str):
    #         abcd.append(i)  # Append the string directly
    #     elif hasattr(i, 'name'):  # Assuming 'name' is an attribute you want to access
    #         abcd.append(i.name)  # Append the attribute value if it exists
    #     else:
    #         abcd.append(str(i))  # Fallback to string representation if needed

    # all_cost_center_group.append("Current Liabilities And Provisions")
    # filtered_ledgers = Ledger.objects.filter(group_name__in=all_cost_center_group)
    # # print("all grops print===>3", filtered_ledgers)
    # for ledger in filtered_ledgers:
    #     group6[ledger.group_name].append(ledger.ledger_name)
    # group6 = dict(group6)
    # # print("group 5 is----->", group6)



    # # group7 = Ledger.objects.filter(group_name="Interest Accrued Due But Not Paid")
    # group7 = defaultdict(list)
    # all_cost_center_group = get_all_child_investments(Childs.objects.get(name="Interest Accrued Due But Not Paid"), cost_center=False, balance_sheet=True)
    # all_cost_center_group.append("Interest Accrued Due But Not Paid")
    # filtered_ledgers = Ledger.objects.filter(group_name__in=all_cost_center_group)
    # for ledger in filtered_ledgers:
    #     group7[ledger.group_name].append(ledger.ledger_name)
    # group7 = dict(group7)


    # # GROUPS OF ASSETS
    # # group8 = Ledger.objects.filter(group_name="Fixed Assets")
    # group8 = defaultdict(list)
    # all_cost_center_group = get_all_child_investments(Childs.objects.get(name="Fixed Assets"), cost_center=False, balance_sheet=True)
    # all_cost_center_group.append("Fixed Assets")
    # filtered_ledgers = Ledger.objects.filter(group_name__in=all_cost_center_group)
    # # print("All groups are======>",filtered_ledgers)
    # for ledger in filtered_ledgers:
    #     group8[ledger.group_name].append(ledger.ledger_name)
    # group8 = dict(group8)

    # # group9 = Ledger.objects.filter(group_name="Investment")
    # group9 = defaultdict(list)
    # all_cost_center_group = get_all_child_investments(Childs.objects.get(name="Investment"), cost_center=False, balance_sheet=True)
    # all_cost_center_group.append("Investment")
    # filtered_ledgers = Ledger.objects.filter(group_name__in=all_cost_center_group)
    # for ledger in filtered_ledgers:
    #     group9[ledger.group_name].append(ledger.ledger_name)
    # group9 = dict(group9)

    # # group10 = Ledger.objects.filter(group_name="Cash And Bank Balances")
    # group10 = defaultdict(list)
    # all_cost_center_group = get_all_child_investments(Childs.objects.get(name="Cash And Bank Balances"), cost_center=False, balance_sheet=True)
    # all_cost_center_group.append("Cash And Bank Balances")
    # filtered_ledgers = Ledger.objects.filter(group_name__in=all_cost_center_group)
    # for ledger in filtered_ledgers:
    #     group10[ledger.group_name].append(ledger.ledger_name)
    # group10 = dict(group10)

    # # group11 = Ledger.objects.filter(group_name="Loans And Advances")
    # group11 = defaultdict(list)
    # all_cost_center_group = get_all_child_investments(Childs.objects.get(name="Loans And Advances"), cost_center=False, balance_sheet=True)
    # all_cost_center_group.append("Loans And Advances")
    # filtered_ledgers = Ledger.objects.filter(group_name__in=all_cost_center_group)
    # for ledger in filtered_ledgers:
    #     group11[ledger.group_name].append(ledger.ledger_name)
    # group11 = dict(group11)



    # # group13 = Ledger.objects.filter(group_name="Profit And Loss Account")
    # group13 = defaultdict(list)
    # all_cost_center_group = get_all_child_investments(Childs.objects.get(name="Profit And Loss Account"), cost_center=False, balance_sheet=True)
    # all_cost_center_group.append("Profit And Loss Account")
    # filtered_ledgers = Ledger.objects.filter(group_name__in=all_cost_center_group)
    # for ledger in filtered_ledgers:
    #     group13[ledger.group_name].append(ledger.ledger_name)
    # group13 = dict(group13)


    # # group12 = Ledger.objects.filter(group_name="Current Assets")
    # group12 = defaultdict(list)
    # all_cost_center_group = get_all_child_investments(Childs.objects.get(name="Current Assest"), cost_center=False, balance_sheet=True)
    # # print("all grou[s*********************************************]", all_cost_center_group)
    # # print("can be fixed from here, to be continue...........................")
    # all_cost_center_group.insert(0, "Current Assest")
    # final_all_cost_center_group = all_cost_center_group
    # filtered_ledgers = Ledger.objects.filter(group_name__in=all_cost_center_group).order_by('ledger_name')
    # for ledger in filtered_ledgers:
    #     group12[ledger.group_name].append(ledger.ledger_name)
    # group12 = dict(group12)
    # # print("gtoup 12 printing-------", group12)

    # unique_latest_ids = (
    #     GeneralLedger.objects.all()
    #     .values('from_ledger')
    #     .annotate(max_id=Max('id'))
    #     .values_list('max_id', flat=True)
    # )

    # unique_latest_entries = GeneralLedger.objects.filter(id__in=unique_latest_ids).values("from_ledger__ledger_name", 'balance', 'date')

    # total_balance = 0
    # final_break_amt = {}
    # for group, items in group12.items():
    #     break_balance = 0
    #     for item in items:
    #         for amt in unique_latest_entries:
    #             if amt['from_ledger__ledger_name'] == item:
    #                 total_balance += amt['balance']
    #                 break_balance += amt['balance']
    #                 final_break_amt.update({group: break_balance})
    #                 # print(f"total amt is====> {total_balance} break_balance: {break_balance}")
    # # print(f"---------------------final: {final_break_amt}--------------------------")
    # # print(f"-------------------------total: {total_balance}")

    # # print(" FINAL GRP", final_all_cost_center_group)
    # for led in final_break_amt:
    #     # print("led is====", final_break_amt[led])
    #     for grp in final_all_cost_center_group:
    #         # print(f"LED IS: {led}, GRP IS: {grp}, AMT IS: {final_break_amt[led]}")
    #         if str(led) == str(grp):
    #             break
    #     # print("===============================END=====================================")

    # grps = [
    #     {'Current Assest': 400},
    #     {'→ Sundry Debtors': 500},
    #     {'→→ Vikas': 400},
    #     {'→→→ Vikas 1': 400},
    #     {'→→→→ Vikas 2': 0},
    #     {'→→→→→ Misc Assets': 400},
    #     {'→ Input Sgst': 400},
    #     {'→ Gst Input': 0},
    #     {'→ Tax': 400},
    #     {'→→ Gst': 400},
    #     {'→→→ Payable Tax': 400},
    #     {'→→→→ Input Cgst': 400},
    # ]

    return render(request, 'balance_sheet.html', {
        'datatable_columns': datatable_columns,
        # 'group0': group0,
        # 'group1': group1,
        # 'group2': group2,
        # 'group3': group3,
        # 'group4': group4,
        # 'group5': group5,
        # 'group6': group6,
        # 'group7': group7,
        # 'group8': group8,
        # 'group9': group9,
        # 'group10': group10,
        # 'group11': group11,
        # 'group12': group12,
        # 'group13': group13,
        # 'unique_latest_entries': unique_latest_entries,
        # 'abcd': abcd,
        # 'grps': grps,
    })


def profit_and_loss(request):
    from_date = request.GET.get('from_date')
    to_date = request.GET.get('to_date')

    print(f"from date: {from_date}, to date: {to_date}")

    datatable_columns = [0, 1]
    # INCOME
    income_groups = get_all_child_investments(Childs.objects.get(name="Income"), cost_center=False, balance_sheet=True)
    income_groups.append("Income")
    incomes = Ledger.objects.filter(group_name__in=income_groups).annotate(
        priority=Case(
            When(ledger_name='Sales', then=0),  # Highest priority for 'Purchases'
            default=1,                              # Lower priority for other items
            output_field=IntegerField()
        )
    ).order_by('priority', 'ledger_name')  # Order by priority first, then by group_name

    unique_latest_ids = (
        GeneralLedger.objects.all()
        .values('from_ledger')
        .annotate(max_id=Max('id'))
        .values_list('max_id', flat=True)
    )

    unique_latest_entries = GeneralLedger.objects.filter(id__in=unique_latest_ids).values("from_ledger__ledger_name", 'balance', 'date')
    if from_date and to_date:
        unique_latest_entries = GeneralLedger.objects.filter(
            # id__in=unique_latest_ids,
            date__range=[from_date, to_date]
        ).values("from_ledger__ledger_name", 'balance', 'date')

    # EXPENSE
    expense_groups = get_all_child_investments(Childs.objects.get(name="Expenses"), cost_center=False, balance_sheet=True)
    expense_groups.append("Expenses")
    expense = Ledger.objects.filter(group_name__in=expense_groups).annotate(
        priority=Case(
            When(ledger_name='Purchases', then=0),  # Highest priority for 'Purchases'
            default=1,                              # Lower priority for other items
            output_field=IntegerField()
        )
    ).order_by('priority', 'ledger_name')  # Order by priority first, then by group_name

    return render(request, 'profit_and_loss.html', {
        'datatable_columns': datatable_columns,
        'incomes': incomes, 'expense': expense,
        'unique_latest_entries': unique_latest_entries,
    })


def general_ledger(request):
    datatable_columns = [1, 2, 3, 4, 5, 6, 7]
    return render(request, 'general_ledger.html', {'datatable_columns': datatable_columns})


def dashboard_admin(request):
    datatable_columns = [0, 1]
    return render(request, 'admin_dashboard.html', {'datatable_columns': datatable_columns})


def dashboard_member(request):
    datatable_columns = [0, 1]
    return render(request, 'member_dashboard.html', {'datatable_columns': datatable_columns})


def visiting_cards(request):
    datatable_columns = [1]
    return render(request, 'visiting_cards.html', {'datatable_columns': datatable_columns})


def society_accounts(request):
    datatable_columns = [1]
    return render(request, 'society_accounts.html', {'datatable_columns': datatable_columns})


def society_accounts_table(request):
    datatable_columns = [1]
    return render(request, 'society_accounts_table.html', {'datatable_columns': datatable_columns})


def get_society_bill_data(request):
    fixed_ledgers = Ledger.objects.filter(nature='Fixed').values_list('ledger_name', flat=True)
    variable_ledgers = Ledger.objects.filter(nature='Variable').values_list('ledger_name', flat=True)
    complete_bill_details = []

    bill_details = Members.objects.filter(
        member_is_primary=True,
        date_of_cessation__isnull=True
    ).select_related('wingflatunique', 'flats').values('wing_flat__wing_flat_unique', 'member_name', 'wing_flat__flats__unit_area').order_by('wing_flat__wing_flat_unique')

    print("members =================>", bill_details.values('member_name'))

    # There is no possibility that the general ledger object does not found, so use below code when member name ledger got created
    # for detail in bill_details:
    #     try:
    #         gl_obj = GeneralLedger.objects.get(from_ledger=detail['members__member_name']).balance
    #         final_dict = {
    #             'wing_flat_unique': detail['wing_flat_unique'],
    #             'member_name': detail['members__member_name'],
    #             'unit_area': detail['flats__unit_area'],
    #             'balance': gl_obj,
    #         }
    #         complete_bill_details.append(final_dict)
    #     except GeneralLedger.DoesNotExist:
    #         pass

    new_gl_obj = 0
    for detail in bill_details:
        gl_obj = GeneralLedger.objects.filter(from_ledger__ledger_name=detail['member_name']).order_by('id').last()
        if gl_obj:
            new_gl_obj = gl_obj.balance
        print("gl objects -----------", new_gl_obj)
        final_dict = {
            'wing_flat_unique': detail['wing_flat__wing_flat_unique'],
            'member_name': detail['member_name'],
            'unit_area': detail['wing_flat__flats__unit_area'],
            'opening_balance': new_gl_obj,
        }
        complete_bill_details.append(final_dict)

    print("final dict is=========", complete_bill_details)
    return JsonResponse({"complete_bill_details": complete_bill_details, 'fixed_ledgers': list(fixed_ledgers), 'variable_ledgers': list(variable_ledgers)})
