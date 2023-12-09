from rest_framework import serializers
from django.contrib.auth.models import User
from .models.comment import Review, Reply, Chat
from django.contrib.contenttypes.models import ContentType

class ReviewSerializer(serializers.ModelSerializer): 
    shelter = serializers.PrimaryKeyRelatedField(read_only=True)
    reviewer = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Review
        fields = ['rating', 'shelter', 'reviewer','detail','created_at','id']


class ReplySerializer(serializers.ModelSerializer):
    review = serializers.PrimaryKeyRelatedField(read_only=True)
    replyer = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Reply
        fields = ['review', 'replyer', 'detail', 'created_at']

class ChatSerializer(serializers.ModelSerializer):
    sender = serializers.PrimaryKeyRelatedField(read_only=True)
    receiver = serializers.PrimaryKeyRelatedField(read_only=True)
    application = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Chat
        fields = ['receiver', 'sender', 'detail', 'application', 'created_at']
