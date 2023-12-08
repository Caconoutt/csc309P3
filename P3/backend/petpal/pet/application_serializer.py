from rest_framework import serializers
from .models.application import Application

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = [
            'id', 'applicant_name', 'phone', 'email', 'address', 
            'postal_code', 'city', 'household_info', 'pet_history', 
            'status', 'creation_time', 'last_modified_time', 'pet', 'applicant', 'shelter'
        ]
        read_only_fields = ['id', 'creation_time', 'last_modified_time', 'pet', 'applicant', 'shelter']

    def create(self, validated_data):
        return Application.objects.create(**validated_data)
    
    
    def update(self, instance, validated_data):
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance
