import json
from rest_framework.generics import ListAPIView
from ..pet_serializers import SeekerPetdetailSerializer,BasePetSerializer
from ..models.pet import Pet
from account.permission import IsSeeker, IsShelter
from account.views import StandardResultsSetPagination

class PetListView(ListAPIView):

    serializer_class = BasePetSerializer
    permission_classes = [IsSeeker]
    pagination_class = StandardResultsSetPagination #have to borrow camila's function, since the rest framework one doesnt work

    def get_queryset(self):
        pets = Pet.objects.all()
        query_data = self.request.query_params
        #if query_data.get('search') == "filter":
        filters = {}
        if query_data.get('age'):#age filter
                age = query_data.get('age')
                age = json.loads(age)
                age_list = []
                for row in age: #this is because our age option is "1-2", it has a hyphen
                    a_list = row.split('-')
                    age_list+=a_list
                age_list = list(map(lambda x:int(x),age_list))
                min_age = min(age_list)
                max_age = max(age_list)
                filters['age__lte'] = max_age
                filters['age__gte'] = min_age
        if query_data.get('size'): #size filter
                sizes = json.loads(query_data.get('size'))
                filters['size__in'] = sizes

        if query_data.get('color'):#color filter
                colors = json.loads(query_data.get('color'))
                filters['color__in'] = colors

        if query_data.get('shelter'):#shelter filter
            shelters = json.loads(query_data.get('shelter'))
            filters['shelter_id__in'] = shelters
        
        if not query_data.get('status'): #status filter, our default for status filter is to choose Available pets
            stat = ['Available']
            filters['status__in'] = stat
        else:
            stat = json.loads(query_data.get('status'))
            filters['status__in'] = stat

        if filters:
            pets = pets.filter(**filters)

        #if query_data.get('search') == "sort": #sort functionality
        if query_data.get('sort'):
                #sorts = query_data.get('sort')
            sorts = json.loads(query_data.get('sort'))
            pets = pets.order_by(*sorts)
        return pets



