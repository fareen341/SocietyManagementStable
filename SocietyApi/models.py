from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField



# Create your models here.
class SocietyCreation(models.Model):
    society_name = models.CharField(max_length=200)
    admin_email = models.EmailField()
    alternate_email = models.EmailField(null=True, blank=True)
    admin_mobile_number = models.CharField(max_length=20, )
    alternate_mobile_number = models.CharField(max_length=10, null=True, blank=True)
    registration_number = models.CharField(max_length=200)
    registration_doc = models.FileField(upload_to='files/')
    pan_number = models.CharField(max_length=200)
    pan_number_doc = models.FileField(upload_to='files/')
    gst_number = models.CharField(max_length=200)
    gst_number_doc = models.FileField(upload_to='files/')
    interest = models.CharField(max_length=100)
    society_reg_address = models.TextField()
    society_city = models.CharField(max_length=100)
    socity_state = models.CharField(max_length=100)
    pin_code = models.CharField(max_length=100)
    society_corr_reg_address = models.TextField(null=True, blank=True)
    society_corr_city = models.CharField(max_length=100, null=True, blank=True)
    socity_corr_state = models.CharField(max_length=100, null=True, blank=True)
    pin_corr_code = models.CharField(max_length=100, null=True, blank=True)


class SocietyBank(models.Model):
    society_creation = models.ForeignKey(SocietyCreation, on_delete=models.CASCADE)
    beneficiary_name = models.CharField(max_length=100)
    beneficiary_code = models.CharField(max_length=100)
    beneficiary_acc_number = models.CharField(max_length=100)
    beneficiary_bank = models.CharField(max_length=100)
    is_primary = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.society_creation_id:
            # If society_creation is not set, get the last SocietyCreation object
            last_society_creation = SocietyCreation.objects.first()
            if last_society_creation:
                self.society_creation = last_society_creation
        super().save(*args, **kwargs)


class SocietyOtherDocument(models.Model):
    society_creation = models.ForeignKey(SocietyCreation, on_delete=models.CASCADE)
    other_document = models.FileField(upload_to='files/')
    other_document_specification = models.CharField(max_length=100)

    def save(self, *args, **kwargs):
        if not self.society_creation_id:
            last_society_creation = SocietyCreation.objects.first()
            if last_society_creation:
                self.society_creation = last_society_creation
        super().save(*args, **kwargs)


