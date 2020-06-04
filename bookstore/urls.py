
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('cart/', include('cart.urls')),
    path('coupons/', include('coupons.urls')),
    path('',include('users.urls')),
    path('',include('bookshop.urls')),
    path('orders/', include('orders.urls')),
    path('payment/', include('payment.urls')),
   
    
    
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
