from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView, ListAPIView, UpdateAPIView
from ..models.pet import Pet
#from users.models.shelter import Shelter
from account.models.shelter import Shelter
from ..pet_serializers import BasePetSerializer, PetdetailSerializer, SeekerPetdetailSerializer, PetStatusUpdateSerializer, SeekerPetListSerializer
from account.permission import *


class ShelterPetListCreate(ListCreateAPIView):
    """ Shelter create a pet or view all of pets under it. 
    """
    permission_classes = [IsShelter] #this is the most confusing part trapped me for a long time.
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return SeekerPetdetailSerializer 
        else:
            return BasePetSerializer 

    def get_queryset(self):
        return Pet.objects.filter(shelter=self.request.user)
    
    def perform_create(self, serializer):
        shel = self.request.user
        shelter = shel.shelter
        serializer.save(shelter=shelter)


class ShelterPetListUpdate(UpdateAPIView):
    """for shelter to change status of pet in the pet list"""
    serializer_class = PetStatusUpdateSerializer
    permission_classes = [IsItself_modi]
    
    def get_object(self):
        obj = get_object_or_404(Pet, pk=self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)
        return obj
    
    def perform_update(self, serializer):
        shel = self.request.user
        shelter = shel.shelter
        serializer.save(shelter=shelter)


class ShelterPetRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    """ This is used for shelter to edit a pet under it. check if the pet belongs to
    """
    serializer_class = BasePetSerializer
    permission_classes = [IsItself_modi]
    def get_object(self):
        obj = get_object_or_404(Pet, pk=self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)
        return obj
       

class SeekerPetRetrieve(RetrieveAPIView):
    """ For seeker to view a pet in details
    """
    serializer_class = BasePetSerializer
    permission_classes = [IsSeeker]
    def get_object(self):
        obj = get_object_or_404(Pet, pk=self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)
        return obj
    

class SeekerPetList(ListAPIView):
    """Seeker can see the complete pet listing under a shelter"""
    serializer_class = SeekerPetListSerializer
    permission_classes = [IsSeeker]

    def get_queryset(self):
        shelter = get_object_or_404(Shelter, pk=self.kwargs['shelter_pk'])
        return Pet.objects.filter(shelter = shelter)
