from django.contrib import admin
from comment.models.comment import Reply, Review, Chat
# from .models.noti import Noti
from django.contrib.auth.admin import UserAdmin
from account.models import User,Seeker,Shelter

# Register your models here.
# admin.site.register(User)
# admin.site.register(Seeker)
# admin.site.register(Shelter)
# admin.site.register(Noti)
admin.site.register(Review)
admin.site.register(Reply)
admin.site.register(Chat)