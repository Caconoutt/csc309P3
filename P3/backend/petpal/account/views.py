from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import CreateAPIView, RetrieveAPIView, \
  ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, RetrieveDestroyAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from django.urls import reverse
from django.shortcuts import get_object_or_404
from .serializer import RegisterSeekerSerializer,SeekerSerializer
from .serializer import RegisterShelterSerializer,ShelterSerializer, NotiSerializer, ShelterSeekerSerializer
from  .models import Seeker, Shelter, Noti, Blog
from django.http import HttpResponseForbidden
from .permission import IsItself, IsItsNoti, HasActiveApplication, IsShelter,BlogBelongsToYou
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth import logout
from rest_framework import status
from .serializer import NewBlogSerializer, BlogSerializer


class UserTypeView(RetrieveAPIView):
   permission_classes = [IsItself]
   def get(self, request, *args, **kwargs):
     if request.user.is_authenticated:
       if hasattr(request.user, 'seeker'):
         return Response({'user_type': 'seeker'}, status=status.HTTP_200_OK)
       elif hasattr(request.user, 'shelter'):
         return Response({'user_type': 'shelter'}, status=status.HTTP_200_OK)
       else:
         return Response({'user_type': 'none'}, status=status.HTTP_200_OK)
     else:
       return Response({'user_type': 'none'}, status=status.HTTP_200_OK)

#Logout
class LogoutView(APIView):
  authentication_classes =[]
  permission_classes = []
  def post(self, request, *args, **kwargs):
      logout(request)
      return Response(status=status.HTTP_200_OK)

#Extra Feature
class NewBlogAPIView(CreateAPIView): #shelter create new blog
  permission_classes = [IsShelter]
  serializer_class = NewBlogSerializer

class BlogAPIView(RetrieveUpdateDestroyAPIView): #shelter update own blog
  permission_classes = [BlogBelongsToYou]
  serializer_class = BlogSerializer
  def get_object(self):
    obj = get_object_or_404(Blog, id=self.kwargs['pk'])
    self.check_object_permissions(self.request, obj)
    return obj
  
class BlogList(ListAPIView): #shelter only view his bloglist
  serializer_class = BlogSerializer
  def get_queryset(self):
    owner = self.request.user
    return Blog.objects.filter(owner=owner)

class RetrieveBlogList(ListAPIView): #others view shelter_id's blog lis
  serializer_class = BlogSerializer
  def get_queryset(self):
    owner = get_object_or_404(Shelter, id=self.kwargs['shelter_id'])
    return Blog.objects.filter(owner=owner)

class RetrieveBlog(RetrieveAPIView): #everyone can view the blog
  serializer_class = BlogSerializer
  def get_object(self):
    shelter = get_object_or_404(Shelter, id=self.kwargs['shelter_id'])
    blog = get_object_or_404(Blog, id=self.kwargs['blog_id'], owner=shelter)
    return blog


#Register Seeker
class RegisterSeekerAPIView(CreateAPIView):
  authentication_classes =[]
  permission_classes = []
  serializer_class = RegisterSeekerSerializer
#Register Shelter
class RegisterShelterAPIView(CreateAPIView):
  authentication_classes =[]
  permission_classes = []
  serializer_class = RegisterShelterSerializer


#Seeker Retrieve themselve
class RetrieveSeeker(RetrieveUpdateDestroyAPIView):
  serializer_class = SeekerSerializer
  permission_classes = [IsItself]
  parser_classes = [MultiPartParser, FormParser]
  def get_object(self):
    obj = get_object_or_404(Seeker, id=self.kwargs['pk'])
    self.check_object_permissions(self.request, obj)
    return obj

#Shelter Retrieve themselve
class RetrieveShelter(RetrieveUpdateDestroyAPIView):
  serializer_class = ShelterSerializer
  permission_classes = [IsItself]
  parser_classes = [MultiPartParser, FormParser]
  def get_object(self):
    obj = get_object_or_404(Shelter, id=self.kwargs['pk'])
    self.check_object_permissions(self.request, obj)
    return obj

#Seeker Retrieve Shelter Profile
class SeekerRetrieveShelter(RetrieveAPIView):
  serializer_class = ShelterSerializer
  def get_object(self):
    return get_object_or_404(Shelter, id=self.kwargs['shelter_id'])

#Shelter Retrieve Seeker Profile
class ShelterRetrieveSeeker(RetrieveAPIView):
  serializer_class = ShelterSeekerSerializer
  permission_classes = [HasActiveApplication]

  def get_object(self):
    obj = get_object_or_404(Seeker, pk=self.kwargs['seeker_id'])
    self.check_object_permissions(self.request, obj)
    return obj

#Shelter List
class ShelterList(ListAPIView):
  serializer_class = ShelterSerializer
  queryset = Shelter.objects.all()

#Pagination
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

#Notification List
class NotiList(ListAPIView):
  serializer_class = NotiSerializer
  pagination_class = StandardResultsSetPagination
  def get_queryset(self):
    notis = Noti.objects.filter(owner=self.request.user)
    
    filter_val = None
    order_by = None
    filter_val = self.request.GET.get('filter')
    order_by = self.request.GET.get('order_by')
    #filter first
    if filter_val is not None:
      if filter_val == 'readed':
        notis = notis.filter(is_read=True)
      elif filter_val == 'unreaded':
        notis = notis.filter(is_read=False)
    #order by time
    if order_by is not None:
      if order_by == 'created_time':
        notis = notis.order_by('-created_at')
    
    return notis


#Notification Single
class RetrieveNoti(RetrieveDestroyAPIView):
  serializer_class = NotiSerializer
  permission_classes = [IsItsNoti]
  def get_object(self):
    noti = get_object_or_404(Noti, id=self.kwargs['noti_id'])
    self.check_object_permissions(self.request, noti)
    noti.is_read = True
    noti.save()
    return noti


