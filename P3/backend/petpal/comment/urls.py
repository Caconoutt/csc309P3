from django.urls import path
from comment.views import (
    ReviewListCreateView, ReplyListCreateView, ChatListCreateView, ChatDetailView, ReviewDetailView, ReplyDetailView
)

urlpatterns = [
    # Review URLs
    
    # review on a shelter
    path('reviews/<int:shelter_id>/', ReviewListCreateView.as_view(), name='review-list'),
    # get a specific review for a specific shelter
    path('reviews/<int:shelter_id>/<int:review_id>/', ReviewDetailView.as_view(), name='shelter-review-detail'),
   
    # get the reply list for specific review
    path('reviews/<int:review_id>/replies/', ReplyListCreateView.as_view(), name='reply-list'),
    # get a specific reply for a specific review
    path('reviews/<int:review_id>/replies/<int:reply_id>/', ReplyDetailView.as_view(), name='review-reply-detail'),


    # Chat URLs
    # leave & get comment for an application
    path('<int:application_id>/message/', ChatListCreateView.as_view(), name='chat-list'), 
    # get a specific chat for a specific application
    path('<int:application_id>/message/<int:message_id>/',ChatDetailView.as_view(), name='application-comment-detail'),


]
