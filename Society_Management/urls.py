"""Society_Management URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from SocietyApi import views as apiviews
from SocietyApp import views



# ROUTERS
router = DefaultRouter()
router.register('society-creation', apiviews.SocietyCreationView, basename='society-creation')
router.register('society_bank', apiviews.SocietyBankView, basename='society_bank')
router.register('society-registration-documents', apiviews.SocietyRegistrationDocumentView, basename='society-registration-documents')
router.register('society-other-docs', apiviews.SocietyOtherDocumentView, basename='society-other-docs')
router.register('wing-flat', apiviews.WingFlatView, basename='wing-flat')
router.register('wing', apiviews.UnitWingView, basename='WingView')
router.register('members', apiviews.MemberView, basename='members')
router.register('add-nominee', apiviews.AddNomineesView, basename='add_nominee')
router.register('shares', apiviews.FlatSharesView, basename='shares')
router.register('flat_detail', apiviews.FlatDetailView, basename='flat_detail')
router.register('flat_master_detail', apiviews.FlatDetailMasterView, basename='flat_master_detail')
router.register('home-loan', apiviews.FlatHomeLoanView, basename='home_loan')
router.register('flat-gst', apiviews.FlatGSTView, basename='flat_gst')
router.register('vehicle', apiviews.FlatMemberVehicleView, basename='vehicle')
router.register('househelp', apiviews.HouseHelpView, basename='househelp')
router.register('househelpallocation', apiviews.HouseHelpAllocationView, basename='househelpallocation')
router.register('tenant_creation', apiviews.TenantMasterView, basename='tenant_creation')
router.register('tenant_allocation', apiviews.TenantAllocationView, basename='tenant_allocation')
router.register('meetings', apiviews.MeetingsView, basename='meetings')
router.register('suggestion', apiviews.SuggestionsView, basename='suggestion')
router.register('attendance', apiviews.SaveAttendanceView, basename='attendance')
router.register('suggestions', apiviews.SuggestionView, basename='suggestions')
router.register('leadger_group_creation', apiviews.CreateGroupForLedgerView, basename='leadger_group_creation')
router.register('ledger_creation', apiviews.LedgerView, basename='ledger_creation')
router.register('cost_center', apiviews.CostCenterView, basename='cost_center')
router.register('voucher_type', apiviews.VoucherTypeView, basename='voucher_type')
router.register('voucher_indexing', apiviews.VoucherIndexingView, basename='voucher_indexing')
router.register('unit_test_api', apiviews.UnitTestView, basename='unit_test_api')
router.register('purchase_voucher_creation', apiviews.PurchaseVoucherView, basename='purchase_voucher_creation')



# URLS
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include(router.urls)),
    path('create-society/', views.create_society, name="create_society"),
    path('society-details/', views.society_detail, name="society_details"),
    path('members-detail/', views.member_details, name="member_details"),
    path('create-member/', views.create_member, name="create_member"),
    path('create-house-help/', views.create_house_help, name='create_house_help'),
    path('allocate-house-help/', views.allocate_house_help, name='allocate_house_help'),
    path('create-tenant/', views.create_tenant, name='create_tenant'),
    path('allocate-tenant/', views.allocate_tenant, name='allocate_tenant'),
    path('meetings/', views.meetings_view, name="meetings"),
    path('extra/', views.extra, name='extra'),
    path('unit-master/', views.unit_master, name='unit_master'),
    path('ledger-creation/', views.ledger_creation, name='ledger_creation'),
    path('group_data', views.get_group_datatable, name='group_data'),
    path('group_data/<int:id>/', views.get_group_datatable, name='group_data_retrive'),
    path('cost_center_data', views.get_cost_center_datatable, name='cost_center_data'),
    path('cost_center_data/<int:id>/', views.get_cost_center_datatable, name='cost_center_data_retrive'),

    path('voucher_creation', views.voucher_creation, name='voucher_creation'),


    # UNIT TEST
    path('unit_test', views.unit_test, name='unit_test'),
    path('api/get_bug_type/', apiviews.UnitTestView.as_view({'get': 'get_bug_type_dropdown'}), name='get_bug_type'),
    path('api/bug_status/', apiviews.UnitTestView.as_view({'get': 'get_test_status_dropdown'}), name='bug_status'),
    path('api/review/', apiviews.UnitTestView.as_view({'get': 'get_review_dropdown'}), name='review'),
    path('api/get_voucher_index/<int:voucher_type_id>/', apiviews.VoucherIndexingView.as_view({'get': 'get_voucher_indexing'}), name='get_voucher_index'),
    path('api/get_voucher_number/<int:voucher_type_id>/', apiviews.VoucherIndexingView.as_view({'get': 'get_voucher_number'}), name='get_voucher_number'),


    # REGISTERS
    path('nominee-register/', views.nominee_register_view, name='nominee_register_view'),
    path('vehicle-register/', views.vehicle_register, name='vehicle_register'),
    path('hypotication-register/', views.hypotication_register, name='hypotication_register'),
    path('unit-register/', views.unit_register, name='unit_register'),
    path('form-I/', views.form_i_view, name='form_i_view'),
    path('form-J/', views.form_j_view, name='form_j_view'),
    path('form-I-MH/<int:pk>/', views.form_i_MH_view, name='form_i_MH_view/<int:pk>/'),

    path('non-primary/<int:id>/', apiviews.hide_non_primary_member_checkbox, name='non-primary'),
    path('api/history/', apiviews.MemberView.as_view({'get': 'member_history_retrieve'}), name='history'),
    path('api/owner_name/<int:flat_id>/', apiviews.get_owner_name, name="owner_name"),
    path('last-object/', apiviews.get_last_object, name='last-object'),
    path('api/get-meeting-type-choices/', apiviews.get_meeting_type_choices, name='get_meeting_type_choices'),
    path('api/get_flat_with_members/', apiviews.get_flat_with_members, name='get_flat_with_members'),
    path('api/get_nominees_details/', apiviews.get_nominees_details, name='get_nominees_details'),
    path('api/current_user/', apiviews.get_current_logged_in_user, name='current_user'),
    path('api/get_previous_suggestions/<int:meeting_id>/', apiviews.get_previous_suggestions, name='get_previous_suggestions'),

    path('api/get_flats_status/', apiviews.FlatDetailView.as_view({'get': 'get_flat_status_dropdown'}), name='get_flats_status'),

    path('api/ledger_group/<str:group_name>/', apiviews.CreateGroupForLedgerView.as_view({'get': 'select_ledger_group'}), name='ledger_group'),
    path('api/get_all_cost_centers/', apiviews.CostCenterView.as_view({'get': 'select_cost_center'}), name='get_all_cost_centers'),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
