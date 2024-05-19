from .models import *
from rest_framework import serializers
import os
from SocietyApp.models import *
from django.db.models import *


class SocietyCreationSerializer(serializers.ModelSerializer):
    registration_doc_filename = serializers.SerializerMethodField()
    pan_number_doc_filename = serializers.SerializerMethodField()
    gst_number_doc_filename = serializers.SerializerMethodField()

    class Meta:
        model = SocietyCreation
        fields = '__all__'

    def get_registration_doc_filename(self, obj):
        if obj.registration_doc:
            return os.path.basename(obj.registration_doc.name)
        return None

    def get_pan_number_doc_filename(self, obj):
        if obj.pan_number_doc:
            return os.path.basename(obj.pan_number_doc.name)
        return None

    def get_gst_number_doc_filename(self, obj):
        if obj.gst_number_doc:
            return os.path.basename(obj.gst_number_doc.name)
        return None

    # def validate(self, data):
    #     # Check if an object already exists in the database
    #     if SocietyCreation.objects.exists():
    #         raise serializers.ValidationError("Society already created.")
    #     return data


class SocietyBankSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocietyBank
        fields = [
            'id',
            'beneficiary_name',
            'beneficiary_code',
            'beneficiary_acc_number',
            'beneficiary_bank',
            'is_primary'
        ]


class SocietyOtherDocumentSerializer(serializers.ModelSerializer):
    other_document_filename = serializers.SerializerMethodField()

    class Meta:
        model = SocietyOtherDocument
        fields = ['id', 'other_document', 'other_document_specification', 'other_document_filename']

    def get_other_document_filename(self, obj):
        if obj.other_document:
            return os.path.basename(obj.other_document.name)
        return None


class SocietyRegistrationDocumentSerializer(serializers.ModelSerializer):
    completion_cert_filename = serializers.SerializerMethodField()
    occupancy_cert_filename = serializers.SerializerMethodField()
    deed_of_conveyance_filename = serializers.SerializerMethodField()
    society_by_law_filename = serializers.SerializerMethodField()
    soc_other_document_filename = serializers.SerializerMethodField()

    class Meta:
        model = SocietyRegistrationDocument
        fields = [
            'id',
            'completion_cert',
            'occupancy_cert',
            'deed_of_conveyance',
            'society_by_law',
            'soc_other_document',
            'soc_other_document_spec',
            'completion_cert_filename',
            'occupancy_cert_filename',
            'deed_of_conveyance_filename',
            'society_by_law_filename',
            'soc_other_document_filename'
        ]

    def get_completion_cert_filename(self, obj):
        if obj.completion_cert:
            return os.path.basename(obj.completion_cert.name)
        return None

    def get_occupancy_cert_filename(self, obj):
        if obj.occupancy_cert:
            return os.path.basename(obj.occupancy_cert.name)
        return None

    def get_deed_of_conveyance_filename(self, obj):
        if obj.deed_of_conveyance:
            return os.path.basename(obj.deed_of_conveyance.name)
        return None

    def get_society_by_law_filename(self, obj):
        if obj.society_by_law:
            return os.path.basename(obj.society_by_law.name)
        return None

    def get_soc_other_document_filename(self, obj):
        if obj.soc_other_document:
            return os.path.basename(obj.soc_other_document.name)
        return None


class WingFlatSerializers(serializers.ModelSerializer):
    class Meta:
        model = WingFlat
        fields = '__all__'


class WingFlatUniqueSerializers(serializers.ModelSerializer):
    wing = WingFlatSerializers(many=True, required=False)

    class Meta:
        model = WingFlatUnique
        fields = '__all__'


class NomineesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nominees
        fields = [
            'id',
            # 'member_name',
            'nominee_name',
            'date_of_nomination',
            'relation_with_nominee',
            'nominee_sharein_percent',
            'nominee_dob',
            'nominee_aadhar_no',
            'nominee_pan_no',
            'nominee_email',
            'nominee_address',
            'nominee_state',
            'nominee_pin_code',
            'nominee_contact',
            'nominee_emergency_contact',
        ]


