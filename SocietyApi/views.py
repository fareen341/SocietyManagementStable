from django.shortcuts import render
from .models import *
from rest_framework import viewsets
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from .utils import *
from rest_framework.parsers import JSONParser
from collections import OrderedDict
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.decorators import action
from django.http import HttpResponse, JsonResponse
from django.db.models import Q
from SocietyApp.models import *
from django.utils import timezone
import requests


# Create your views here.
class SocietyCreationView(viewsets.ModelViewSet):
    queryset = SocietyCreation.objects.all()
    serializer_class = SocietyCreationSerializer

    def list(self, request, *args, **kwargs):
        # Get the last object in the queryset
        last_object = self.queryset.last()
        if last_object:
            serializer = self.get_serializer(last_object)
            return Response(serializer.data)
        else:
            return Response({"message": "No objects available."}, status=status.HTTP_404_NOT_FOUND)

    # def retrieve(self, request, *args, **kwargs):
    #     # Replace the instance with your custom logic
    #     instance = SocietyCreation.objects.first()
    #     serializer = self.get_serializer(instance)
    #     serializer_data = serializer.data
    #     return Response(serializer_data)

    # def partial_update(self, request, *args, **kwargs):
    #     return super().partial_update(request, *args, **kwargs)


class SocietyBankView(viewsets.ModelViewSet):
    queryset = SocietyBank.objects.all()
    serializer_class = SocietyBankSerializer

    def create(self, request, *args, **kwargs):
        errors = []
        saved_data = []

        for index, data in enumerate(request.data):
            serializer = self.get_serializer(data=data)
            if not serializer.is_valid():
                error_detail = serializer.errors
                error_detail['index'] = index  # Include the index number
                errors.append(error_detail)

        if errors:
            print("ERRORS=========", errors)
            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)
        else:
            for data in request.data:
                serializer = self.get_serializer(data=data)
                serializer.is_valid(raise_exception=True)
                self.perform_create(serializer)
                saved_data.append(serializer.data)
            return Response(saved_data, status=status.HTTP_201_CREATED)


class SocietyOtherDocumentView(viewsets.ModelViewSet):
    queryset = SocietyOtherDocument.objects.all()
    serializer_class = SocietyOtherDocumentSerializer
    # parser_classes = (MultipartJsonParser, JSONParser)

    # def create(self, request, *args, **kwargs):
    #     print("DOCUMENTS===>", request.data)
    #     return super().create(request, *args, **kwargs)


class SocietyRegistrationDocumentView(viewsets.ModelViewSet):
    queryset = SocietyRegistrationDocument.objects.all()
    serializer_class = SocietyRegistrationDocumentSerializer


