from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.http import JsonResponse
from django.http import HttpResponse
from django.urls import reverse
from django.middleware.csrf import get_token
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_POST
import json
import logging

logger = logging.getLogger(__name__)

from .models import Student
from .models import TickerData
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
    
@require_POST
@csrf_exempt
def save_exchange_rate(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            exchange_rate = data.get('exchangeRate')

            if exchange_rate is not None:
                # Log the received exchange rate
                logger.info('Received exchange rate: %s', exchange_rate)

                # Process the received exchange rate, save to the database, or perform calculations
                # Your processing logic here

                return JsonResponse({'message': 'Exchange rate received and processed successfully'})
            else:
                return JsonResponse({'message': 'Invalid or missing exchange rate data'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON data format'}, status=400)
    else:
        return JsonResponse({'message': 'Invalid request method'}, status=405)
    
#new code for Ticker
from decimal import Decimal  # Import Decimal for precise decimal arithmetic

@csrf_exempt
def save_ticker(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print("Received data:", data)  # Debug statement to print received data

            ticker = data.get('ticker')
            opening_price = data.get('opening_price')
            closing_price = data.get('closing_price')
            quantity = data.get('quantity')
            exchange_rate = data.get('exchange_rate')  # Add this line to get the exchange rate

            if ticker and opening_price is not None and closing_price is not None and quantity is not None and exchange_rate is not None:
                # Calculate total values using the dynamic exchange rate
                total_value_usd = opening_price * quantity
                total_value_dkk = Decimal(total_value_usd) * Decimal(exchange_rate)

                new_ticker_data = TickerData(
                    ticker=ticker,
                    opening_price=opening_price,
                    closing_price=closing_price,
                    total_value_usd=total_value_usd,
                    total_value_dkk=total_value_dkk,
                    quantity=quantity
                )
                new_ticker_data.save()
                return JsonResponse({'message': 'Ticker data saved successfully'})
            else:
                return JsonResponse({'message': 'Incomplete or invalid data provided'}, status=400)
        except json.JSONDecodeError as e:
            return JsonResponse({'message': 'Invalid JSON data format'}, status=400)
        except Exception as e:
            return JsonResponse({'message': 'An error occurred while saving the data'}, status=500)

    return JsonResponse({'message': 'Invalid request method'}, status=405)

#new code for index


def index(request):
    api_url = reverse('students_api')  # Use the correct name of your URL pattern
    image_url = '{% static "1393720.jpg" %}'  # Update with your image's path  image_url = '{% static "1393720.jpg" %}' 
    alt_text = "Welcome image"  # Replace with your alt text
    response_text = f"Welcome to the backend root page - you can access the API interface for students by clicking <a href='http://localhost:8000{api_url}'>here</a>"
    return HttpResponse(response_text)

#new code for csrf_token

def csrf_token_view(request):
    # Get the CSRF token
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})
 
def get_csrf_token(request):
    return JsonResponse({'csrftoken': get_token(request)})

class SaveTickerDataView(View):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            ticker = data.get('ticker')
            opening_price = data.get('opening_price')
            closing_price = data.get('closing_price')
            quantity = data.get('quantity')

            if ticker and opening_price is not None and closing_price is not None and quantity is not None:
                # Calculate total values
                total_value_usd = opening_price * quantity
                total_value_dkk = total_value_usd * 6.42  # Example exchange rate from USD to DKK

                new_ticker_data = TickerData(
                    ticker=ticker,
                    opening_price=opening_price,
                    closing_price=closing_price,
                    total_value_usd=total_value_usd,
                    total_value_dkk=total_value_dkk,
                    quantity=quantity
                )
                new_ticker_data.save()
                return JsonResponse({'message': 'Data saved successfully'})
            else:
                return JsonResponse({'message': 'Incomplete or invalid data provided'}, status=400)
        except json.JSONDecodeError as e:
            return JsonResponse({'message': 'Invalid JSON data format'}, status=400)
        except Exception as e:
            return JsonResponse({'message': 'An error occurred while saving the data'}, status=500)
