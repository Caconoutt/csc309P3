from django.db import models
from .shelter import Shelter
from .seeker import User
from datetime import datetime 
from django.urls import reverse

#specify the img upload
def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

class Blog(models.Model):
    class Meta:
        verbose_name = 'Blog'
        verbose_name_plural = 'Blogs'
    title = models.CharField(max_length=30)
    content = models.CharField(max_length=288)
    created_at = models.DateTimeField(default=datetime.now)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    image_url = models.ImageField(upload_to=upload_to, blank=True, null=True)