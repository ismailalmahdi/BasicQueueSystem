from rest_framework import serializers 

from ticketing.models import Customer,Counter


class CustomerSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Customer
        fields = ('id','status')

class CounterSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Counter
        fields = ('id','status','customer')