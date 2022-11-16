from django.views.generic import DetailView,ListView, CreateView, UpdateView
from django.shortcuts import render

def Customer(request):
    return render(request, 'ticketing/customer.html')

def CounterManager(request):
    return render(request, 'ticketing/counter_manager.html')

def Welcome(request):
    return render(request, 'ticketing/welcome.html')
