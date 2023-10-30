from django.urls import path, include
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('', views.index, name='index'),
    path('employee/', views.EmployeeViewSet.as_view(), name='employee'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('login_test/', views.login_test, name='login_test'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