# Serializers for add, update
class MembersActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Members
        fields = '__all__'

    def validate(self, attrs):
        # Validate ownership percentage to ensure it doesn't exceed 100%
        ownership_percent = attrs.get('ownership_percent', 0)
        if ownership_percent <= 0 or ownership_percent > 100:
            raise serializers.ValidationError(f"Ownership percentage should be between 0 & 100%!", code='invalid_ownership_percent')
        return attrs


# SERIALIZER FOR DISPLAT(RETRIVE, LIST)
class MembersSerializer(serializers.ModelSerializer):
    flat_name_formatted = serializers.SerializerMethodField()
    member_position_formatted = serializers.SerializerMethodField()
    nominees = NomineesSerializer(many=True, required=False)
    member_is_primary_formatted = serializers.SerializerMethodField()
    sales_agreement_filename = serializers.SerializerMethodField()
    other_attachment_filename = serializers.SerializerMethodField()

    class Meta:
        model = Members
        fields = [
            'id',
            'flat_name_formatted',
            'member_name',
            'member_position_formatted',
            'ownership_percent',
            'member_dob',
            'member_pan_no',
            'member_aadhar_no',
            'member_address',
            'member_state',
            'member_pin_code',
            'member_email',
            'member_contact',
            'member_emergency_contact',
            'member_occupation',
            'member_is_primary',
            'date_of_admission',
            'age_at_date_of_admission',
            'sales_agreement_filename',
            'other_attachment_filename',
            'date_of_entrance_fees',
            'date_of_cessation',
            'reason_for_cessation',

            # Extra fields
            'wing_flat',
            'other_attachment',
            'member_position',
            'sales_agreement',
            'member_is_primary_formatted',
            'nominees',
            'same_flat_member_identification'
        ]

    def get_sales_agreement_filename(self, obj):
        if obj.sales_agreement:
            file_name = os.path.basename(obj.sales_agreement.name)
            max_length = 25
            if len(file_name) > max_length:
                file_name = file_name[:max_length - 3] + '...'
            return file_name
        return None

    def get_other_attachment_filename(self, obj):
        if obj.other_attachment:
            return os.path.basename(obj.other_attachment.name)
        return None

    # FORMAT FLAT NO.
    def get_flat_name_formatted(self, obj):
        flat = obj.wing_flat
        return flat.wing_flat_unique

    # FORMAT MEMBER POSITION
    def get_member_position_formatted(self, obj):
        member_position_choices = dict(Members._meta.get_field('member_position').choices)
        return member_position_choices.get(obj.member_position, '')

    def get_member_is_primary_formatted(self, obj):
        # Assuming member_is_primary is a field of the Members model
        if obj.member_is_primary:
            return "Primary"
        else:
            return "Secondary"

    def get_error_keys(self, data):
        error_keys = super().get_error_keys(data)
        if 'non_field_errors' in error_keys:
            error_keys.remove('non_field_errors')
            error_keys.append('ownership_exceeded')
        return error_keys

    def to_representation(self, instance):
        # Call the parent class method to get the default representation
        data = super().to_representation(instance)

        # Check if the action is list, if so, exclude member_is_primary_formatted field
        if self.context['view'].action == 'list':
            data.pop('member_is_primary_formatted', None)
        return data


class FlatSharesSerializers(serializers.ModelSerializer):
    flat_name_formatted = serializers.SerializerMethodField()

    class Meta:
        model = FlatShares
        fields = '__all__'

    # FORMAT FLAT NO.
    def get_flat_name_formatted(self, obj):
        flat = obj.wing_flat
        return flat.wing_flat_unique


class FlatDetailSerializers(serializers.ModelSerializer):
    flat_status_formatted = serializers.SerializerMethodField()

    def get_flat_status_formatted(self, obj):
        # Retrieve the display value corresponding to the stored value
        flat_status_choices = dict(FlatDetail._meta.get_field('flat_status').choices)
        return flat_status_choices.get(obj.flat_status, '')

    class Meta:
        model = FlatDetail
        fields = [
            'id', 'wing_flat', 'unit_area', 'unit_type', 'unit_of_mesurement',
            'property_tax_no', 'electricity_connection_no', 'is_having_pet',
            'gas_connection_no', 'water_connection_no', 'flat_status', 'flat_status_formatted'
        ]


