from django.db import models
from .seeker import User

class Shelter(User):
    class Meta:
        verbose_name = 'Shelter'
        verbose_name_plural = 'Shelters'
    
    mission = models.CharField(max_length=255,blank=True, null=True)
    
    def __str__(self):
        return f"{self.username}"