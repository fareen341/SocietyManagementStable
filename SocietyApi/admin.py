from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(SocietyCreation)
admin.site.register(SocietyBank)
admin.site.register(SocietyOtherDocument)
admin.site.register(SocietyRegistrationDocument)
admin.site.register(WingFlat)
admin.site.register(WingFlatUnique)
admin.site.register(Members)
admin.site.register(Nominees)
admin.site.register(FlatShares)
admin.site.register(FlatMemberVehicle)
admin.site.register(FlatHomeLoan)
admin.site.register(FlatGST)
admin.site.register(HouseHelp)
admin.site.register(HouseHelpAllocationMaster)
admin.site.register(TenantMaster)
admin.site.register(TenantAllocation)
admin.site.register(Meetings)
admin.site.register(Attendance)
admin.site.register(Suggestion)
admin.site.register(FlatDetail)