class SocietyRegistrationDocument(models.Model):
    society_creation = models.OneToOneField(SocietyCreation, on_delete=models.CASCADE)
    completion_cert = models.FileField(upload_to='files/')
    occupancy_cert = models.FileField(upload_to='files/')
    deed_of_conveyance = models.FileField(upload_to='files/')
    society_by_law = models.FileField(upload_to='files/')
    soc_other_document = models.FileField(upload_to='files/', null=True, blank=True)
    soc_other_document_spec = models.CharField(max_length=100, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.society_creation_id:
            last_society_creation = SocietyCreation.objects.first()
            if last_society_creation:
                self.society_creation = last_society_creation
        super().save(*args, **kwargs)


class WingFlat(models.Model):
    wing_name = models.CharField(max_length=50)
    flat_number = models.CharField(max_length=50)

    def __str__(self):
        return self.wing_name


class WingFlatUnique(models.Model):
    wing = models.ForeignKey(WingFlat, on_delete=models.CASCADE)
    wing_flat_unique = models.CharField(max_length=300)

    def __str__(self):
        return self.wing_flat_unique


class Members(models.Model):
    wing_flat = models.ForeignKey(WingFlatUnique, on_delete=models.CASCADE, verbose_name="Flat No.")
    member_name = models.CharField(max_length=200)
    ownership_percent = models.IntegerField()
    member_position = models.CharField(max_length=200)
    member_dob = models.DateField()
    member_pan_no = models.CharField(max_length=200)
    member_aadhar_no = models.CharField(max_length=200)
    member_address = models.CharField(max_length=200)
    member_state = models.CharField(max_length=200)
    member_pin_code = models.CharField(max_length=200)
    member_email = models.EmailField()
    member_contact = models.CharField(max_length=200)
    member_emergency_contact = models.CharField(max_length=200, null=True, blank=True)
    member_occupation = models.CharField(max_length=200)
    member_is_primary = models.BooleanField(default = False, null=True, blank=True)
    date_of_admission = models.DateField()
    age_at_date_of_admission = models.IntegerField(null=True, blank=True)
    sales_agreement = models.FileField(upload_to='files/')
    other_attachment = models.FileField(upload_to='files/', null=True, blank=True)
    date_of_entrance_fees = models.DateField()
    date_of_cessation = models.DateField(null=True, blank=True)
    reason_for_cessation = models.CharField(max_length=200, null=True, blank=True)
    flat_status = models.CharField(max_length=200, null=True, blank=True)
    same_flat_member_identification = models.CharField(max_length=100, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.pk and self.member_is_primary == True:
            # Only update the field if the instance is being saved for the first time
            super(Members, self).save(*args, **kwargs)
            self.same_flat_member_identification = f"{self.wing_flat.wing_flat_unique}MEM{self.pk}"
            self.save(update_fields=['same_flat_member_identification'])
        else:
            super(Members, self).save(*args, **kwargs)


    def __str__(self):
        return self.member_name


class Nominees(models.Model):
    member_name = models.ForeignKey(Members, on_delete=models.CASCADE, related_name='nominees')
    nominee_name = models.CharField(max_length=300)
    date_of_nomination = models.DateField()
    relation_with_nominee = models.CharField(max_length=300)
    nominee_sharein_percent = models.IntegerField()
    nominee_dob = models.DateField()
    nominee_aadhar_no = models.CharField(max_length=300)
    nominee_pan_no = models.CharField(max_length=300)
    nominee_email = models.EmailField()
    nominee_address = models.CharField(max_length=300)
    nominee_state = models.CharField(max_length=300)
    nominee_pin_code = models.CharField(max_length=300)
    nominee_contact = models.CharField(max_length=300)
    nominee_emergency_contact = models.CharField(max_length=300, null=True, blank=True)

    def __str__(self):
        return self.nominee_name


class FlatShares(models.Model):
    unique_member_shares = models.ForeignKey(Members, on_delete=models.CASCADE, null=True, blank=True)
    wing_flat = models.ForeignKey(WingFlatUnique, on_delete=models.CASCADE)
    folio_number = models.CharField(max_length=300)
    shares_date = models.DateField()
    application_number = models.CharField(max_length=300)
    shares_certificate = models.CharField(max_length=300)
    allotment_number = models.CharField(max_length=300)
    shares_from = models.CharField(max_length=300)
    shares_to = models.CharField(max_length=300)
    shares_transfer_date = models.DateField()
    total_amount_received = models.IntegerField()
    total_amount_date = models.DateField()
    transfer_from_folio_no = models.CharField(max_length=300)
    transfer_to_folio_no = models.CharField(max_length=300)
    date_of_cessation = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.wing_flat.wing_flat_unique


class FlatHomeLoan(models.Model):
    unique_member_shares = models.ForeignKey(Members, on_delete=models.CASCADE)
    wing_flat = models.ForeignKey(WingFlatUnique, on_delete=models.CASCADE)
    bank_loan_name = models.CharField(max_length=300)
    bank_loan_object = models.CharField(max_length=300)
    bank_loan_date = models.DateField()
    bank_loan_value = models.CharField(max_length=300)
    bank_loan_acc_no = models.CharField(max_length=300)
    bank_loan_installment = models.CharField(max_length=300)
    bank_loan_status = models.BooleanField(default=False)
    bank_loan_remark = models.CharField(max_length=300)
    bank_noc_file = models.FileField(upload_to='files/', null=True, blank=True)
    date_of_cessation = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.wing_flat.wing_flat_unique


class FlatGST(models.Model):
    unique_member_shares = models.ForeignKey(Members, on_delete=models.CASCADE)
    wing_flat = models.ForeignKey(WingFlatUnique, on_delete=models.CASCADE)
    gst_number = models.CharField(max_length=300)
    gst_state = models.CharField(max_length=300)
    gst_billing_name = models.CharField(max_length=300)
    gst_billing_address = models.CharField(max_length=300)
    gst_contact_no = models.CharField(max_length=300)
    date_of_cessation = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.wing_flat.wing_flat_unique


class FlatMemberVehicle(models.Model):
    unique_member_shares = models.ForeignKey(Members, on_delete=models.CASCADE)
    wing_flat = models.ForeignKey(WingFlatUnique, on_delete=models.CASCADE)
    parking_lot = models.CharField(max_length=200)
    vehicle_type = models.CharField(max_length=200)
    vehicle_number = models.CharField(max_length=200)
    vehicle_brand = models.CharField(max_length=200)
    rc_copy = models.FileField(upload_to='files/')
    sticker_number = models.CharField(max_length=200, null=True, blank=True)
    chargable = models.CharField(max_length=200, default='')
    date_of_cessation = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.wing_flat.wing_flat_unique



class TenantMaster(models.Model):
    tenant_name = models.CharField(max_length=300)
    tenant_pan_number = models.CharField(max_length=300)
    tenant_pan_doc = models.FileField(upload_to='files/')
    tenant_contact = models.CharField(max_length=300)
    tenant_aadhar_number = models.CharField(max_length=300)
    tenant_aadhar_doc = models.FileField(upload_to='files/')
    tenant_address = models.CharField(max_length=300)
    tenant_city = models.CharField(max_length=300)
    tenant_state = models.CharField(max_length=300)
    tenant_pin_code = models.CharField(max_length=300)
    tenant_email = models.CharField(max_length=300)
    tenant_other_doc = models.FileField(upload_to='files/', null=True, blank=True)
    tenant_doc_specification = models.CharField(max_length=300, null=True, blank=True)

    def __str__(self):
        return self.tenant_name


class TenantAllocation(models.Model):
    wing_flat = models.ForeignKey(WingFlatUnique, on_delete=models.CASCADE, related_name='society_management_api_wing_flat')
    member_name = models.ForeignKey(Members, on_delete=models.CASCADE, related_name='tenant_allocations')
    aadhar_pan = models.ForeignKey(TenantMaster, on_delete=models.CASCADE, related_name='aadhar_pan_allocations')
    tenant_name = models.ForeignKey(TenantMaster, on_delete=models.CASCADE, related_name='tenant_name_allocations')
    tenant_from_date = models.DateField()
    tenant_to_date = models.DateField(null=True, blank=True)
    tenant_agreement = models.FileField(upload_to='tenant_agreements/')
    tenant_noc = models.FileField(upload_to='tenant_nocs/')
    no_of_members = models.CharField(max_length=300)

    def __str__(self):
        return self.tenant_name.tenant_name


class HouseHelp(models.Model):
    house_help_name = models.CharField(max_length=300, error_messages={'blank': 'Name is required!'})
    house_help_pan_number = models.CharField(max_length=300)
    house_help_pan_doc = models.FileField(upload_to='files/')
    house_help_contact = models.CharField(max_length=300)
    house_help_aadhar_number = models.CharField(max_length=300)
    house_help_aadhar_doc = models.FileField(upload_to='files/')
    house_help_address = models.CharField(max_length=300)
    house_help_city = models.CharField(max_length=300)
    house_help_state = models.CharField(max_length=300)
    house_help_pin = models.CharField(max_length=300)
    other_doc = models.FileField(upload_to='files/', null=True, blank=True)
    other_document_specifications = models.CharField(max_length=300, null=True, blank=True)

    def __str__(self):
        return self.house_help_name


class HouseHelpAllocationMaster(models.Model):
    wing_flat = models.ForeignKey(WingFlatUnique, on_delete=models.CASCADE)
    member_name = models.ForeignKey(Members, on_delete=models.CASCADE, related_name='owner_allocations_new')
    aadhar_pan = models.ForeignKey(HouseHelp, on_delete=models.CASCADE, related_name='aadhar_pan_allocations_new', blank=True, null=True)
    house_help_name = models.ForeignKey(HouseHelp, on_delete=models.CASCADE, related_name='name_allocations_new')
    role = models.CharField(max_length=300)
    house_help_period_from = models.DateField(blank=True, null=True)
    house_help_period_to = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.house_help_name.house_help_name



meeting_type = [
        ('first_general_meeting', 'First General Meeting'),
        ('annual_general_meeting', 'Annual General Meeting'),
        ('managing_committee_meeting', 'Managing Committee Meeting'),
        ('special_general_body_meeting', 'Special General Body Meeting'),
        ('last_general_meeting', 'Last General Meeting'),
    ]

class Meetings(models.Model):
    date_of_meeting = models.DateField(null=True, blank=True)
    time_of_meeting = models.CharField(max_length=200, null=True, blank=True)
    place_of_meeting = models.CharField(max_length=200, null=True, blank=True)
    agenda =  models.FileField(upload_to='files/', null=True, blank=True)
    financials =  models.FileField(upload_to='files/', null=True, blank=True)
    other =  models.FileField(upload_to='files/', null=True, blank=True)
    content = RichTextUploadingField(default='')
    meeting_type = models.CharField(max_length=200, choices=meeting_type)


class Suggestion(models.Model):
    meeting = models.ForeignKey(Meetings, on_delete=models.CASCADE)
    suggestions = models.TextField()



'''
For attendance:
ID    TYPE    FLATS(MULTIPLE)
1.    AGM     FLATS
2.    AGM     FLATS
'''