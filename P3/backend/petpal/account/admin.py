from django.contrib import admin
from .models import User,Seeker,Shelter, Blog, Noti

from django.contrib.auth.admin import UserAdmin

# Register your models here.
#admin.site.register(User)
admin.site.register(Seeker)
admin.site.register(Shelter)
admin.site.register(Noti)
admin.site.register(Blog)
