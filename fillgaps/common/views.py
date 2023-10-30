from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework import decorators, response, status
from . import models, serializers
from rest_framework import serializers as rest_serializers
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView


# Create your views here.

class CustomTokenView(TokenObtainPairView):
    serializer_class = serializers.CustomTokenSerializer