from django.contrib.auth.models import User, Group
from .models import MenuItem
from rest_framework import viewsets
from api.serializers import UserSerializer, GroupSerializer, MenuItemSerializer

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class MenuItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Menu Items to be viewed or edited
    """
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer