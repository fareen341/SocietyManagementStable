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
    class Meta:
        model = Meetings
        fields = '__all__'


class SuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suggestion
        fields = '__all__'


# REQUIRED FOR ADD NOMINEE FROM EDIT MODAL OF MEMBER
class AddNomineesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nominees
        fields = '__all__'