class WingFlatView(viewsets.ModelViewSet):
    queryset = WingFlat.objects.all()
    serializer_class = WingFlatSerializers

    def create(self, request, *args, **kwargs):
        wing = request.data.get('wing_name')
        flats = request.data.get('flat_number')
        if wing and flats:
            flat_split = list(OrderedDict.fromkeys(flats.split(',')))
            created_instances = []

            # Check if a WingFlat instance with the same wing_name already exists
            existing_instance = WingFlat.objects.filter(wing_name=wing).first()
            if existing_instance:
                return Response({"error": "Wing with the same name already exists"}, status=status.HTTP_400_BAD_REQUEST)

            wing_flat_combined_instance = WingFlat.objects.create(wing_name=wing, flat_number=','.join(flat_split))
            created_instances.append(wing_flat_combined_instance)

            for flat in flat_split:
                unique = f'{wing}-{flat}'
                wing_instance = WingFlatUnique.objects.create(wing=wing_flat_combined_instance, wing_flat_unique=unique)

            wing_flat_combined_serializer = WingFlatSerializers(wing_flat_combined_instance)

            response_data = {
                "WingFlatCombined": wing_flat_combined_serializer.data
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return super().create(request, *args, **kwargs)


    def partial_update(self, request, *args, **kwargs):
        object_id = kwargs.get('pk')
        wing = request.data.get('wing_name')
        flats = request.data.get('flat_number')
        wing_flat_combined_instance = WingFlat.objects.get(id=object_id)
        wing_flat_unique = wing_flat_combined_instance.flat_number
        if wing and flats:
            flat_split = list(OrderedDict.fromkeys(flats.split(',')))
            wing_obj_to_delete = list(set(wing_flat_unique.split(',')) - set(flats.split(',')))

            # Update the attributes of the retrieved instance
            wing_flat_combined_instance.wing_name = wing
            wing_flat_combined_instance.flat_number = ','.join(flat_split)
            wing_flat_combined_instance.save()

            # ADD FLATS
            for flat in flat_split:
                unique = f'{wing}-{flat}'
                check_for_existing_obj = WingFlatUnique.objects.filter(wing_flat_unique=unique)
                if not check_for_existing_obj:
                    WingFlatUnique.objects.create(wing=wing_flat_combined_instance, wing_flat_unique=unique)

            # REMOVE FLATS
            for flat in wing_obj_to_delete:
                unique = f'{wing}-{flat}'
                object_to_delete = WingFlatUnique.objects.filter(wing_flat_unique=unique)
                if object_to_delete:
                    object_to_delete.delete()

            wing_flat_combined_serializer = WingFlatSerializers(wing_flat_combined_instance)

            response_data = {
                "WingFlatCombined": wing_flat_combined_serializer.data
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return super().partial_update(request, *args, **kwargs)

from django.db import transaction


# GET ALL WINGS
class UnitWingView(viewsets.ViewSet):
    def list(self, request):
        form_type = request.query_params.get('form_type')
        # CHECKING IF THERE ARE MEMBER
        units = WingFlatUnique.objects.filter(
            members__wing_flat__isnull=False,
            members__member_is_primary=True,
            members__date_of_cessation__isnull=True
        ).values_list('id', 'wing_flat_unique').distinct()
        # FOR MEMBERS ONLY:
        if form_type is not None and form_type == 'member_form':
            units = WingFlatUnique.objects.values_list('id', 'wing_flat_unique').distinct()

        # if wing_flat:
        #     # MEMBERS:
        #     if form_type is not None and form_type == 'member_form':
        #         units = WingFlatUnique.objects.values_list('id', 'wing_flat_unique').distinct()

        # SHARES
        if form_type is not None and form_type == 'shares_form':
            all_blocks = FlatShares.objects.filter(date_of_cessation__isnull=True).values_list('wing_flat__wing_flat_unique', flat=True)
            if all_blocks:
                for flat in all_blocks:
                    if flat in units.values_list('wing_flat_unique', flat=True):
                        units = units.exclude(wing_flat_unique=flat)

        # HOME LOAN
        if form_type is not None and form_type == 'home_loan':
            all_blocks = FlatHomeLoan.objects.filter(date_of_cessation__isnull=True).values_list('wing_flat__wing_flat_unique', flat=True)
            if all_blocks:
                for flat in all_blocks:
                    if flat in units.values_list('wing_flat_unique', flat=True):
                        units = units.exclude(wing_flat_unique=flat)


        # GST
        if form_type is not None and form_type == 'gst_form':
            all_blocks = FlatGST.objects.filter(date_of_cessation__isnull=True).values_list('wing_flat__wing_flat_unique', flat=True)
            if all_blocks:
                for flat in all_blocks:
                    if flat in units.values_list('wing_flat_unique', flat=True):
                        units = units.exclude(wing_flat_unique=flat)

        # VEHICLE
        if form_type is not None and form_type == 'vehicle_form':
            all_blocks = FlatMemberVehicle.objects.filter(date_of_cessation__isnull=True).values_list('wing_flat__wing_flat_unique', flat=True)
            if all_blocks:
                for flat in all_blocks:
                    if flat in units.values_list('wing_flat_unique', flat=True):
                        units = units.exclude(wing_flat_unique=flat)

        return Response(units)


class MemberView(viewsets.ModelViewSet):
    # queryset = Members.objects.all()
    queryset = Members.objects.prefetch_related('nominees')
    serializer_class = MembersSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['=wing_flat__id']
    parser_classes = (MultipartJsonParser, JSONParser)

    def get_serializer_class(self):
        if self.action in ['create', 'partial_update', 'update']:
            return MembersActionSerializer
        return MembersSerializer

    def create(self, request, *args, **kwargs):
        try:
            member_data = Members.objects.get(
                wing_flat=request.data.get('wing_flat'),
                member_is_primary=True,
                date_of_cessation__isnull=True
            ).same_flat_member_identification
        except Members.DoesNotExist:
            member_data = None
            print("No member data found")

        nominees_data = request.POST.getlist('nominees')[0]
        # nominees_data = request.POST.getlist('nominees')

        modified_data = request.data
        if member_data:
            modified_data = request.data.copy()
            modified_data['same_flat_member_identification'] = member_data

        with transaction.atomic():
            member_serializer = self.get_serializer(data=modified_data)

            if member_serializer.is_valid():
                total_ownership_percentage = Members.objects.filter(
                    wing_flat=modified_data['wing_flat'],
                    date_of_cessation__isnull=True
                ).aggregate(total_ownership=Sum('ownership_percent'))['total_ownership']
                if total_ownership_percentage and total_ownership_percentage + int(modified_data['ownership_percent'])  > 100:
                    raise serializers.ValidationError(
                        {'ownership_percent': [
                            f'Total ownership percentage cannot exceed 100%, This flat left with {100 - total_ownership_percentage} % ownership!'
                        ]})

                member_instance = member_serializer.save()

                # Loop through nominee data and save each nominee
                for nominee_dict in nominees_data:
                    nominee_serializer = NomineesSerializer(data=nominee_dict)
                    if nominee_serializer.is_valid():
                        # Associate the nominee with the member instance
                        nominee_serializer.save(member_name=member_instance)
                    else:
                        member_instance.delete()
                        return Response(nominee_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                return Response(member_serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(member_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        queryset = super().get_queryset()
        wing_flat_id = self.request.query_params.get('wing_flat__id')

        if wing_flat_id:
            try:
                queryset = queryset.get(wing_flat=wing_flat_id, member_is_primary=True, date_of_cessation__isnull=True)
            except Exception as e:
                print("NOT EXISTS")
                return Response({"error": "Object not found."})
        return queryset

    def list(self, request, *args, **kwargs):
        # queryset = Members.objects.filter(member_is_primary=True, date_of_cessation__isnull=True)
        queryset = Members.objects.filter(member_is_primary=True, date_of_cessation__isnull=True)
        serializer = MembersSerializer(queryset, many=True, context={'request': request, 'view': self})

        for member in serializer.data:
            # ownership_percent = member['ownership_percent']
            total_ownership_percentage = Members.objects.filter(
                wing_flat=member['wing_flat'], date_of_cessation__isnull=True
            ).aggregate(total_ownership=Sum('ownership_percent'))['total_ownership']
            member['ownership_percent'] = total_ownership_percentage
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance_id = kwargs.get('pk')
        if instance_id:
            try:
                instance = Members.objects.get(pk=instance_id, date_of_cessation__isnull=True)
                identification_name = instance.same_flat_member_identification
                instance = Members.objects.filter(same_flat_member_identification=identification_name)
            except Members.DoesNotExist:
                return Response(data={"message": "Member not found"})

            serializer = MembersSerializer(instance, many=True, context={'request': request, 'view': self})
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def member_history_retrieve(self, request, *args, **kwargs):
        wing_flat_id = self.request.query_params.get('wing_flat__id')
        try:
            instances = Members.objects.filter(wing_flat=wing_flat_id, date_of_cessation__isnull=False)
        except Members.DoesNotExist:
            return Response(data={"message": "Member not found"})

        serializer = MembersSerializer(instances, many=True, context={'request': request, 'view': self})
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        nominees_data = request.POST.getlist('nominees')[0]
        member_serializer = self.get_serializer(instance, data=request.data, partial=True)
        if member_serializer.is_valid():
            member_instance = member_serializer.save()

            # If there are nominee data, process them
            if nominees_data:
                # Loop through nominee data and either create or update each nominee
                for nominee_dict in nominees_data:
                    nominee_id = nominee_dict.get('id')  # Assuming nominee has an 'id' field
                    if nominee_id:
                        # If nominee has an id, try to get existing nominee
                        nominee_instance = Nominees.objects.get(pk=nominee_id)
                        nominee_serializer = NomineesSerializer(
                            nominee_instance, data=nominee_dict, partial=True
                        )
                    # else:
                    #     # If nominee doesn't have an id, it's a new nominee
                    #     nominee_serializer = NomineesSerializer(data=nominee_dict)

                        if nominee_serializer.is_valid():
                            nominee_serializer.save(member_name=member_instance)
                        else:
                            return Response(nominee_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            member_id = request.data.get("id")
            if request.data.get('date_of_cessation', None):
                # MAKE SHARES AS HISTORY
                check = FlatShares.objects.filter(unique_member_shares=member_id).exists()
                if check:
                    shares_data = FlatShares.objects.get(unique_member_shares=member_id)
                    shares_data.date_of_cessation = request.data.get('date_of_cessation')
                    shares_data.save()

                # # MAKE HOME-LOAN AS HISTORY
                check = FlatHomeLoan.objects.filter(unique_member_shares=member_id).exists()
                if check:
                    home_loan = FlatHomeLoan.objects.get(unique_member_shares=member_id)
                    home_loan.date_of_cessation = request.data.get('date_of_cessation')
                    home_loan.save()

                # # MAKE GST AS HISTORY
                check = FlatGST.objects.filter(unique_member_shares=member_id).exists()
                if check:
                    gst = FlatGST.objects.get(unique_member_shares=member_id)
                    gst.date_of_cessation = request.data.get('date_of_cessation')
                    gst.save()

                # MAKE VEHICLE AS HISTORY
                vehicle_obj = FlatMemberVehicle.objects.filter(unique_member_shares=member_id)
                for vehicle in vehicle_obj:
                    vehicle.date_of_cessation = request.data.get('date_of_cessation')
                    vehicle.save()

            return Response(member_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(member_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def hide_non_primary_member_checkbox(request, id):
    member_status = True
    member = Members.objects.filter(
        wing_flat=id,
        member_is_primary=True,
        date_of_cessation__isnull=True
    )

    if member:
        member_status = False
    data = {
        "member_status": member_status,
    }
    return JsonResponse(data)


class FlatSharesView(viewsets.ModelViewSet):
    queryset = FlatShares.objects.all()
    serializer_class = FlatSharesSerializers

    def retrieve(self, request, *args, **kwargs):
        try:
            instance_id = kwargs.get('pk')
            instance = FlatShares.objects.get(unique_member_shares=instance_id, date_of_cessation__isnull=True)
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except FlatShares.DoesNotExist:
            return Response({"error": "Shares details not added!"}, status=status.HTTP_404_NOT_FOUND)

    def create(self, request, *args, **kwargs):
        unique_member_share = None
        if request.data.get('wing_flat'):
            unique_member_share = Members.objects.get(
                wing_flat=request.data.get('wing_flat'), member_is_primary=True,
                date_of_cessation__isnull=True
            ).pk

        modified_data = request.data.copy()
        modified_data['unique_member_shares'] = unique_member_share
        serializer = self.get_serializer(data=modified_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class FlatDetailView(viewsets.ModelViewSet):
    queryset = FlatDetail.objects.all()
    serializer_class = FlatDetailSerializers

    def retrieve(self, request, *args, **kwargs):
        try:
            instance_id = kwargs.get('pk')
            instance = FlatDetail.objects.get(wing_flat=instance_id)
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except FlatDetail.DoesNotExist:
            return Response({"error": "Details for this flat not added!"}, status=status.HTTP_404_NOT_FOUND)

    # def partial_update(self, request, *args, **kwargs):
    #     try:
    #         instance_id = kwargs.get('pk')
    #         instance = FlatDetail.objects.get(wing_flat=instance_id)
    #         serializer = self.get_serializer(instance, data=request.data, partial=True)
    #         serializer.is_valid(raise_exception=True)
    #         serializer.save()
    #         return super().partial_update(request, *args, **kwargs)
    #     except FlatDetail.DoesNotExist:
    #         return Response({"error": "FlatDetail not found."}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'])
    def get_flat_status_dropdown(self, request, *args, **kwargs):
        choices = [
            {'value': choice[0], 'label': choice[1]} for choice in flat_choices
        ]
        return Response(choices)

    # def create(self, request, *args, **kwargs):
    #     unique_member_share = None
    #     if request.data.get('wing_flat'):
    #         unique_member_share = Members.objects.get(
    #             wing_flat=request.data.get('wing_flat'), member_is_primary=True,
    #             date_of_cessation__isnull=True
    #         ).pk

    #     modified_data = request.data.copy()
    #     modified_data['unique_member_shares'] = unique_member_share
    #     serializer = self.get_serializer(data=modified_data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED)


# REQUIRED FOR UNIT MASTER
class FlatDetailMasterView(viewsets.ModelViewSet):
    queryset = FlatDetail.objects.all()
    serializer_class = FlatDetailSerializers


class FlatHomeLoanView(viewsets.ModelViewSet):
    queryset = FlatHomeLoan.objects.all()
    serializer_class = FlatHomeLoanSerializers

    def retrieve(self, request, *args, **kwargs):
        try:
            instance_id = kwargs.get('pk')
            instance = FlatHomeLoan.objects.get(unique_member_shares=instance_id, date_of_cessation__isnull=True)
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except FlatHomeLoan.DoesNotExist:
            return Response({"error": "Home loan detail not added."}, status=status.HTTP_404_NOT_FOUND)

    def create(self, request, *args, **kwargs):
        unique_member_share = None
        if request.data.get('wing_flat'):
            unique_member_share = Members.objects.get(
                wing_flat=request.data.get('wing_flat'), member_is_primary=True,
                date_of_cessation__isnull=True
            ).pk

        modified_data = request.data.copy()
        modified_data['unique_member_shares'] = unique_member_share
        serializer = self.get_serializer(data=modified_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class FlatGSTView(viewsets.ModelViewSet):
    queryset = FlatGST.objects.all()
    serializer_class = FlatGSTSerializers

    def retrieve(self, request, *args, **kwargs):
        try:
            instance_id = kwargs.get('pk')
            instance = FlatGST.objects.get(unique_member_shares=instance_id, date_of_cessation__isnull=True)
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except FlatGST.DoesNotExist:
            return Response({"error": "GST detail not added."}, status=status.HTTP_404_NOT_FOUND)

    def create(self, request, *args, **kwargs):
        unique_member_share = None
        if request.data.get('wing_flat'):
            unique_member_share = Members.objects.get(
                wing_flat=request.data.get('wing_flat'), member_is_primary=True,
                date_of_cessation__isnull=True
            ).pk

        modified_data = request.data.copy()
        modified_data['unique_member_shares'] = unique_member_share
        serializer = self.get_serializer(data=modified_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class FlatMemberVehicleView(viewsets.ModelViewSet):
    queryset = FlatMemberVehicle.objects.all()
    serializer_class = FlatMemberVehicleSerializer
    parser_classes = (MultipartJsonParser, JSONParser)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance_id = kwargs.get('pk')
            instance = FlatMemberVehicle.objects.filter(unique_member_shares=instance_id, date_of_cessation__isnull=True)
            serializer = self.get_serializer(instance, many=True)
            return Response(serializer.data)
        except FlatMemberVehicle.DoesNotExist:
            pass

    def create(self, request, *args, **kwargs):
        unique_member_share = None
        if request.data.get('wing_flat'):
            unique_member_share = Members.objects.get(
                wing_flat=request.data.get('wing_flat'), member_is_primary=True,
                date_of_cessation__isnull=True
            ).pk

        modified_data = request.data.copy()
        modified_data['unique_member_shares'] = unique_member_share
        serializer = self.get_serializer(data=modified_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class HouseHelpView(viewsets.ModelViewSet):
    queryset = HouseHelp.objects.all()
    serializer_class = HouseHelpSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['=house_help_aadhar_number','=house_help_pan_number']


class HouseHelpAllocationView(viewsets.ModelViewSet):
    queryset = HouseHelpAllocationMaster.objects.all()
    serializer_class = HouseHelpAllocationSerializer

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        # Prefetch related member data to avoid N+1 queries
        queryset = queryset.select_related('wing_flat')

        # Add member's name to each serialized HouseHelp object
        for house_help_obj in serializer.data:
            # Code to get wing flat object
            wing_flat = house_help_obj['wing_flat']
            wing_flat = WingFlatUnique.objects.get(id=wing_flat).wing_flat_unique
            house_help_obj['wing_flat'] = wing_flat

            # Code to get member name
            member_name = house_help_obj['member_name']
            member_name = Members.objects.get(id=member_name).member_name
            house_help_obj['member_name'] = member_name

            # Code to get aadhar/pan
            aadhar_pan = house_help_obj['aadhar_pan']
            aadhar_pan_obj = HouseHelpAllocationMaster.objects.filter(
                Q(aadhar_pan=aadhar_pan) #| Q(house_help_aadhar_number=aadhar_pan)
            ).values("aadhar_pan__house_help_pan_number", "aadhar_pan__house_help_aadhar_number", "aadhar_pan__house_help_name").first()

            # print(aadhar_pan.len())
            # aadhar_pan = HouseHelp.objects.get(id=aadhar_pan).house_help_aadhar_number
            house_help_obj['aadhar_pan'] = aadhar_pan_obj['aadhar_pan__house_help_pan_number']

            # Code to get househelp name
            house_help_obj['house_help_name'] = aadhar_pan_obj['aadhar_pan__house_help_name']


            # Additional field
            house_help_obj['aadhar'] = aadhar_pan_obj['aadhar_pan__house_help_aadhar_number']

        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        updated_serializers = serializer.data

        # Code to customize the serialized data
        wing_flat_id = updated_serializers['wing_flat']
        wing_flat = WingFlatUnique.objects.get(id=wing_flat_id).wing_flat_unique
        updated_serializers['wing_flat'] = wing_flat

        member_id = updated_serializers['member_name']
        member_name = Members.objects.get(id=member_id).member_name
        updated_serializers['member_name'] = member_name

        aadhar_pan = updated_serializers['aadhar_pan']
        aadhar_pan_obj = HouseHelpAllocationMaster.objects.filter(
            Q(aadhar_pan=aadhar_pan)
        ).values("aadhar_pan__house_help_pan_number", "aadhar_pan__house_help_aadhar_number", "aadhar_pan__house_help_name").first()

        updated_serializers['aadhar_pan'] = aadhar_pan_obj['aadhar_pan__house_help_pan_number']
        updated_serializers['house_help_name'] = aadhar_pan_obj['aadhar_pan__house_help_name']
        updated_serializers['aadhar'] = aadhar_pan_obj['aadhar_pan__house_help_aadhar_number']
        return Response(updated_serializers)


class TenantMasterView(viewsets.ModelViewSet):
    queryset = TenantMaster.objects.all()
    serializer_class = TenantMasterSerializers
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['=tenant_aadhar_number','=tenant_pan_number']



class TenantAllocationView(viewsets.ModelViewSet):
    queryset = TenantAllocation.objects.all()
    serializer_class = TenantAllocationSerializers

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        # Prefetch related member data to avoid N+1 queries
        queryset = queryset.select_related('wing_flat')

        # Add member's name to each serialized HouseHelp object
        for house_help_obj in serializer.data:
            # Code to get wing flat object
            wing_flat = house_help_obj['wing_flat']
            wing_flat = WingFlatUnique.objects.get(id=wing_flat).wing_flat_unique
            house_help_obj['wing_flat'] = wing_flat

            # Code to get member name
            member_name = house_help_obj['member_name']
            member_name = Members.objects.get(id=member_name).member_name
            house_help_obj['member_name'] = member_name

            # Code to get aadhar/pan
            aadhar_pan = house_help_obj['aadhar_pan']
            aadhar_pan_obj = TenantAllocation.objects.filter(
                Q(aadhar_pan=aadhar_pan)
            ).values("aadhar_pan__tenant_pan_number", "aadhar_pan__tenant_aadhar_number").first()
            house_help_obj['aadhar_pan'] = aadhar_pan_obj['aadhar_pan__tenant_pan_number']

            # Code to get tenant name
            tenant_name = house_help_obj['tenant_name']
            tenant_name_obj = TenantAllocation.objects.filter(tenant_name=tenant_name).values("tenant_name__tenant_name").first()
            house_help_obj['tenant_name'] = tenant_name_obj['tenant_name__tenant_name']

            # Additional aadhar field
            house_help_obj['aadhar'] = aadhar_pan_obj['aadhar_pan__tenant_aadhar_number']

        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        updated_serializers = serializer.data

        wing_flat = updated_serializers['wing_flat']
        wing_flat = WingFlatUnique.objects.get(id=wing_flat).wing_flat_unique
        updated_serializers['wing_flat'] = wing_flat

        # Code to get member name
        member_name = updated_serializers['member_name']
        member_name = Members.objects.get(id=member_name).member_name
        updated_serializers['member_name'] = member_name

        # Code to get aadhar/pan
        aadhar_pan = updated_serializers['aadhar_pan']
        aadhar_pan_obj = TenantAllocation.objects.filter(
            Q(aadhar_pan=aadhar_pan)
        ).values("aadhar_pan__tenant_pan_number", "aadhar_pan__tenant_aadhar_number").first()
        updated_serializers['aadhar_pan'] = aadhar_pan_obj['aadhar_pan__tenant_pan_number']

        # Code to get tenant name
        tenant_name = updated_serializers['tenant_name']
        tenant_name_obj = TenantAllocation.objects.filter(tenant_name=tenant_name).values("tenant_name__tenant_name").first()
        updated_serializers['tenant_name'] = tenant_name_obj['tenant_name__tenant_name']

        # Additional aadhar field
        updated_serializers['aadhar'] = aadhar_pan_obj['aadhar_pan__tenant_aadhar_number']

        return Response(updated_serializers)


def get_owner_name(request, flat_id):
    try:
        member = Members.objects.get(
            wing_flat=flat_id,
            member_is_primary=True,
            date_of_cessation__isnull=True
        )
        data = {
            "member_name": member.member_name,
            "id": member.pk
        }
    except Members.DoesNotExist:
        data = {
            "member_name": "Not Found.",
            "id": "Not Found."
        }
    return JsonResponse(data)



class MeetingsView(viewsets.ModelViewSet):
    queryset = Meetings.objects.all()
    serializer_class = MeetingsSerializer


class SuggestionsView(viewsets.ModelViewSet):
    queryset = Suggestion.objects.all()
    serializer_class = SuggestionSerializer


class AddNomineesView(viewsets.ModelViewSet):
    queryset = Nominees.objects.all()
    serializer_class = AddNomineesSerializer


def get_last_object(request):
    try:
        last_society_creation = SocietyCreation.objects.first()
        if last_society_creation:
            data = {
                'id': last_society_creation.id,
            }
            return JsonResponse(data)
    except SocietyCreation.DoesNotExist:
        return JsonResponse({'message': 'No objects found'}, status=404)


def get_meeting_type_choices(request):
    # Retrieve the choices from the meeting_type field
    meeting_type_choices = Meetings._meta.get_field('meeting_type').choices

    # Convert choices into a list of dictionaries
    choices_list = [{'value': choice[0], 'label': choice[1]} for choice in meeting_type_choices]

    return JsonResponse(choices_list, safe=False)


from django.core.serializers import serialize
from django.http import JsonResponse

# def get_flat_with_members(request):
#     flats = WingFlatUnique.objects.values('id', 'wing_flat_unique').distinct()[0:2]
#     print("FLATS VALUE=======================================================================================", flats)
#     data = []
#     for flat in flats:
#         members = Members.objects.filter(wing_flat__wing_flat_unique=flat['wing_flat_unique'])
#         serialized_members = MemberSerializersForAttendance(members, many=True).data
#         data.append({
#             "flat_id": flat['id'],
#             "flat_no": flat['wing_flat_unique'],
#             "members": serialized_members
#         })
#     return JsonResponse({"flats": data})


class SaveAttendanceView(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = SaveAttendanceSerializers

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance_id = kwargs.get('pk')
            queryset = Attendance.objects.filter(meeting_id=instance_id)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        except Attendance.DoesNotExist:
            return Response({"error": "Attendance not found."}, status=status.HTTP_404_NOT_FOUND)


def get_flat_with_members(request):
    flats = WingFlatUnique.objects.values('id', 'wing_flat_unique').distinct()
    data = []
    for flat in flats:
        members = Members.objects.filter(wing_flat__wing_flat_unique=flat['wing_flat_unique'])
        serialized_members = MemberSerializersForAttendance(members, many=True).data
        data.append({
            "flat_id": flat['id'],
            "flat_no": flat['wing_flat_unique'],
            "members": serialized_members
        })
    return JsonResponse({"flats": data})


# BELOW CODE TO GET THE NOMINEES DATA FOR NOMINEE - REGISTER
def get_nominees_details(request):
    flats = WingFlatUnique.objects.values('id', 'wing_flat_unique').distinct()
    data = []
    for flat in flats:
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
    return JsonResponse({"flats": data})


class SuggestionView(viewsets.ModelViewSet):
    queryset = Suggestion.objects.all()
    serializer_class = SuggestionSerializers

    # def create(self, request, *args, **kwargs):
    #     return super().create(request, *args, **kwargs)


def get_current_logged_in_user(request):
    return JsonResponse({"user_id": request.user.id})


def get_previous_suggestions(request, meeting_id):
    previous_suggestions = Suggestion.objects.filter(meeting_id=meeting_id)
    serialized_suggestions = SuggestionSerializer(previous_suggestions, many=True)
    return JsonResponse({"previous_suggestions": serialized_suggestions.data})


def get_all_child_investments(parent):
    all_childs = []
    def traverse_children(investment, depth=0):
        children = investment.children.all()
        if children:
            for child in children:
                # show = f" {'---' * depth} {child}"
                show = f"{child}"
                all_childs.append(show)
                traverse_children(child, depth + 1)
    traverse_children(parent)
    return all_childs

class CreateGroupForLedgerView(viewsets.ModelViewSet):
    queryset = Childs.objects.all()
    serializer_class = CreateGroupForLedgerSerializers

    filter_backends = [DjangoFilterBackend,]
    filterset_fields = ['name']

    def create(self, request, *args, **kwargs):
        print('REQUEST====> GROUP', request.data)
        errors = {}
        go_further = True
        name = request.data.get('name')
        parent_name = request.data.get('parent')
        super_parent = request.data.get('superParent')
        # already_exists = Childs.objects.filter(name=name, parent__name=parent_name).exists()
        # if not parent_name:
        #     already_exists = Childs.objects.filter(name=name, parent__name=super_parent).exists()

        # if name == parent_name:
        #     errors['same_child_parent'] = 'Pls input different name! Child and Parent cannot be same!'

        if not name:
            errors['group_name'] = 'Group Name Is Required'

        if not super_parent:
            errors['parent_name'] = 'Parent Name Is Required'

        if parent_name and not Childs.objects.filter(name=parent_name).exists():
            errors['sub_group_error'] = f'This grp does not exists!'

        # if already_exists:
        #     errors['already_exist'] = 'Group Already Exists'

        if Childs.objects.filter(name=name).exists():
            errors['already_exist'] = f'This should be unique, "{name}" already exists!'

        if errors:
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            super_parent_obj = Childs.objects.get(name=super_parent)
        except Childs.DoesNotExist:
            super_parent_obj = Childs.objects.create(name=super_parent)

        if not parent_name:
            go_further = False
            child = Childs.objects.create(name=name, parent=super_parent_obj)

        try:
            # Check if the parent already exists under the superParent
            parent = Childs.objects.get(name=parent_name)
        except Childs.DoesNotExist:
            if go_further:
                # If the parent doesn't exist under the superParent, create it
                parent = Childs.objects.create(name=parent_name)

        # Create the child under the parent
        if go_further:
            child = Childs.objects.create(name=name, parent=parent)

        serializer = self.get_serializer(child)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


    def partial_update(self, request, *args, **kwargs):
        data = request.data.copy()
        name = data.get('name')
        parent_data = data.get('parent')
        super_parent = data.get('superParent')
        parent_name = Childs.objects.get(name=super_parent).id
        if parent_data:
            parent_name = Childs.objects.get(name=parent_data).id
        data['parent'] = parent_name
        request._full_data = data
        return self.update(request, *args, **kwargs)


    @action(detail=False, methods=['get'])
    def select_ledger_group(self, request, group_name):
        try:
            parent_investment = Childs.objects.get(name=group_name)
            all_child_investments = get_all_child_investments(parent_investment)
            sub_group = sorted(list(all_child_investments))
        except Childs.DoesNotExist:
            sub_group = []

        if group_name == 'all':
            sub_group = sorted(list(Childs.objects.all().values_list('name', flat=True)))
        return JsonResponse({"sub_group": sub_group})


class CostCenterView(viewsets.ModelViewSet):
    queryset = CostCenter.objects.all()
    serializer_class = CostCenterSerializers

    @action(detail=False, methods=['get'])
    def select_cost_center(self, request):
        all_cost_centers = CostCenter.objects.all().values_list('name', flat=True).order_by('name')
        return JsonResponse({"cost_centers": list(all_cost_centers)})

    def create(self, request, *args, **kwargs):
        errors = {}
        name = request.data.get('name')
        parent_name = request.data.get('parent')

        if not name:
            errors['group_name'] = 'Cost Center Name Is Required'
        if not parent_name:
            errors['under_group'] = 'Please Select Under Group'
        if CostCenter.objects.filter(name=name, parent__name=parent_name).exists():
            errors['already_exist'] = f'Pls select different name, "{name}" under group "{parent_name}" already exists!'

        if errors:
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            parent = CostCenter.objects.get(name=parent_name)
        except CostCenter.DoesNotExist:
            parent = None

        child = CostCenter.objects.create(name=name, parent=parent)
        serialized_data = CostCenterSerializers(child).data
        return Response(serialized_data, status=status.HTTP_201_CREATED)


    # def patch(self, request, *args, **kwargs):
    #     print(request.data)
    #     return Response("PATCH request processed successfully", status=status.HTTP_200_OK)
    #     errors = {}
    #     name = request.data.get('name')
    #     parent_name = request.data.get('parent')

    #     if not name:
    #         errors['group_name'] = 'Cost Center Name Is Required'
    #     if not parent_name:
    #         errors['under_group'] = 'Please Select Under Group'
    #     if CostCenter.objects.filter(name=name, parent__name=parent_name).exists():
    #         errors['already_exist'] = f'Pls select different name, "{name}" under group "{parent_name}" already exists!'

    #     if errors:
    #         return Response(errors, status=status.HTTP_400_BAD_REQUEST)

    #     try:
    #         parent = CostCenter.objects.get(name=parent_name)
    #     except CostCenter.DoesNotExist:
    #         parent = None

    #     child = CostCenter.objects.create(name=name, parent=parent)
    #     serialized_data = CostCenterSerializers(child).data
    #     return Response(serialized_data, status=status.HTTP_201_CREATED)


class VoucherTypeView(viewsets.ModelViewSet):
    queryset = VoucherType.objects.all()
    serializer_class = VoucherTypeSerializer

    filter_backends = [DjangoFilterBackend, ]
    filterset_fields = ['voucher_type']

    def get_serializer_class(self):
        if self.action in ['create', 'retrieve', 'partial_update', 'update']:
            return VoucherTypeSerializer
        return VoucherTypeDisplaySerializer

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        voucher_indexing = request.data.get('voucher_indexing')
        voucher_serializer = self.get_serializer(instance, data=request.data, partial=True)
        if voucher_serializer.is_valid():
            voucher_instance = voucher_serializer.save()

            if voucher_indexing:
                for item in voucher_indexing:
                    voucher_indexing_id = item.get('id')
                    if voucher_indexing_id:
                        voucher_instance = VoucherIndexing.objects.get(pk=voucher_indexing_id)
                        voucher_serializer = VoucherIndexingSerializer(
                            voucher_instance, data=item, partial=True
                        )
                    # else:
                    #     voucher_serializer = VoucherIndexingSerializer(data=item)
                        if voucher_serializer.is_valid():
                            voucher_serializer.save(member_name=voucher_instance)
                        else:
                            return Response(voucher_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return super().partial_update(request, *args, **kwargs)



def increment_number(original_number):
    starts_with_zero = original_number.startswith('0')
    number_as_int = int(original_number)
    incremented_number = number_as_int + 1
    if starts_with_zero:
        original_length = len(original_number)
        incremented_number_str = str(incremented_number).zfill(original_length)
    else:
        incremented_number_str = str(incremented_number)

    return incremented_number_str



class VoucherIndexingView(viewsets.ModelViewSet):
    queryset = VoucherIndexing.objects.all()
    serializer_class = VoucherIndexingSerializer

    def create(self, request, *args, **kwargs):
        print("request data===============", request.data)
        return super().create(request, *args, **kwargs)

    # GET VOUCHER INDEXING BASED ON ID OF VOUCHTER TYPE
    @action(detail=False, methods=['get'])
    def get_voucher_indexing(self, request, *args, **kwargs):
        voucher_type_id = kwargs.get('voucher_type_id')
        try:
            instances = VoucherIndexing.objects.filter(voucher_type=voucher_type_id)
        except VoucherIndexing.DoesNotExist:
            return Response(data={"message": "Voucher not found"})

        serializer = VoucherIndexingSerializer(instances, many=True, context={'request': request, 'view': self})
        return Response(serializer.data)

    # FETCH VOUCHER NUMBER BASED ON VOUCHER SELECTED
    @action(detail=False, methods=['get'])
    def get_voucher_number(self, request, *args, **kwargs):
        voucher_type_id = kwargs.get('voucher_type_id')
        try:
            results = {}
            current_time = timezone.now().date()
            instances = VoucherIndexing.objects.filter(voucher_type=voucher_type_id)
            print("voucher type id====>", instances.values('id'))

            # Get the last object from the voucher creating table
            if instances:
                voucher_obj = VoucherCreationModel.objects.filter(~Q(prefix=''), Q(voucher_type__voucher_type = instances.values('voucher_type__voucher_type')[0]['voucher_type__voucher_type']))
                if voucher_obj:
                    voucher_obj = voucher_obj.latest('id')
                    print("latest object for recript voucher is: ", voucher_obj.pk)

            # Taking common increment for all the vouchers, it'll start from the number which does'nt have any voucher indeing created.
            # If we want to make increment voucher specific we need to take one more url parameter which is voucher_type.


            latest_number = ''
            latest_voucher_without_suffix = VoucherCreationModel.objects.filter(prefix='')
            if latest_voucher_without_suffix:
                latest_number = latest_voucher_without_suffix.latest('id')
                print("latest number is:===>", latest_number)

            if not instances:
                num = 1
                if latest_number:
                    num = increment_number(latest_number.suffix)

                inc_suffix = num
                print("inc_suffix", inc_suffix)
                results.update({
                    'voucher_number': inc_suffix,
                    'suffix': inc_suffix,
                    'prefix': '',
                })

            for dates in instances:
                if dates.from_date <= current_time <= dates.to_date:
                    if voucher_obj and dates.prefix == voucher_obj.prefix:
                        print("went in if")
                        inc_suffix = increment_number(voucher_obj.suffix)
                        new_voucher = voucher_obj.prefix + inc_suffix
                        results.update({
                            'voucher_number': new_voucher,
                            'suffix': inc_suffix,
                            'prefix': voucher_obj.prefix
                        })
                        break
                    else:
                        results.update({
                            'voucher_number': dates.voucher_number,
                            'suffix': dates.suffix,
                            'prefix': dates.prefix
                        })
                        break
                else:
                    print("went in else")
                    num = 1
                    print("latest_number========", latest_number)
                    if latest_number:
                        num = increment_number(latest_number.suffix)

                    inc_suffix = num
                    results.update({
                        'voucher_number': inc_suffix,
                        'suffix': inc_suffix,
                        'prefix': ''
                    })

        except VoucherIndexing.DoesNotExist:
            return Response(data={"message": "Voucher not found"})

        return Response(results)


class UnitTestView(viewsets.ModelViewSet):
    queryset = UnitTest.objects.all()
    serializer_class = UnitTestSerializer

    def get_serializer_class(self):
        if self.action in ['create', 'retrieve', 'partial_update', 'update']:
            return UnitTestPostSerializer
        return UnitTestSerializer

    def create(self, request, *args, **kwargs):
        modified_data = request.data.copy()
        modified_data['raised_by'] = self.request.user.pk
        serializer = self.get_serializer(data=modified_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        for test_case in serializer.data:
            raised_by = User.objects.get(id=test_case['raised_by']).username
            test_case['raised_by'] = raised_by
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def get_bug_type_dropdown(self, request, *args, **kwargs):
        choices = [
            {'value': choice[0], 'label': choice[1]} for choice in bug_type
        ]
        return Response(choices)

    @action(detail=False, methods=['get'])
    def get_test_status_dropdown(self, request, *args, **kwargs):
        choices = [
            {'value': choice[0], 'label': choice[1]} for choice in bug_status
        ]
        return Response(choices)

    @action(detail=False, methods=['get'])
    def get_review_dropdown(self, request, *args, **kwargs):
        choices = [
            {'value': choice[0], 'label': choice[1]} for choice in review_status
        ]
        return Response(choices)


class LedgerView(viewsets.ModelViewSet):
    queryset = Ledger.objects.all()
    serializer_class = LedgerSerializers

    # @action(detail=False, methods=['get'])
    # def get_ledgers(self, request):
    #     ledgers = []
    #     ledger = request.GET.get('ledger', None)
    #     group_list = request.GET.get('group_list', None)

    #     if(group_list):
    #         group_names = group_list.split(',')
    #         ledgers = Ledger.objects.filter(group_name=group_names)
    #         serialized_ledgers = LedgerSerializers(ledgers, many=True)
    #         ledgers = serialized_ledgers.data
    #     return Response({"ledgers": ledgers}, status=status.HTTP_200_OK)


class PurchaseVoucherView(viewsets.ModelViewSet):
    queryset = PurchaseVoucherModel.objects.all()
    serializer_class = PurchaseVoucherSerializers


class StockOnLedgerView(viewsets.ModelViewSet):
    queryset = StockOnLedgerModel.objects.all()
    serializer_class = StockOnLedgerModelSerializers


def calculate_running_balance(grp_name, debit, credit, running_balance):
    api_url = f'http://127.0.0.1:8000/group_data/{grp_name}/'
    child_obj = None
    new_balance = 0

    try:
        response = requests.get(api_url)
        if response.status_code == 200:
            data = response.json()
            child_obj = data['groups'][0]['super_parent']

    except requests.exceptions.RequestException as e:
        print("Something went wrong")


    if child_obj is not None:
        x = str(child_obj)
        print("child object is======", x)

        if str(child_obj) in ['Assets', 'Expenses']:
            if debit is not None:
                new_balance = running_balance + float(debit)
            else:
                new_balance = running_balance - float(credit)

        elif str(child_obj) in ['Liabilities', 'Income']:
            if debit is not None:
                new_balance = running_balance - float(debit)
            else:
                print(f"going in 2========== running bal: {running_balance}, credit bal {credit}")
                new_balance = running_balance + float(credit)

    return new_balance


# for purchase & sale
class VoucherCreationForPurSaleView(viewsets.ModelViewSet):
    queryset = VoucherCreationModel.objects.all()
    serializer_class = VoucherCreationSerializers

    def create(self, request, *args, **kwargs):
        # Step 1: Save the main voucher data
        voucher_serializer = self.get_serializer(data=request.data)
        voucher_serializer.is_valid(raise_exception=True)
        voucher = voucher_serializer.save()
        headers = self.get_success_headers(voucher_serializer.data)

        # STEP 2: Save RelatedStockModel instances
        stock_list = request.data.get('stocks', [])
        for stock_data in stock_list:
            stock_data['voucher_type'] = voucher.id  # Link the voucher
            stock_serializer = RelatedStockSerializers(data=stock_data)
            if stock_serializer.is_valid():
                stock_serializer.save()
            else:
                return Response(stock_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Deciding if it is a purchase or sales voucher
        details = []
        if request.data['voucher_name'] == 'purchase_voucher':
            details = ['Purchases', request.data['total_purchases'], None, 'Expenses']
        elif request.data['voucher_name'] == 'sale_voucher':
            details = ['Sales', None, request.data['total_sales'], 'Income']

        # FIRST RUN: FROM PURCHASE TO VENDOR
        running_balance = GeneralLedger.objects.filter(from_ledger=Ledger.objects.get(ledger_name=details[0])).order_by('id').last()
        if running_balance:
            running_balance = running_balance.balance
        else:
            running_balance = 0

        get_running_balance = calculate_running_balance(
            Childs.objects.get(name=details[3]).id,
            details[1],    # debit amount for purchase else credit
            details[2],
            running_balance
        )

        GeneralLedger.objects.create(
            date = request.data['booking_date'],
            from_ledger = Ledger.objects.get(ledger_name=details[0]),
            particulars = Ledger.objects.get(id=request.data['vendor_name']),
            voucher_type = VoucherType.objects.get(id=request.data['voucher_type']),
            voucher_number = request.data['voucher_number'],
            debit = details[1],
            credit = details[2],
            balance = get_running_balance
        )

        # SECOND RUN:
        running_balance = GeneralLedger.objects.filter(from_ledger=request.data['vendor_name']).order_by('id').last()
        if running_balance:
            running_balance = running_balance.balance
        else:
            running_balance = 0

        get_running_balance = calculate_running_balance(
            Childs.objects.get(name=Ledger.objects.get(id=request.data['vendor_name']).group_name).id,
            details[2],
            details[1],    # credit amount for purchase else debit
            running_balance
        )

        GeneralLedger.objects.create(
            date = request.data['booking_date'],
            from_ledger = Ledger.objects.get(id=request.data['vendor_name']),
            particulars = Ledger.objects.get(ledger_name=details[0]),
            voucher_type = VoucherType.objects.get(id=request.data['voucher_type']),
            voucher_number = request.data['voucher_number'],
            debit = details[2],
            credit = details[1],
            balance = get_running_balance
        )
        return Response(voucher_serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class VoucherCreationView(viewsets.ModelViewSet):
    queryset = VoucherCreationModel.objects.all()
    serializer_class = VoucherCreationSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['voucher_type__voucher_type']

    def get_serializer_class(self):
        if self.action in ['create', 'retrieve', 'partial_update', 'update']:
            return VoucherCreationSerializers
        return VoucherCreationSerializersReadOnly

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        # Step 1: Save the main voucher data
        voucher_serializer = self.get_serializer(data=request.data)
        voucher_serializer.is_valid(raise_exception=True)
        voucher = voucher_serializer.save()

        # Step 2: Save related ledgers
        related_ledgers_data = request.data.get('related_ledgers', [])
        for ledger_data in related_ledgers_data:
            print("related legder is>-----------", ledger_data)
            ledger_data['voucher_type'] = voucher.id  # Link the voucher
            ledger_serializer = RelatedLedgersSerializers(data=ledger_data)
            if ledger_serializer.is_valid():
                related_ledger = ledger_serializer.save()
            else:
                return Response(ledger_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


            # Step 3: Save against refrence
            against_refrence_data = ledger_data.get('against_refrence', [])
            for against_refrence in against_refrence_data:
                against_refrence['voucher_type'] = voucher.id  # Link the related ledger
                against_refrence['against_related_ledger'] = related_ledger.id  # Link the related ledger
                against_refrence_serializer = AgainstRefrenceSerializers(data=against_refrence)
                if against_refrence_serializer.is_valid():
                    against_refrence_serializer.save()
                else:
                    return Response(against_refrence_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


            # Step 3: Save cost centers for each related ledger
            # cost_centers_data = ledger_data.get('cost_center', [])
            # for cost_center_data in cost_centers_data:
            #     cost_center_data['related_ledger'] = related_ledger.id  # Link the related ledger
            #     cost_center_serializer = CostCenterOnLedgerSerializers(data=cost_center_data)
            #     if cost_center_serializer.is_valid():
            #         cost_center_serializer.save()
            #     else:
            #         return Response(cost_center_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


        headers = self.get_success_headers(voucher_serializer.data)

        # from top to bottom
        first_val = request.data['related_ledgers'][0]['payment_option']
        last_val = request.data['related_ledgers'][-1]['payment_option']
        first_done = True
        single_val_condn = True
        final_val = []
        for index, req in enumerate(request.data['related_ledgers'][1:]):
            if req['payment_option'] == first_val:
                if first_done:
                    print("1-------------------------------------------------------")
                    final_val.append({request.data['related_ledgers'][0]['ledger_name'], request.data['related_ledgers'][-1]['ledger_name']})
                    running_balance = GeneralLedger.objects.filter(from_ledger=request.data['related_ledgers'][0]['ledger_name']).order_by('id').last()
                    if running_balance:
                        running_balance = running_balance.balance
                    else:
                        running_balance = 0

                    new_balance = 0
                    debit = request.data['related_ledgers'][index].get('debit_amt', None)
                    credit = request.data['related_ledgers'][index].get('credit_amt', None)

                    get_running_balance = calculate_running_balance(
                        Childs.objects.get(name=Ledger.objects.get(id=request.data['related_ledgers'][0]['ledger_name']).group_name).id, # FROM LEDGER ONE
                        debit,
                        credit,
                        running_balance
                    )

                    GeneralLedger.objects.create(
                        date = request.data['booking_date'],
                        from_ledger = Ledger.objects.get(id=request.data['related_ledgers'][0]['ledger_name']),
                        particulars = Ledger.objects.get(id=request.data['related_ledgers'][-1]['ledger_name']),
                        voucher_type = VoucherType.objects.get(id=request.data['voucher_type']),
                        voucher_number = request.data['voucher_number'],
                        debit = request.data['related_ledgers'][index].get('debit_amt', None),
                        credit = request.data['related_ledgers'][index].get('credit_amt', None),
                        balance = get_running_balance
                    )
                    first_done = False

                if first_val != last_val:
                    final_val.append({req['ledger_name'], request.data['related_ledgers'][-1]['ledger_name']})
                    running_balance = GeneralLedger.objects.filter(from_ledger=req['ledger_name']).order_by('id').last()
                    if running_balance:
                        running_balance = running_balance.balance
                    else:
                        running_balance = 0

                    new_balance = 0
                    debit = request.data['related_ledgers'][index + 1].get('debit_amt', None)
                    credit = request.data['related_ledgers'][index + 1].get('credit_amt', None)
                    print("2--------------------------coming here----------------------debit amt is-------", debit)

                    get_running_balance = calculate_running_balance(
                        Childs.objects.get(name=Ledger.objects.get(id=req['ledger_name']).group_name).id, # FROM LEDGER ONE
                        debit,
                        credit,
                        running_balance
                    )

                    GeneralLedger.objects.create(
                        date = request.data['booking_date'],
                        from_ledger = Ledger.objects.get(id=req['ledger_name']),
                        particulars = Ledger.objects.get(id=request.data['related_ledgers'][-1]['ledger_name']),
                        voucher_type = VoucherType.objects.get(id=request.data['voucher_type']),
                        voucher_number = request.data['voucher_number'],
                        debit = request.data['related_ledgers'][index + 1].get('debit_amt', None),
                        credit = request.data['related_ledgers'][index + 1].get('credit_amt', None),
                        balance = get_running_balance
                    )
                    single_val_condn = False

            elif single_val_condn:
                print("3-------------------------------------------------------")
                print("ledger number is=================",Ledger.objects.get(id=request.data['related_ledgers'][0]['ledger_name']).group_name)

                single_val_condn = False
                final_val.append({request.data['related_ledgers'][0]['ledger_name'], request.data['related_ledgers'][-1]['ledger_name']})
                running_balance = GeneralLedger.objects.filter(from_ledger=request.data['related_ledgers'][0]['ledger_name']).order_by('id').last()
                if running_balance:
                    running_balance = running_balance.balance
                else:
                    running_balance = 0

                new_balance = 0
                debit = request.data['related_ledgers'][index].get('debit_amt', None)
                credit = request.data['related_ledgers'][index].get('credit_amt', None)

                get_running_balance = calculate_running_balance(
                    Childs.objects.get(name=Ledger.objects.get(id=request.data['related_ledgers'][0]['ledger_name']).group_name).id, # FROM LEDGER ONE
                    debit,
                    credit,
                    running_balance
                )

                GeneralLedger.objects.create(
                        date = request.data['booking_date'],
                        from_ledger = Ledger.objects.get(id=request.data['related_ledgers'][0]['ledger_name']),
                        particulars = Ledger.objects.get(id=request.data['related_ledgers'][-1]['ledger_name']),
                        voucher_type = VoucherType.objects.get(id=request.data['voucher_type']),
                        voucher_number = request.data['voucher_number'],
                        debit = request.data['related_ledgers'][index].get('debit_amt', None),
                        credit = request.data['related_ledgers'][index].get('credit_amt', None),
                        balance = get_running_balance
                    )

        # from bottom to top
        first_val = request.data['related_ledgers'][-1]['payment_option']
        last_val = request.data['related_ledgers'][0]['payment_option']
        first_done = True
        single_val_condn_rev = True
        reverse_val = []
        length = len(request.data['related_ledgers'])
        reverse_order = request.data['related_ledgers'][::-1]
        for index, req in enumerate(reverse_order[1:]):
            if req['payment_option'] == first_val:
                if first_done:
                    print("4-------------------------------------------------------")
                    reverse_val.append({request.data['related_ledgers'][-1]['ledger_name'], request.data['related_ledgers'][0]['ledger_name']})
                    running_balance = GeneralLedger.objects.filter(from_ledger=request.data['related_ledgers'][-1]['ledger_name']).order_by('id').last()
                    if running_balance:
                        running_balance = running_balance.balance
                    else:
                        running_balance = 0

                    new_balance = 0
                    debit = request.data['related_ledgers'][length - 1 - index].get('debit_amt', None)
                    credit = request.data['related_ledgers'][length - 1 - index].get('credit_amt', None)
                    print(f" 500,,,,,,,,,Debit is: {debit}, credit is:{credit}==================")

                    get_running_balance = calculate_running_balance(
                        Childs.objects.get(name=Ledger.objects.get(id=request.data['related_ledgers'][-1]['ledger_name']).group_name).id, # FROM LEDGER ONE
                        debit,
                        credit,
                        running_balance
                    )

                    GeneralLedger.objects.create(
                        date = request.data['booking_date'],
                        particulars = Ledger.objects.get(id=request.data['related_ledgers'][0]['ledger_name']),
                        from_ledger = Ledger.objects.get(id=request.data['related_ledgers'][-1]['ledger_name']),
                        voucher_type = VoucherType.objects.get(id=request.data['voucher_type']),
                        voucher_number = request.data['voucher_number'],
                        debit = request.data['related_ledgers'][length - 1 - index].get('debit_amt', None),
                        credit = request.data['related_ledgers'][length - 1 - index].get('credit_amt', None),
                        balance = get_running_balance
                    )
                    first_done = False

                if first_val != last_val:
                    print("5-------------------------------------------------------")
                    reverse_val.append({req['ledger_name'], request.data['related_ledgers'][0]['ledger_name']})

                    running_balance = GeneralLedger.objects.filter(from_ledger=req['ledger_name']).order_by('id').last()
                    if running_balance:
                        running_balance = running_balance.balance
                    else:
                        running_balance = 0

                    new_balance = 0
                    debit = reverse_order[index + 1].get('debit_amt', None)
                    credit = reverse_order[index + 1].get('credit_amt', None)

                    get_running_balance = calculate_running_balance(
                        Childs.objects.get(name=Ledger.objects.get(id=req['ledger_name']).group_name).id, # FROM LEDGER ONE
                        debit,
                        credit,
                        running_balance
                    )

                    GeneralLedger.objects.create(
                        date = request.data['booking_date'],
                        from_ledger = Ledger.objects.get(id=req['ledger_name']),
                        particulars = Ledger.objects.get(id=request.data['related_ledgers'][0]['ledger_name']),
                        voucher_type = VoucherType.objects.get(id=request.data['voucher_type']),
                        voucher_number = request.data['voucher_number'],
                        debit = reverse_order[index + 1].get('debit_amt', None),
                        credit = reverse_order[index + 1].get('credit_amt', None),
                        balance = get_running_balance
                    )
                    single_val_condn_rev = False

            elif single_val_condn_rev:
                print("6-------------------------------------------------------")
                single_val_condn_rev = False
                reverse_val.append({request.data['related_ledgers'][-1]['ledger_name'], request.data['related_ledgers'][0]['ledger_name']})

                running_balance = GeneralLedger.objects.filter(from_ledger=request.data['related_ledgers'][-1]['ledger_name']).order_by('id').last()
                if running_balance:
                    running_balance = running_balance.balance
                else:
                    running_balance = 0

                new_balance = 0
                debit = request.data['related_ledgers'][length - 1].get('debit_amt', None)
                credit = request.data['related_ledgers'][length - 1].get('credit_amt', None)

                get_running_balance = calculate_running_balance(
                    Childs.objects.get(name=Ledger.objects.get(id=request.data['related_ledgers'][-1]['ledger_name']).group_name).id, # FROM LEDGER ONE
                    debit,
                    credit,
                    running_balance
                )

                GeneralLedger.objects.create(
                        date = request.data['booking_date'],
                        from_ledger = Ledger.objects.get(id=request.data['related_ledgers'][-1]['ledger_name']),
                        particulars = Ledger.objects.get(id=request.data['related_ledgers'][0]['ledger_name']),
                        voucher_type = VoucherType.objects.get(id=request.data['voucher_type']),
                        voucher_number = request.data['voucher_number'],
                        debit = request.data['related_ledgers'][length - 1].get('debit_amt', None),
                        credit = request.data['related_ledgers'][length - 1].get('credit_amt', None),
                        balance = get_running_balance
                    )

        # # RUNNING AMT CALCULATION START
        # for req in request.data['related_ledgers']:

        #     print('break ==================')
        return Response(voucher_serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class RelatedLedgersView(viewsets.ModelViewSet):
    # queryset = RelatedLedgersModel.objects.all()
    serializer_class = RelatedLedgersSerializers

    # def get_queryset(self):
    #     return RelatedLedgersModel.objects.filter(voucher_type_id=self.kwargs['parent_id']).values('ledger_name__ledger_name')
    def get_serializer_class(self):
        if self.action in ['create', 'retrieve', 'partial_update', 'update']:
            return RelatedLedgersSerializers
        return RelatedLedgersReadOnlySerializers

    def get_queryset(self):
        parent_id = self.kwargs.get('parent_id')
        print("parent id========", parent_id)
        if parent_id is not None:
            return RelatedLedgersModel.objects.filter(voucher_type_id=parent_id)
        else:
            return RelatedLedgersModel.objects.none()


class RelatedStockView(viewsets.ModelViewSet):
    queryset = RelatedStockModel.objects.all()
    serializer_class = RelatedStockSerializers

    def retrieve(self, request, *args, **kwargs):
        instance_id = kwargs.get('pk')
        queryset = self.queryset.filter(voucher_type=instance_id)
        if not queryset.exists():
            return Response({"error": "Stock details not found!"}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


# To display the against refrences vouchers, another one below is for self like normal CRUD
class AgainstRefrenceView(viewsets.ModelViewSet):
    queryset = AgainstRefrenceModel.objects.all()
    serializer_class = AgainstRefrenceSerializers
    filter_backends = [DjangoFilterBackend,]
    filterset_fields = ['against_related_ledger_id']

    def list(self, request, *args, **kwargs):
        ledger = request.query_params.get('ledger', None)
        combined_qs = []

        if ledger:
            against_refrence_obj = Ledger.objects.get(id=ledger).allow_against_refrence
            if against_refrence_obj == 'YES':
                try:
                    general_ledger_obj = GeneralLedger.objects.filter(from_ledger=ledger)
                    qs = self.queryset.filter(against_related_ledger__ledger_name=ledger).values('voucher_number', 'voucher_date', 'pending_amt', 'final_amt')

                    latest_entries = (self.queryset.filter(against_related_ledger__ledger_name=ledger).values('voucher_number').annotate(max_id=Max('id')).values('max_id'))
                    distinct_latest_entries = (self.queryset.filter(id__in=Subquery(latest_entries)))

                    for i in distinct_latest_entries.values('voucher_number', 'voucher_date', 'pending_amt', 'final_amt'):
                        print("going in against ledger")
                        combined_qs.append(i)
                    final_dict = {}
                    print("going in general ledger", general_ledger_obj.values())
                    for i in general_ledger_obj.values():
                        if i['voucher_number'] not in qs.values_list('voucher_number', flat=True):
                            amt = i['credit']
                            if i['debit']:
                                amt = i['debit']
                            if amt is not None:
                                final_dict = {
                                    'voucher_number': i['voucher_number'],
                                    'voucher_date': i['date'],
                                    'pending_amt': amt,
                                    'final_amt': amt
                                }
                                combined_qs.append(final_dict)
                except requests.exceptions.RequestException as e:
                    print("Something went wrong: ", e)

        if combined_qs:
            return Response(combined_qs)
        else:
            return Response({"message": "No objects available."}, status=status.HTTP_404_NOT_FOUND)



# BKP CODE 2
# # qs = self.queryset.filter(against_related_ledger__ledger_name=ledger).
#                 # values('voucher_number', 'voucher_date', 'pending_amt', 'final_amt').order_by('voucher_number', '-id').distinct('voucher_number')
#                 # Subquery to get the latest ID for each voucher_number
#                 latest_ids = self.queryset.filter(
#                     against_related_ledger__ledger_name=ledger
#                 ).order_by('voucher_number', '-id').distinct('voucher_number').values('id')

#                 # Main query to get the latest voucher entries based on the latest IDs
#                 qs = self.queryset.filter(
#                     id__in=Subquery(latest_ids)
#                 ).values(
#                     'voucher_number', 'voucher_date', 'pending_amt', 'final_amt'
#                 )



# BKP CODE
# class AgainstRefrenceView(viewsets.ModelViewSet):
#     queryset = AgainstRefrenceModel.objects.all()
#     serializer_class = AgainstRefrenceSerializers
#     filter_backends = [DjangoFilterBackend,]
#     filterset_fields = ['against_related_ledger_id']

#     def list(self, request, *args, **kwargs):
#         ledger = request.query_params.get('ledger', None)
#         filtered_qs = self.queryset.filter(against_related_ledger_id=ledger)

#         combined_qs = []
#         if ledger:
#             # ledger_under_grp = Ledger.objects.get(id=ledger).group_name
#             # child_object = Childs.objects.get(name=ledger_under_grp).id
#             # api_url = f'http://127.0.0.1:8000/group_data/{child_object}/'
#             try:
#                 # response = requests.get(api_url)
#                 # if response.status_code == 200:
#                 #     data = response.json()
#                 #     super_parent = data['groups'][0]['super_parent']
#                     # if super_parent == 'Assets':
#                     general_ledger_obj = GeneralLedger.objects.filter(from_ledger=ledger)
#                     qs = self.queryset.filter(against_related_ledger__ledger_name=ledger).values('voucher_number', 'voucher_date', 'pending_amt', 'final_amt')
#                     # print("count is --------------", general_ledger_obj)
#                     final_dict = {}
#                     if qs:
#                         combined_qs.append(qs[0])
#                         # print("combined qs before------>", combined_qs)
#                     for i in general_ledger_obj.values():
#                         if i['voucher_number'] not in qs.values_list('voucher_number', flat=True):
#                             # print("general voucher here, voucher no.", i['voucher_number'])
#                             amt = i['credit']
#                             if i['debit']:
#                                 amt = i['debit']
#                             # if super_parent == "Assets":
#                             final_dict = {
#                                 'voucher_number': i['voucher_number'],
#                                 'voucher_date': i['date'],
#                                 'pending_amt': amt,
#                                 'final_amt': amt
#                             }
#                             combined_qs.append(final_dict)
#                             print("combined qs in if------>", combined_qs)
#                             # elif super_parent == "Liabilities":
#                             #     final_dict = {
#                             #         'voucher_number': i['voucher_number'],
#                             #         'voucher_date': i['date'],
#                             #         'pending_amt': amt,
#                             #         'final_amt': amt
#                             #     }
#                             #     combined_qs.append(final_dict)
#                             #     print("combined qs after------>", combined_qs)

#                     # elif super_parent == 'Liabilities':
#                         # filtered_qs = self.queryset.filter(credit__isnull=True, from_ledger=ledger)
#             except requests.exceptions.RequestException as e:
#                 print("Something went wrong: ", e)

#         if combined_qs:
#             print("cobmined qs printing=======================", combined_qs)
#             return Response(combined_qs)
#         else:
#             return Response({"message": "No objects available."}, status=status.HTTP_404_NOT_FOUND)

#         # if filtered_qs is not None:
#         #     serializer = self.get_serializer(combined_qs, many=True)
#         #     return Response(serializer.data)
#         # else:
#         #     return Response({"message": "No objects available."}, status=status.HTTP_404_NOT_FOUND)


class AgainstRefrenceViewForSelf(viewsets.ModelViewSet):
    queryset = AgainstRefrenceModel.objects.all()
    serializer_class = AgainstRefrenceSerializers
    filter_backends = [DjangoFilterBackend,]
    filterset_fields = ['against_related_ledger_id__ledger_name', 'voucher_type']


class CostCenterOnLedgerView(viewsets.ModelViewSet):
    queryset = CostCenterOnLedger.objects.all()
    serializer_class = CostCenterOnLedgerSerializers


# USEFULL FOR AGAINST REFRENCE ALSO:
class GeneralLedgerView(viewsets.ModelViewSet):
    queryset = GeneralLedger.objects.all()
    serializer_class = GeneralLedgerSerializers


class VistingCardView(viewsets.ModelViewSet):
    queryset = VistingCard.objects.all()
    serializer_class = VistingCardSerializers
