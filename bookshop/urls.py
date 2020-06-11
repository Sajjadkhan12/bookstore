from django.urls import path
from . import views


urlpatterns = [
    path('',views.index, name='index'),
    path('product/detail/<slug:slug>', views.product_detail,name='product_detail'),
    path('product/all-products',views.product_list,name='product_list'),
    path('category/<slug:category_slug>',views.product_list,name='category_detail'),
    path('all-categories/',views.all_Categories,name='all_categories'),
    path('contact-us/',views.contact_us,name='contact_us'),
    path('search/',views.search_Result,name='search'),
    path('product/detail/review/<int:product_id>',views.Comment_Review,name='review'),
]