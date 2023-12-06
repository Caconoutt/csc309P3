from django.db import models
#from users.models.seeker import Seeker


class Pet(models.Model):
    GENDER_CHOICES = [
        ('female', 'Female'),
        ('male', 'Male'),
    ]
    SIZE_CHOICES = [
        ('small', 'small'),
        ('medium', 'medium'),
        ('large', 'large'),
    ]
    COLOR_CHOICES = [
        ('White/light', 'White/light'),
        ('Black/dark', 'Black/dark'),
        ('Colorless', 'Colorless'),
        ('Bicolor', 'Bicolor'),
        ('Multi-color', 'Multi-color'),
    ]

    LOCATION_CHOICES = [
        ('Ontario', 'Ontario'),
        ('British Columbia', 'British Columbia'),
        ('Quebec', 'Quebec'),
        ('Alberta', 'Alberta'),
        ('Nova Scotia', 'Nova Scotia'),
        ('Saskat', 'Saskat'),
    ]
    STATUS_CHOICES = [
        ('Adopted', 'Adopted'),
        ('Withdrawed', 'Withdrawed'),
        ('Available', 'Available'),
        ('Pending', 'Pending'),
    ]

    name = models.CharField(max_length=255)
    Breed = models.CharField(max_length = 255)
    gender = models.CharField(max_length=255, choices=GENDER_CHOICES)
    age = models.IntegerField()
    size =models.CharField(max_length=255, choices=SIZE_CHOICES)
    color = models.CharField(max_length=255, choices = COLOR_CHOICES)
    contact = models.CharField(max_length=255) 
    location = models.CharField(max_length=255, choices = LOCATION_CHOICES)
    medical_history = models.CharField(max_length=255)
    special_needs = models.CharField(max_length=255)
    behaviour_description = models.CharField(max_length=255)
    image = models.ImageField(upload_to='images/')
    status = models.CharField(max_length=255, choices=STATUS_CHOICES,default='Pending')
    shelter = models.ForeignKey('account.Shelter', on_delete=models.CASCADE, related_name='pets')
    
    def __str__(self):
        return f"{self.name}"