from rest_framework import generics
from .serializers import RoomSerializer
from .models import Room

# * Creamos nuestros EndPoints * #

class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer