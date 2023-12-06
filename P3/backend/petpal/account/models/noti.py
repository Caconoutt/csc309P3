from django.db import models
from .seeker import User
from datetime import datetime 
from django.urls import reverse

class Noti(models.Model):
    class Meta:
        verbose_name = 'Noti'
        verbose_name_plural = 'Notis'
    is_read = models.BooleanField(default=False)
    msg = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete = models.CASCADE)
    created_at = models.DateTimeField(default=datetime.now)
    case = models.CharField(max_length=255, null=True, blank=True)
    review_id = models.PositiveIntegerField(null=True, blank=True)
    reply_id= models.PositiveIntegerField(null=True, blank=True)
    shelter_id = models.PositiveIntegerField(null=True, blank=True)
    application_id = models.PositiveIntegerField(null=True, blank=True)
    message_id = models.PositiveIntegerField(null=True, blank=True)
    
    def __str__(self):
        return f"To {self.owner.username}"
    
    def get_review_url(self):
        if self.case == 'review':
            return reverse('shelter-review-detail', args=[self.shelter_id, self.review_id])
        elif self.case == 'reply':
            return reverse('review-reply-detail', args=[self.review_id, self.reply_id])
        elif self.case == 'message':
            return reverse('application-comment-detail', args=[self.application_id, self.message_id])
        elif self.case == 'application':
            return reverse('application-detail', args=[self.application_id])
        else:
            # Default case or handle any other conditions
            return 
        
    