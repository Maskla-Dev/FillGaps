from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework import decorators, response, status
from . import models, serializers
from rest_framework import serializers as rest_serializers
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


class LoginView(APIView):
    permission_classes = (AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request, format=None):
        serializer = serializers.LoginSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        if user is not None:
            print(user)
            login(request, user)
            return response.Response(status=status.HTTP_202_ACCEPTED)
        return response.Response(status=status.HTTP_400_BAD_REQUEST)


@decorators.api_view(['GET'])
@decorators.authentication_classes([SessionAuthentication])
def login_test(request):
    print(request.user)
    return response.Response(status=status.HTTP_200_OK)


# Create your views here.
class EmployeeViewSet(APIView):
    def get(self, request):
        employees = models.User.objects.all()
        serializer = serializers.UserSerializer(employees, many=True)
        return response.Response(serializer.data)

    def post(self, request):
        serializer = serializers.UserSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create_user(
                username=serializer.data['username'],
                email=serializer.data['email'],
                password=serializer.data['password'],
                first_name=serializer.data['first_name'],
                last_name=serializer.data['last_name'],
            )
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
