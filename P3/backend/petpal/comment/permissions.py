from rest_framework import permissions
from pet.models.application import Application
from django.shortcuts import get_object_or_404
    
class IsApplicationShelterOrApplicant(permissions.BasePermission):
    def has_permission(self, request, view):
        # Extract application ID from URL and get the application instance
        application_id = view.kwargs.get('application_id')  # or adjust according to your URL pattern
        application = get_object_or_404(Application, id=application_id)

        return self.check_user_role(request.user, application)

    def has_object_permission(self, request, view, obj):
        # obj here is the Application instance
        return self.check_user_role(request.user, obj)

    @staticmethod
    def check_user_role(user, application):
        # Check if the user is the applicant of the application
        if application.applicant.pk == user.pk:
            return True

        # Check if the user is the shelter of the application
        if user.is_shelter and application.shelter.pk == user.pk:
            return True

        return False