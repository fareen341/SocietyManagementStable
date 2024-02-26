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
router.register('home-loan', apiviews.FlatHomeLoanView, basename='home_loan')
router.register('flat-gst', apiviews.FlatGSTView, basename='flat_gst')
router.register('vehicle', apiviews.FlatMemberVehicleView, basename='vehicle')
router.register('househelp', apiviews.HouseHelpView, basename='househelp')
router.register('househelpallocation', apiviews.HouseHelpAllocationView, basename='househelpallocation')
router.register('tenant_creation', apiviews.TenantMasterView, basename='tenant_creation')
router.register('tenant_allocation', apiviews.TenantAllocationView, basename='tenant_allocation')
router.register('meetings', apiviews.MeetingsView, basename='meetings')
router.register('suggestion', apiviews.SuggestionsView, basename='suggestion')






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
    path('non-primary/<int:id>/', apiviews.hide_non_primary_member_checkbox, name='non-primary'),
    path('api/history/', apiviews.MemberView.as_view({'get': 'member_history_retrieve'}), name='history'),
    path('api/owner_name/<int:flat_id>/', apiviews.get_owner_name, name="owner_name"),
    path('last-object/', apiviews.get_last_object, name='last-object'),
    path('api/get-meeting-type-choices/', apiviews.get_meeting_type_choices, name='get_meeting_type_choices'),









]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
