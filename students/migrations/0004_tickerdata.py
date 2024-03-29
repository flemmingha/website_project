# Generated by Django 3.2.12 on 2023-10-30 20:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0003_ticker'),
    ]

    operations = [
        migrations.CreateModel(
            name='TickerData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ticker', models.CharField(max_length=50)),
                ('opening_price', models.FloatField()),
                ('closing_price', models.FloatField()),
            ],
        ),
    ]
