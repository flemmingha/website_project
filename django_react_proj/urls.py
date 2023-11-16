from django.contrib import admin
from django.urls import path, re_path
from students import views
from students.views import save_ticker  # Import the save_ticker view function'
from students.views import SaveTickerDataView  # Import the save_ticker view function'
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/students/$', views.students_list),
    re_path(r'^api/students/([0-9]+)$', views.students_detail),
    path('save_ticker/', save_ticker, name='save_ticker'),
    path('save-ticker-data/', SaveTickerDataView.as_view(), name='save_ticker_data'),
    # Add a URL pattern for the root path
    path('', views.index),  # Replace 'views.index' with the view you want to use for the root path
    path('get-csrf-token/', views.csrf_token_view, name='get_csrf_token'),
    path('api/students/', views.index, name='students_api'),
    path('save_exchange_rate', views.save_exchange_rate, name='save_exchange_rate'),

]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
