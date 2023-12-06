from django.contrib import admin
from .models.pet import Pet
from .models.application import Application
from django.contrib.auth.admin import UserAdmin

# Register your models here.
#admin.site.register(User)
admin.site.register(Pet)
admin.site.register(Application)