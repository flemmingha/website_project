from django.db import models

class Student(models.Model):
    name = models.CharField("Name", max_length=240)
    email = models.EmailField()
    document = models.CharField("Document", max_length=20)
    phone = models.CharField(max_length=20)
    registrationDate = models.DateField("Registration Date", auto_now_add=True)

    def __str__(self):
        return self.name
   
class Ticker(models.Model):
    symbol = models.CharField(max_length=10)

class TickerData(models.Model):
    ticker = models.CharField(max_length=50)
    opening_price = models.DecimalField(max_digits=10, decimal_places=2)
    closing_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_value_usd = models.DecimalField(max_digits=10, decimal_places=2)
    total_value_dkk = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()  # Add the quantity field
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.ticker} - {self.created_at}"


    # Add any additional methods or logic related to your data here