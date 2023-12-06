from django.db import models
from account.models.seeker import Seeker
from account.models.shelter import Shelter
from pet.models.application import Application
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class Comment(models.Model):
    detail = models.CharField(max_length = 255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True


class Review(Comment):
    rating = models.PositiveIntegerField() # 1-5

    # for Shelter being reviewed
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE, related_name='review_lst')
   
    # for the reviewer
    content_type1 = models.ForeignKey(ContentType, on_delete=models.CASCADE, related_name='content_type1')
    object_id1 = models.PositiveIntegerField()
    reviewer = GenericForeignKey('content_type1', 'object_id1')
    
    def __str__(self):
        return f"Review by {self.reviewer} for {self.shelter}"
    
class Reply(Comment):

    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='reply_lst')
    # link who write the reply
    content_type2 = models.ForeignKey(ContentType, on_delete=models.CASCADE, related_name='content_type2')
    object_id2 = models.PositiveIntegerField()
    replyer = GenericForeignKey('content_type2', 'object_id2')

    class Meta:
        verbose_name = 'reply'
        verbose_name_plural = 'replies'

    def __str__(self):
        return 'Re: ' + str(self.review.reviewer) + ' for ' + str(self.review.shelter)


class Chat(Comment):
     # for the reviewer
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, related_name='content_type')
    object_id = models.PositiveIntegerField()
    sender = GenericForeignKey('content_type', 'object_id')

    content_type3 = models.ForeignKey(ContentType, on_delete=models.CASCADE, related_name='content_type3')
    object_id3 = models.PositiveIntegerField()
    receiver = GenericForeignKey('content_type3', 'object_id3')

    application = models.ForeignKey(Application,on_delete=models.CASCADE)
    # sender = models.ForeignKey('Shelter', on_delete=models.CASCADE, related_name='chat_lst')
    