class FlatHomeLoanSerializers(serializers.ModelSerializer):
    flat_name_formatted = serializers.SerializerMethodField()
    bank_noc_file_formatted = serializers.SerializerMethodField()

    class Meta:
        model = FlatHomeLoan
        fields = '__all__'

    # FORMAT FLAT NO.
    def get_flat_name_formatted(self, obj):
        flat = obj.wing_flat
        return flat.wing_flat_unique

    def get_bank_noc_file_formatted(self, obj):
        if obj.bank_noc_file:
            return os.path.basename(obj.bank_noc_file.name)
        return None


class FlatGSTSerializers(serializers.ModelSerializer):
    flat_name_formatted = serializers.SerializerMethodField()

    class Meta:
        model = FlatGST
        fields = '__all__'

    # FORMAT FLAT NO.
    def get_flat_name_formatted(self, obj):
        flat = obj.wing_flat
        return flat.wing_flat_unique



class FlatMemberVehicleSerializer(serializers.ModelSerializer):
    flat_name_formatted = serializers.SerializerMethodField()
    rc_copy_formatted = serializers.SerializerMethodField()

    class Meta:
        model = FlatMemberVehicle
        fields = '__all__'

    # FORMAT FLAT NO.
    def get_flat_name_formatted(self, obj):
        flat = obj.wing_flat
        return flat.wing_flat_unique

    def get_rc_copy_formatted(self, obj):
        if obj.rc_copy:
            return os.path.basename(obj.rc_copy.name)
        return None



class HouseHelpSerializer(serializers.ModelSerializer):
    class Meta:
        model = HouseHelp
        fields = '__all__'


class HouseHelpAllocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = HouseHelpAllocationMaster
        # Taking list instead of all to maintain the order in datatable
        fields = [
            'id', 'wing_flat', 'member_name', 'house_help_name',
            'role', 'house_help_period_from', 'house_help_period_to', 'aadhar_pan',
        ]


class TenantMasterSerializers(serializers.ModelSerializer):
    class Meta:
        model = TenantMaster
        fields = '__all__'


class TenantAllocationSerializers(serializers.ModelSerializer):
    wing_flat_unique = WingFlatUnique()
    tenant_noc_filename = serializers.SerializerMethodField()

    class Meta:
        model = TenantAllocation
        # Taking list instead of all to maintain the order in datatable
        fields = [
            'id', 'wing_flat', 'member_name', 'tenant_name', 'tenant_from_date',
            'tenant_to_date', 'tenant_agreement', 'tenant_noc_filename', 'no_of_members', 'aadhar_pan',
            'tenant_noc'
        ]

    def get_tenant_noc_filename(self, obj):
        if obj.tenant_noc:
            return os.path.basename(obj.tenant_noc.name)
        return None

class MeetingsSerializer(serializers.ModelSerializer):
    # Define a custom serializer field for meeting_type
    meeting_type_formatted = serializers.SerializerMethodField()

    def get_meeting_type_formatted(self, obj):
        # Retrieve the display value corresponding to the stored value
        meeting_type_choices = dict(Meetings._meta.get_field('meeting_type').choices)
        return meeting_type_choices.get(obj.meeting_type, '')

    class Meta:
        model = Meetings
        fields = ['id', 'date_of_meeting', 'time_of_meeting',
                  'place_of_meeting', 'agenda', 'financials', 'other',
                  'content', 'meeting_type', 'meeting_type_formatted',
                  'minutes_content', 'minutes_document', 'minutes_otehr_doc'
                ]


class SuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suggestion
        fields = '__all__'


