"""BasicQueueSystem URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import serve
from django.urls import path, re_path, include
from rest_framework.routers import DefaultRouter

from ticketing import api_views

router = DefaultRouter()
router.register(r'customers',  api_views.CustomersViewSet)
router.register(r'counters',  api_views.CountersViewSet)



# router.register(r'customers/new',  api_views.CustomerCreate)
# router.register(r'customers/<int:id>',  api_views.CustomerRetrieveUpdateDestroyAPIView)

# router.register(r'counters/new',  api_views.CounterCreate)
# router.register(r'counters/<int:id>',  api_views.CounterRetrieveUpdateDestroyAPIView)

urlpatterns = [
    # re_path(r'^api/v1/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('',include('ticketing.urls')),
    re_path(r'^(?P<path>.*)$', serve,{'document_root': settings.FRONTEND_ROOT }), 
]
 