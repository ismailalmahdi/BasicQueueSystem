from django.urls import path
from . import views , api_views


urlpatterns = [
    path('', views.Welcome, name='ticketing.welcome'),
    path('counter/', views.CounterManager, name='ticketing.counter'),
    path('customer/', views.Customer, name='ticketing.customer'),
    path('api/v1/customers/' , api_views.CustomerList.as_view()),
    path('api/v1/customers/new' , api_views.CustomerCreate.as_view()),
    path('api/v1/customers/<int:id>/' , api_views.CustomerRetrieveUpdateDestroyAPIView.as_view()),
    path('api/v1/counters/' , api_views.CounterList.as_view()),
    path('api/v1/counters/new' , api_views.CounterCreate.as_view()),
    path('api/v1/counters/<int:id>/' , api_views.CounterRetrieveUpdateDestroyAPIView.as_view()),
]
