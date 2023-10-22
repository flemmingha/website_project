from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.http import JsonResponse
from django.http import HttpResponse
from django.urls import reverse
from django.middleware.csrf import get_token


from .models import Student
from .models import Ticker  # Import the Ticker model
from .serializers import *

@api_view(['GET', 'POST'])
def students_list(request):
    if request.method == 'GET':
        data = Student.objects.all()

        serializer = StudentSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def students_detail(request, pk):
    try:
        student = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = StudentSerializer(student, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

#new code for Ticker


def save_ticker(request):
    if request.method == 'POST':
        selected_ticker = request.POST.get('selected_ticker')

        if selected_ticker:
            # Create a new Ticker object and save it to the database
            ticker = Ticker(symbol=selected_ticker)
            ticker.save()

            return JsonResponse({'message': 'Ticker saved successfully'})
        else:
            return JsonResponse({'message': 'Invalid data provided'}, status=400)

    return JsonResponse({'message': 'Invalid request method'}, status=405)  


#new code for index


def index(request):
    api_url = reverse('students_api')  # Use the correct name of your URL pattern
    response_text = f"Welcome to the backend root page - you can access the API interface for students by clicking <a href='http://localhost:8000{api_url}'>here</a>"
    return HttpResponse(response_text)

#new code for csrf_token

def csrf_token_view(request):
    # Get the CSRF token
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})
 