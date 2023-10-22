from django.contrib import admin
from django.urls import path, re_path
from students import views
from students.views import save_ticker  # Import the save_ticker view function

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/students/$', views.students_list),
    re_path(r'^api/students/([0-9]+)$', views.students_detail),
    path('save_ticker/', save_ticker, name='save_ticker'),
    # Add a URL pattern for the root path
    path('', views.index),  # Replace 'views.index' with the view you want to use for the root path
    path('get-csrf-token/', views.csrf_token_view, name='get_csrf_token'),
    path('api/students/', views.index, name='students_api'),
]
