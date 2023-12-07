from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied
from pet.models.application import Application
from account.models.seeker import Seeker

class BlogBelongsToYou(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.id == obj.owner.id:
            return True
        return False
    
class IsSeeker(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_seeker:
            return True
        return False

class IsItself(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.id == obj.id: #view.kwargs['pk']
            return True
        return False
    
class IsItself_modi(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_shelter:
            if request.user.shelter == obj.shelter:
                return True
        return False
    
class IsItselfShelter(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.id == view.kwargs['pk']: 
            return True
        return False


class IsItselfSeeker(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.id == obj.seeker.id: #obj
            return True
        return False

class IsItsNoti(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user == obj.owner: 
            return True
        return False
        

class IsShelter(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_shelter:
            return True
        return False

class HasActiveApplication(permissions.BasePermission):

    message = 'No active application found for this seeker with the shelter'

    def has_object_permission(self, request, view, obj):
        # Assuming 'obj' is the seeker and 'request.user' is the shelter.
        # Check if there is any active application for the seeker to the shelter's pet.
        return Application.objects.filter(
            pet__shelter=request.user,
            applicant=obj
        ).exists()
