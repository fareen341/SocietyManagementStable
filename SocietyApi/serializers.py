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


class MembersSerializer(serializers.ModelSerializer):
    nominees = NomineesSerializer(many=True, required=False)

    class Meta:
        model = Members
        fields = '__all__'


class FlatSharesSerializers(serializers.ModelSerializer):
    class Meta:
        model = FlatShares
        fields = '__all__'


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
        fields = '__all__'


class TenantMasterSerializers(serializers.ModelSerializer):
    class Meta:
        model = TenantMaster
        fields = '__all__'


class TenantAllocationSerializers(serializers.ModelSerializer):
    wing_flat_unique = WingFlatUnique()

    class Meta:
        model = TenantAllocation
        fields = '__all__'


class MeetingsSerializer(serializers.ModelSerializer):
    # Define a custom serializer field for meeting_type
    meeting_type = serializers.SerializerMethodField()

    def get_meeting_type(self, obj):
        # Retrieve the display value corresponding to the stored value
        meeting_type_choices = dict(Meetings._meta.get_field('meeting_type').choices)
        return meeting_type_choices.get(obj.meeting_type, '')

    class Meta:
        model = Meetings
        fields = ['id', 'date_of_meeting', 'time_of_meeting', 'place_of_meeting', 'agenda', 'financials', 'other', 'content', 'meeting_type']


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
