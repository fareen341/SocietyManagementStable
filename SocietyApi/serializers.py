from .models import *
from rest_framework import serializers



class SocietyCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocietyCreation
        fields = '__all__'


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
    class Meta:
        model = SocietyOtherDocument
        fields = ['other_document', 'other_document_specification']


class SocietyRegistrationDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocietyRegistrationDocument
        fields = [
            'completion_cert',
            'occupancy_cert',
            'deed_of_conveyance',
            'society_by_law',
            'soc_other_document',
            'soc_other_document_spec',
        ]


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


# SERIALIZER FOR MEMBER TABLE VIEW
class MembersSerializer(serializers.ModelSerializer):
    flat_name = serializers.SerializerMethodField()
    member_position_formatted = serializers.SerializerMethodField()
    nominees = NomineesSerializer(many=True, required=False)

    class Meta:
        model = Members
        fields = '__all__'

    # FORMAT FLAT NO.
    def get_flat_name(self, obj):
        flat = obj.wing_flat
        return flat.wing_flat_unique

    # FORMAT MEMBER POSITION
    def get_member_position_formatted(self, obj):
        member_position_choices = dict(Members._meta.get_field('member_position').choices)
        return member_position_choices.get(obj.member_position, '')


class FlatSharesSerializers(serializers.ModelSerializer):
    class Meta:
        model = FlatShares
        fields = '__all__'


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
    class Meta:
        model = FlatHomeLoan
        fields = '__all__'


class FlatGSTSerializers(serializers.ModelSerializer):
    class Meta:
        model = FlatGST
        fields = '__all__'


class FlatMemberVehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlatMemberVehicle
        fields = '__all__'


class HouseHelpSerializer(serializers.ModelSerializer):
    class Meta:
        model = HouseHelp
        fields = '__all__'


class HouseHelpAllocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = HouseHelpAllocationMaster
        # Taking list instead of all to maintain the order in datatable
        fields = [
            'wing_flat', 'member_name', 'house_help_name',
            'role', 'house_help_period_from', 'house_help_period_to', 'aadhar_pan'
        ]


class TenantMasterSerializers(serializers.ModelSerializer):
    class Meta:
        model = TenantMaster
        fields = '__all__'


class TenantAllocationSerializers(serializers.ModelSerializer):
    wing_flat_unique = WingFlatUnique()

    class Meta:
        model = TenantAllocation
        # Taking list instead of all to maintain the order in datatable
        fields = [
            'wing_flat', 'member_name', 'tenant_name', 'tenant_from_date',
            'tenant_to_date', 'tenant_agreement', 'tenant_noc', 'no_of_members', 'aadhar_pan',
        ]


class MeetingsSerializer(serializers.ModelSerializer):
    # Define a custom serializer field for meeting_type
    meeting_type_formatted = serializers.SerializerMethodField()

    def get_meeting_type_formatted(self, obj):
        # Retrieve the display value corresponding to the stored value
        meeting_type_choices = dict(Meetings._meta.get_field('meeting_type').choices)
        return meeting_type_choices.get(obj.meeting_type, '')

    class Meta:
        model = Meetings
        fields = ['id', 'date_of_meeting', 'time_of_meeting', 'place_of_meeting', 'agenda', 'financials', 'other', 'content', 'meeting_type', 'meeting_type_formatted']


class SuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suggestion
        fields = '__all__'


# REQUIRED FOR ADD NOMINEE FROM EDIT MODAL OF MEMBER
class AddNomineesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nominees
        fields = '__all__'


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

    class Meta:
        model = Members
        fields = [
            'id', 'member_name', 'member_is_primary', 'date_of_admission', 'date_of_entrance_fees',
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
