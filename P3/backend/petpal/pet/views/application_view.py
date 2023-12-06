from django.shortcuts import get_object_or_404
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from ..models.pet import Pet
from ..application_serializer import *
from ..permissions import *
from rest_framework.exceptions import PermissionDenied
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import OrderingFilter
from account.models.noti import Noti

class CreateApplicationView(CreateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsSeeker]

    def perform_create(self, serializer):
        pet = get_object_or_404(Pet, id=self.kwargs['pk'])
        seeker_applications = Application.objects.filter(applicant=self.request.user.seeker, pet=pet)
        if seeker_applications.exists():
            raise PermissionDenied("You have already applied for this pet")
        if pet.status == 'Available':
            serializer.save(
                pet=pet, 
                applicant=self.request.user.seeker,
                shelter=pet.shelter,
                status='Pending')

            noti = Noti.objects.create(
                msg=f"A new application has received for {pet.name}",
                owner=pet.shelter,
                application_id=serializer.instance.pk,
                case='application'
            )
            print(f"Message URL: {noti.get_review_url()}")
        else:
            raise PermissionDenied("Pet is not available for application")

class GetApplicationView(ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsApplicationShelterOrApplicant]

    def get_queryset(self):
        return Application.objects.filter(id=self.kwargs['pk'])


class UpdateApplicationView(RetrieveUpdateDestroyAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsApplicationShelterOrApplicant]

    def get_object(self):
        application = get_object_or_404(Application, id=self.kwargs['pk'])
        return application


    def perform_update(self, serializer):
        
        application = self.get_object()
        current_status = application.status
        requested_status = serializer.validated_data.get('status')

        if self.request.user.is_seeker:
            if current_status in ['Pending', 'Accepted'] and requested_status == 'Withdrawn':
                serializer.save(partial=True)
            else:
                raise PermissionDenied("Invalid status update-seeker")

        elif self.request.user.is_shelter:
            if current_status == 'Pending' and requested_status in ['Accepted', 'Denied']:
                serializer.save(partial=True)
            else:
                raise PermissionDenied("Invalid status update-shelter")

        else:
            raise PermissionDenied("You do not have permission to update this application")

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class ListApplicationView(ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsShelterOrSeeker, CanViewOwnApplications]
    filter_backends = [OrderingFilter]
    ordering_fields = ['creation_time', 'last_update_time']
    pagination_class = StandardResultsSetPagination
    

    def get_queryset(self):
        user = self.request.user
        status = self.request.query_params.get('status')
        if user.is_shelter:
            res = Application.objects.filter(shelter=user)
        elif user.is_seeker:
            res = Application.objects.filter(applicant=user)
        if status:
            res = res.filter(status=status)
        return res