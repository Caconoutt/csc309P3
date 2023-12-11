from rest_framework import serializers
from rest_framework.serializers import ModelSerializer,CharField,DateTimeField,ImageField,EmailField
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .models.seeker import Seeker
from .models.shelter import Shelter
from .models.noti import Noti
from .models.blog import Blog

#Blog
class NewBlogSerializer(ModelSerializer):
  title = CharField(required=True)
  content = CharField(required=True)
  image_url = ImageField(required=False)
  class Meta:
    model = Blog
    fields = ['title', 'content', 'image_url']

  def create(self, validated_data):
    blog = Blog.objects.create(
      owner=self.context['request'].user,
      title=validated_data['title'],
      content=validated_data['content']
    )
    blog.save()
    return blog
  
class BlogSerializer(ModelSerializer):
  title = CharField(required=False)
  content = CharField(required=False)
  image_url = ImageField(required=False)
  class Meta:
    model = Blog
    fields = '__all__'



#Serializer to Register Seeker
class RegisterSeekerSerializer(ModelSerializer):
  email = serializers.EmailField(
    required=True,
    validators=[UniqueValidator(queryset=Seeker.objects.all())]
  )
  password = serializers.CharField(
    write_only=True, required=True, validators=[validate_password])
  password2 = serializers.CharField(write_only=True, required=True)

  class Meta:
    model = Seeker
    fields = ['username', 'email', 'password', 'password2']


  def validate(self, attrs):
    if attrs['password'] != attrs['password2']:
      raise serializers.ValidationError(
        {"password": "Password fields didn't match."})
    return attrs

  def create(self, validated_data):
    user = Seeker.objects.create(
      username=validated_data['username'],
      email=validated_data['email'],
    )
    user.set_password(validated_data['password'])
    user.is_seeker = True
    user.save()

    #create welcome noti
    new_msg = "Hi {username}, welcome to PetPal!"
    noti = Noti.objects.create(
      msg=new_msg.format(username = user.username),
      owner = user,
      case = '',
    )
    return user

#Retrive & Update Seeker profile
class SeekerSerializer(ModelSerializer):
  # username = CharField(read_only = True, allow_null=False)
  # date_joined = DateTimeField(read_only = True, allow_null=False)
  # image_url = ImageField(required=False)
  # email = EmailField(required = False)
  class Meta:
    model = Seeker
    fields = ['username','date_joined','email', 'nickname','contact','location','preference','image_url']
    

#Serializer to Register Shelter
class RegisterShelterSerializer(ModelSerializer):
  email = serializers.EmailField(
    required=True,
    validators=[UniqueValidator(queryset=Seeker.objects.all())]
  )
  password = serializers.CharField(
    write_only=True, required=True, validators=[validate_password])
  password2 = serializers.CharField(write_only=True, required=True)

  class Meta:
    model = Shelter
    fields = ['username', 'email', 'password', 'password2']


  def validate(self, attrs):
    if attrs['password'] != attrs['password2']:
      raise serializers.ValidationError(
        {"password": "Password fields didn't match."})
    return attrs

  def create(self, validated_data):
    user = Shelter.objects.create(
      username=validated_data['username'],
      email=validated_data['email'],
    )
    user.set_password(validated_data['password'])
    user.is_shelter = True
    user.save()
    #create welcome noti
    new_msg = "Hi {username}, welcome to PetPal!"
    noti = Noti.objects.create(
      msg=new_msg.format(username = user.username),
      owner = user,
      case = '',
    )
    noti.save()
    return user

#Retrive & Update Shelter profile
class ShelterSerializer(ModelSerializer):
  # username = CharField(read_only = True, allow_null=False)
  # date_joined = DateTimeField(read_only = True, allow_null=False)
  # image_url = ImageField(required=False, allow_null=True)
  # email = EmailField(required = False, allow_null=True)
  # location = CharField(required=False, allow_null=True)
  class Meta:
    model = Shelter
    fields = ['username','date_joined','email', 'nickname','contact','location','mission','image_url','id']

#Shelter retrieve Seeker Profile
class ShelterSeekerSerializer(ModelSerializer):
  class Meta:
    model = Seeker
    fields = ['username','date_joined','email', 'nickname','contact','location','preference','image_url']


#Noti
class NotiSerializer(ModelSerializer):
  class Meta:
    model = Noti
    fields = '__all__'
    



