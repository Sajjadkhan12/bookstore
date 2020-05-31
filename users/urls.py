from django.urls import path,include
from . import views
from bookshop.views import index
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('account/register',views.register,name='register'),
    path('account/login',views.login,name='login'),
    path('dashboard',index,name='dashboard'),
    path('logout/',auth_views.LogoutView.as_view(template_name='bookshop/index.html'),name='logout'),
]
