from django.db import models

#from ...pet.models.pet import Pet
from django.contrib.auth.models import AbstractUser

LOCATION_CHOICES = [
        ('Ontario', 'Ontario'),
        ('British Columbia', 'British Columbia'),
        ('Quebec', 'Quebec'),
        ('Alberta', 'Alberta'),
        ('Nova Scotia', 'Nova Scotia'),
        ('New Brunswick', 'New Brunswick'),
        ('Newfoundland and Labrador', 'Newfoundland and Labrador'),
        ('Saskatchewan', 'Saskatchewan')
    ]
PREFERENCE_CHOICES = [
        ('Cat', 'Cat'),
        ('Dog', 'Dog'),
        ('Both', 'Both'),

        # Add other options as needed
    ]
#specify the img upload
def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)
#shared fields between seeker and shelter
class User(AbstractUser):
    #identifier flag
    is_seeker = models.BooleanField(default=False)
    is_shelter = models.BooleanField(default=False)
    
    #account register relevant
    username = models.CharField(max_length=255, unique = True)
    email = models.EmailField()
    password = models.CharField(max_length=120)
    password2 = models.CharField(max_length=120)
    
    #profile relevant
    nickname = models.CharField(max_length=255,blank=True, null=True)
    contact = models.CharField(max_length=255,blank=True, null=True) # integer field to match
    location = models.CharField(max_length=255, choices=LOCATION_CHOICES,blank=True, null=True)
    image_url = models.ImageField(upload_to=upload_to, blank=True, null=True)

    def __str__(self):
        return f"{self.username}"

class Seeker(User):
    class Meta:
        verbose_name = 'Seeker'
        verbose_name_plural = 'Seekers'
    
    preference = models.CharField(max_length=255, choices=PREFERENCE_CHOICES, blank=True, null=True)
    


