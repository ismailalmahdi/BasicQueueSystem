from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListAPIView, CreateAPIView, \
RetrieveUpdateDestroyAPIView, GenericAPIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import BaseFilterBackend,SearchFilter,OrderingFilter
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

from rest_framework.permissions import BasePermission
from rest_framework import viewsets
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope

from ticketing.serializers import CustomerSerializer, CounterSerializer
from ticketing.models import Counter, Customer


#Customers API Views
class CustomersViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [TokenHasScope, TokenHasReadWriteScope]
    required_scopes = ['customers']

class CustomersPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 100 

class CustomerList(ListAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    filter_backends = [DjangoFilterBackend,SearchFilter,OrderingFilter]
    filterset_fields = ['id',]
    search_fields = ['status']
    ordering_fields = ['id']
    pagination_class = CustomersPagination

class CustomerCreate(CreateAPIView):
    serializer_class = CustomerSerializer

class CustomerRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    lookup_field = 'id'
    serializer_class = CustomerSerializer

    def delete(self, request, *args, **kwargs):
        customer_id = request.data.get('id')
        response = super().delete(request,*args, **kwargs)
        if response.status_code == 204:
            from django.core.cache import cache
            cache.delete('customer_data_{}'.format(customer_id))
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request,*args, **kwargs)
        if response.status_code == 200:
            from django.core.cache import cache
            customer = response.data
            cache.set('customer_data_{}'.format(customer['id']), {
                'status': customer['status'],
            })
        return response



#Counters API Views
class CountersViewSet(viewsets.ModelViewSet):
    queryset = Counter.objects.all()
    serializer_class = CounterSerializer
    required_scopes = ['counters']

class CountersPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 100 

class CounterList(ListAPIView):
    queryset = Counter.objects.all()
    serializer_class = CounterSerializer
    filter_backends = [DjangoFilterBackend,SearchFilter]
    filterset_fields = ['id',]
    search_fields = ['status']
    pagination_class = CountersPagination

class CounterCreate(CreateAPIView):
    serializer_class = CounterSerializer

class CounterRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):

    queryset = Counter.objects.all()
    lookup_field = 'id'
    serializer_class = CounterSerializer

    def delete(self, request, *args, **kwargs):
        Counter_id = request.data.get('id')
        response = super().delete(request,*args, **kwargs)
        if response.status_code == 204:
            from django.core.cache import cache
            cache.delete('counter_data_{}'.format(Counter_id))
        return response


    def update(self, request, *args, **kwargs):
        response = super().update(request,*args, **kwargs)
        if response.status_code == 200:
            from django.core.cache import cache
            Counter = response.data
            cache.set('counter_data_{}'.format(Counter['id']), {
                'status': Counter['status'],
            })
        return response


