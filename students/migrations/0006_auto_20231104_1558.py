# Generated by Django 3.2.12 on 2023-11-04 15:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0005_auto_20231104_1551'),
    ]

    operations = [
        migrations.AddField(
            model_name='tickerdata',
            name='total_value_dkk',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tickerdata',
            name='total_value_usd',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
            preserve_default=False,
        ),
    ]
