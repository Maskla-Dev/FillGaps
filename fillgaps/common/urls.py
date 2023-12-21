from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path('login/', views.CustomTokenView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('users/directory/<int:employee_id>', views.directory, name='directory'),
    path('users/employee_photo/', views.employee_photo, name='employee_photo'),
    path('hr/', views.get_employee_data, name='hr'),
    path('hr/new', views.create_employee_data, name='hr_new')
]
