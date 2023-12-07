from rest_framework.serializers import ModelSerializer, CharField, ListField, \
    PrimaryKeyRelatedField, HyperlinkedRelatedField
from .models.pet import Pet

class BasePetSerializer(ModelSerializer):
    shelter = PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Pet
        fields = '__all__'

class SeekerPetdetailSerializer(BasePetSerializer):
    
    class Meta:
        model = Pet
        fields = ('name', 'id', 'Breed','location', 'status')

class PetStatusUpdateSerializer(BasePetSerializer):
    class Meta:
        model = Pet
        fields = ('status',)

class PetdetailSerializer(ModelSerializer):
    class Meta:
        model = Pet
        fields = '__all__'

class SeekerPetListSerializer(BasePetSerializer):
    
    class Meta:
        model = Pet
        fields = ('image','name', 'Breed','age')

class PetfilterSerialzer(BasePetSerializer):
    class Meta:
        model = Pet
        fields = ('image','name', 'Breed','age')