# REQUIRED FOR ADD NOMINEE FROM EDIT MODAL OF MEMBER
class AddNomineesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nominees
        fields = '__all__'

    def validate_nominee_sharein_percent(self, value):
        if value <= 0 or value > 100:
            raise serializers.ValidationError("Ownership percentage should be between 1 & 100%!", code='invalid_ownership_percent')
        return value


class MemberSerializersForAttendance(serializers.ModelSerializer):
    class Meta:
        model = Members
        fields = ['id', 'member_name', 'member_is_primary']


class SaveAttendanceSerializers(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = "__all__"
    #     fields = ['flat_no', 'member', 'member_type', 'attachment', 'attendance']

    # def create(self, validated_data):
    #     # If data is a list, perform bulk create
    #     if isinstance(validated_data, list):
    #         return [self.Meta.model.objects.create(**item) for item in validated_data]
    #     else:
    #         return super().create(validated_data)


# REQUIRED FOR NOMINEES REGISTER
class NomineesSerializerForNominees(serializers.ModelSerializer):
    class Meta:
        model = Nominees
        fields = [
            'nominee_name',
            'nominee_sharein_percent',
            'nominee_address',
            'date_of_nomination',
        ]


class MemberSerializersForNominees(serializers.ModelSerializer):
    nominees = NomineesSerializerForNominees(many=True, required=False)
    vehicles = FlatMemberVehicleSerializer(many=True, required=False)
    banks = FlatHomeLoanSerializers(many=True, required=False)
    member_is_primary = serializers.SerializerMethodField()
    member_position_formatted = serializers.SerializerMethodField()

    class Meta:
        model = Members
        fields = [
            'id', 'member_name', 'member_is_primary', 'member_position_formatted', 'date_of_admission', 'date_of_entrance_fees',
            'member_address', 'member_occupation', 'age_at_date_of_admission', 'date_of_cessation',
            'reason_for_cessation',
            'nominees',
            'vehicles',
            'banks'
            ]

    def get_member_is_primary(self, obj):
        # Assuming member_is_primary is a field of the Members model
        if obj.member_is_primary:
            return "Primary"
        else:
            return "Secondary"

    # FORMAT MEMBER POSITION
    def get_member_position_formatted(self, obj):
        member_position_choices = dict(Members._meta.get_field('member_position').choices)
        return member_position_choices.get(obj.member_position, '')


class SuggestionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Suggestion
        fields = '__all__'


class FlatDetailSerializers(serializers.ModelSerializer):
    wing_flat_name = serializers.CharField(source='wing_flat.wing_flat_unique', read_only=True)
    is_having_pet = serializers.SerializerMethodField()

    class Meta:
        model = FlatDetail
        fields = [
            'id', 'wing_flat', 'wing_flat_name', 'unit_area', 'unit_type', 'unit_of_mesurement', 'property_tax_no',
            'electricity_connection_no', 'is_having_pet', 'gas_connection_no', 'water_connection_no',
            'flat_status'
        ]

    def get_is_having_pet(self, obj):
        if obj.is_having_pet:
            return "Yes"
        else:
            return "No"


class MemberForUnitSerializer(serializers.ModelSerializer):
    # Keep it if Nominees required in future.
    # nominees = NomineesSerializer(many=True, required=False)
    member_is_primary = serializers.SerializerMethodField()

    class Meta:
        model = Members
        fields = ['id', 'member_name', 'member_is_primary', 'date_of_admission', 'date_of_cessation']

    def get_member_is_primary(self, obj):
        if obj.member_is_primary:
            return "Primary"
        else:
            return "Secondary"


# REQUIRED FOR UNIT REGISTER
class UnitRegisterSerializers(serializers.ModelSerializer):
    members = MemberForUnitSerializer(many=True)
    flats = FlatDetailSerializers()

    class Meta:
        model = WingFlatUnique
        fields = '__all__'

    def to_representation(self, instance):
        request = self.context.get('request')
        status = request.GET.get('selected', None)

        active_members = Members.objects.filter(wing_flat=instance)
        if status == 'current':
            active_members = active_members.filter(date_of_cessation__isnull=True)
        elif status == 'history':
            active_members = active_members.filter(date_of_cessation__isnull=False)

        representation = super().to_representation(instance)
        representation['members'] = MemberForUnitSerializer(active_members, many=True).data
        return representation


class CreateGroupForLedgerSerializers(serializers.ModelSerializer):
    class Meta:
        model = Childs
        fields = '__all__'


class CostCenterSerializers(serializers.ModelSerializer):
    class Meta:
        model = CostCenter
        fields = '__all__'


class CostCenterSerializersList(serializers.ModelSerializer):
    class Meta:
        model = CostCenter
        fields = ['name']


class VoucherCreateIndexingSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoucherIndexing
        fields = ['id', 'from_date', 'to_date', 'prefix', 'suffix', 'voucher_number']

# REQUIRED FOR ADDING ONLY VOUCHER INDEXING
class VoucherIndexingSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoucherIndexing
        fields = ['id', 'voucher_type', 'from_date', 'to_date', 'prefix', 'suffix', 'voucher_number']


# CREATE SERIALIZERS(['create', 'retrieve', 'partial_update', 'update'])
class VoucherTypeSerializer(serializers.ModelSerializer):
    voucher_indexing = VoucherCreateIndexingSerializer(many=True, required=False)

    class Meta:
        model = VoucherType
        fields = ['id', 'voucher_type', 'voucher_name', 'voucher_short_name', 'voucher_indexing']

    def create(self, validated_data):
        print("======================================")
        indexing_data = validated_data.pop('voucher_indexing', None)
        voucher_type = VoucherType.objects.create(**validated_data)
        if indexing_data:
            for indexing_item in indexing_data:
                print("vtype==============", voucher_type)
                VoucherIndexing.objects.create(voucher_type=voucher_type, **indexing_item)
        return voucher_type

    # def update(self, instance, validated_data):
    #     print("validated_data==========================", validated_data)
    #     indexing_data = validated_data.pop('voucher_indexing', None)
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)
    #     instance.save()
    #     if indexing_data:
    #         for indexing_item in indexing_data:
    #             # If indexing item has an 'id', it's an existing object, so update it
    #             if 'id' in indexing_item:
    #                 indexing_obj = VoucherIndexing.objects.get(id=indexing_item['id'])
    #                 for attr, value in indexing_item.items():
    #                     setattr(indexing_obj, attr, value)
    #                 indexing_obj.save()
    #             # Otherwise, it's a new object, so create it
    #             # else:
    #             #     VoucherIndexing.objects.create(voucher_type=instance, **indexing_item)
    #     return instance


# DISPLAY SERIALIZERS
class VoucherTypeDisplaySerializer(serializers.ModelSerializer):
    voucher_indexing = VoucherIndexingSerializer(many=True, required=False)
    voucher_type_formatted = serializers.SerializerMethodField()

    class Meta:
        model = VoucherType
        fields = ['id', 'voucher_type_formatted', 'voucher_name', 'voucher_short_name', 'voucher_indexing']

    def get_voucher_type_formatted(self, obj):
        voucher_type_choices = dict(VoucherType._meta.get_field('voucher_type').choices)
        return voucher_type_choices.get(obj.voucher_type, '')


# FOR LIST
class UnitTestSerializer(serializers.ModelSerializer):
    test_type = serializers.SerializerMethodField()
    test_status = serializers.SerializerMethodField()
    review = serializers.SerializerMethodField()

    class Meta:
        model = UnitTest
        fields = ['id', 'test_type', 'test_description', 'test_status', 'raised_by', 'review']

    def get_test_type(self, obj):
        return obj.get_test_type_display()

    def get_test_status(self, obj):
        return obj.get_test_status_display()

    def get_review(self, obj):
        return obj.get_review_display()


# FOR POST, PUT, PATCH, RETRIVE
class UnitTestPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnitTest
        fields = '__all__'


class LedgerSerializers(serializers.ModelSerializer):
    class Meta:
        model = Ledger
        fields = '__all__'


class PurchaseVoucherSerializers(serializers.ModelSerializer):
    class Meta:
        model = PurchaseVoucherModel
        fields = '__all__'