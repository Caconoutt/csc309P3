from rest_framework import permissions
from .models.application import Application 
from django.shortcuts import get_object_or_404


class IsShelterOrSeeker(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_shelter or request.user.is_seeker


class IsSeeker(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_seeker

class CanUpdateOwnApplicationStatus(permissions.BasePermission):
    """
    Permission to allow only updating the status of an application.
    """
    def has_object_permission(self, request, view, obj):
        if request.user.pk == obj.shelter.pk or request.user.pk == obj.applicant.pk:
            return True
        return False

class CanViewOwnApplications(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_shelter and obj.shelter == request.user:
            return True
        return False


class IsApplicationShelterOrApplicant(permissions.BasePermission):
    def has_permission(self, request, view):
        # Extract application ID from URL and get the application instance
        application_id = view.kwargs.get('pk') 
        application = get_object_or_404(Application, id=application_id)

        return self.check_user_role(request.user, application)

    def has_object_permission(self, request, view, obj):
        return self.check_user_role(request.user, obj)

    @staticmethod
    def check_user_role(user, application):
        if application.applicant.pk == user.pk:
            return True
        if user.is_shelter and application.shelter.pk == user.pk:
            return True

        return False