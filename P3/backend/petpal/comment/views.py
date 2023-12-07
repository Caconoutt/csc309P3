from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.decorators import api_view, permission_classes
from comment.models.comment import Review, Reply, Chat
from pet.models.application import Application
from .serializers import ReviewSerializer, ReplySerializer, ChatSerializer
from account.models.seeker import Seeker
from account.models.shelter import Shelter
from django.contrib.contenttypes.models import ContentType
from django.shortcuts import get_object_or_404
from comment.permissions import IsApplicationShelterOrApplicant
from rest_framework.permissions import IsAuthenticated as Isauthenticated
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from account.models import Noti
from datetime import datetime

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

# review feature
class ReviewListCreateView(ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [Isauthenticated]
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        shelter_id = self.kwargs.get('shelter_id')
        return Review.objects.filter(shelter_id=shelter_id).order_by('-created_at')
    
    def perform_create(self, serializer):
        shelter_id = self.kwargs.get('shelter_id')
        current_user = self.request.user

        content_type = None

        # if isinstance(current_user, Shelter):
        if current_user.is_shelter:
            content_type = ContentType.objects.get_for_model(Shelter, for_concrete_model=True)
        # elif isinstance(current_user, Seeker):
        else:
            content_type = ContentType.objects.get_for_model(Seeker, for_concrete_model=True)
        
        object_id = current_user.id

        shelter_instance = get_object_or_404(Shelter, id=shelter_id)

        serializer.validated_data['shelter'] = shelter_instance

        # Set content_type1_id based on the content_type obtained
        serializer.validated_data['content_type1_id'] = content_type.id if content_type else None

        # Set object_id1 based on the current_user.id
        serializer.validated_data['object_id1'] = object_id

        serializer.save()

        review = serializer.instance

        # Create a notification for the new review
        noti = Noti.objects.create(
            msg=f"A new review has been added to your profile: {review.detail}",
            owner = review.shelter,
            review_id = review.pk,  # Link to the new review
            shelter_id = review.shelter.pk,
            case = 'review'
        )

        print(f"Review URL: {noti.get_review_url()}")  # Get and display the review URL

        return review


class ReplyListCreateView(ListCreateAPIView):
    serializer_class = ReplySerializer
    permission_classes = [Isauthenticated]
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        review_id = self.kwargs.get('review_id')
        return Reply.objects.filter(review_id=review_id).order_by('-created_at')
    
    def perform_create(self, serializer):
        review_id = self.kwargs.get('review_id')
        current_user = self.request.user

        content_type = None

        # if isinstance(current_user, Shelter):
        if current_user.is_shelter:
            content_type = ContentType.objects.get_for_model(Shelter, for_concrete_model=True)
        # elif isinstance(current_user, Seeker):
        else:
            content_type = ContentType.objects.get_for_model(Seeker, for_concrete_model=True)
        
        object_id = current_user.id

        review_instance = get_object_or_404(Review, id=review_id)

        # Set content_type1_id based on the content_type obtained
        serializer.validated_data['content_type2_id'] = content_type.id if content_type else None

        # Set object_id1 based on the current_user.id
        serializer.validated_data['object_id2'] = object_id

        serializer.validated_data['review'] = review_instance
        
        serializer.save()

        reply = serializer.instance

        # Create a notification for the new review
        noti = Noti.objects.create(
            msg=f"You got a new reply: {reply.detail}",
            owner=reply.review.reviewer,
            reply_id=reply.pk,  # Link to the new review
            review_id = reply.review.pk,
            case = 'reply'
        )

        print(f"Reply URL: {noti.get_review_url()}")  # Get and display the review URL

        return reply


# the chat function

class ChatListCreateView(ListCreateAPIView):
    serializer_class = ChatSerializer
    permission_classes = [Isauthenticated,IsApplicationShelterOrApplicant]
    pagination_class = StandardResultsSetPagination

    # get the chat list for specific application
    def get_queryset(self):
        application_id = self.kwargs.get('application_id')
        return Chat.objects.filter(application_id=application_id).order_by('-created_at')
    
    def perform_create(self, serializer):
        application_id = self.kwargs.get('application_id')
        current_user = self.request.user

        content_type = None
        application_instance = get_object_or_404(Application, id=application_id)

        # if isinstance(current_user, Shelter):
        if current_user.is_shelter:
            content_type = ContentType.objects.get_for_model(Shelter, for_concrete_model=True)
            object_id = current_user.pk
            content_type3 = ContentType.objects.get_for_model(Seeker, for_concrete_model=True)
            object_id3 = application_instance.applicant.pk
        # elif isinstance(current_user, Seeker):
        else:
            content_type = ContentType.objects.get_for_model(Seeker, for_concrete_model=True)
            object_id = current_user.pk
            content_type3 = ContentType.objects.get_for_model(Shelter, for_concrete_model=True)
            object_id3 = application_instance.shelter.pk
        
        application_instance.last_modified_time = datetime.now()
        application_instance.save()
    
        serializer.validated_data['application'] = application_instance
        # Set object_id based on the current_user.id
        serializer.validated_data['object_id'] = object_id
        serializer.validated_data['content_type_id'] = content_type.id if content_type else None
        serializer.validated_data['object_id3'] = object_id3
        serializer.validated_data['content_type3_id'] = content_type3.id if content_type3 else None
        
        serializer.save()
        message = serializer.instance

        # Create a notification for the new review
        noti = Noti.objects.create(
            msg=f"A new message to your from: {message.sender}",
            owner=message.receiver,
            message_id=message.pk,  # Link to the new review
            application_id = message.application.pk, # link to the application
            case = 'message'
        )

        print(f"Message URL: {noti.get_review_url()}")

        return message
    

# a view that get a specific chat for a specific application
class ChatDetailView(generics.RetrieveAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    def get_object(self):
        application_id = self.kwargs['application_id']
        message_id = self.kwargs['message_id']
        chat = get_object_or_404(Chat, application_id=application_id, id=message_id)
        return chat

# a view that get a specific review for a specific shelter
class ReviewDetailView(generics.RetrieveAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def get_object(self):
        shelter_id = self.kwargs['shelter_id']
        review_id = self.kwargs['review_id']
        review = get_object_or_404(Review, shelter_id=shelter_id, id=review_id)
        return review

# a view that get a specific reply for a specific review
class ReplyDetailView(generics.RetrieveAPIView):
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer

    def get_object(self):
        review_id = self.kwargs['review_id']
        reply_id = self.kwargs['reply_id']
        reply = get_object_or_404(Reply, review_id=review_id, id=reply_id)
        return reply

