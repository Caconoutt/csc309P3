from django.db import models
from .pet import Pet
from account.models.seeker import Seeker
from account.models.shelter import Shelter
class Application(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Withdrawn', 'Withdrawn'),
        ('Accepted', 'Accepted'),
        ('Denied', 'Denied')
    ]
    
    applicant_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=255) # backend validation
    city = models.CharField(max_length=255)
    household_info = models.CharField(max_length=255)
    pet_history = models.BooleanField(default=False)
    status = models.CharField(max_length=255, choices=STATUS_CHOICES)
    creation_time = models.DateTimeField(auto_now_add=True)
    last_modified_time = models.DateTimeField(auto_now=True)

    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name='application')
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE, related_name='application')
    applicant = models.ForeignKey(Seeker, on_delete=models.CASCADE, related_name='application')
    