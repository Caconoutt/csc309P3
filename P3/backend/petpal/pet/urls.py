from django.urls import path
from .views.pet_view import *
from .views.application_view import *
from .views.pet_filter_list_view import *
urlpatterns = [ 
    #pet listing:
    path('shelter/petlist/', ShelterPetListCreate.as_view()),
    path('seeker/pets/<int:pk>/', SeekerPetRetrieve.as_view()),
    path('shelter/pet_update/<int:pk>/', ShelterPetListUpdate.as_view()),
    path('shelter/pets/<int:pk>/',ShelterPetRetrieveUpdateDestroy.as_view()),
    path('seeker/<int:shelter_pk>/petlist/',SeekerPetList.as_view()),
    path('list/',PetListView.as_view()),
    #from here is application part:
    path('seeker/pet/<int:pk>/application/', CreateApplicationView.as_view()),
    path('application/<int:pk>/status/', UpdateApplicationView.as_view()),
    path('applications/', ListApplicationView.as_view()),
    path('applications/<int:pk>/', GetApplicationView.as_view(), name='application-detail'),

]