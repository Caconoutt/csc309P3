from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path
from .views import RegisterSeekerAPIView, RetrieveSeeker
from .views import RegisterShelterAPIView, RetrieveShelter
from .views import SeekerRetrieveShelter, ShelterList, ShelterRetrieveSeeker
from. views import NotiList, RetrieveNoti
from. views import LogoutView
from .views import NewBlogAPIView, BlogAPIView, BlogList



urlpatterns = [
  path('seeker/',RegisterSeekerAPIView.as_view()),
  path('seeker/profile/<int:pk>/', RetrieveSeeker.as_view()),
  path('seeker/<int:shelter_id>/', SeekerRetrieveShelter.as_view()),
  path('shelter/',RegisterShelterAPIView.as_view()),
  path('shelter/profile/<int:pk>/', RetrieveShelter.as_view()),
  path('shelter/list/', ShelterList.as_view()),
  path('shelter/seeker/profile/<int:seeker_id>/', ShelterRetrieveSeeker.as_view()),

  #extra feature: shelter blog
  #TODO: should involve shelter_id
  path('shelter/blog/list/', BlogList.as_view()), #shelter list of blog
  path('shelter/blog/', NewBlogAPIView.as_view()), #shelter create own blog
  path('shelter/blog/<int:pk>/', BlogAPIView.as_view()), #shelter update own blog
  #TODO
  #path('shelter/<int:shelter_id>/blog/<int:blog_id>'), #seeker/shelter see the blog

  #logout
  path('logout/', LogoutView.as_view()),

  #login
  path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

  #notification page
  path('noti/',NotiList.as_view()),
  path('noti/<int:noti_id>/',RetrieveNoti.as_view()),




]