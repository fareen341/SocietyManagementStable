from django.contrib import admin
from .models import *


class GeneralLedgerAdmin(admin.ModelAdmin):
    list_display = [field.name for field in GeneralLedger._meta.get_fields()]



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
admin.site.register(VoucherType)
admin.site.register(VoucherIndexing)
admin.site.register(Ledger)
admin.site.register(UnitTest)
admin.site.register(PurchaseVoucherModel)
admin.site.register(ShareOnLedgerModel)
admin.site.register(VoucherCreationModel)
admin.site.register(RelatedLedgersModel)
admin.site.register(RelatedSharesModel)
admin.site.register(AgainstRefrenceModel)
admin.site.register(CostCenterOnLedger)
admin.site.register(GeneralLedger, GeneralLedgerAdmin)

