from django.shortcuts import render
from django.shortcuts import render, get_object_or_404
from .models import Category, Product
from django.views.generic import  DetailView
from cart.forms import CartAddProductForm

# Create your views here.

def index(request):
    top_five_products = Product.objects.all()[:8]
    # showing only 6 categoires in menu bar 
    categories = Category.objects.all()[:6]
    products = Product.objects.all()
    return render(request,'bookshop/index.html',{'categories':categories,'products':products,'top_five_products':top_five_products})
    


    #total products display function
def product_list(request,category_slug=None):
    category = None
    categories = Category.objects.all()
    products = Product.objects.all()
    if category_slug:
        category = get_object_or_404(Category,slug=category_slug)
        products = products.filter(category=category)
    return render(request,'bookshop/products_list.html',{'category':category,
                                                     'categories':categories,
                                                     'products':products})

    #single product vi

def product_detail(request, slug):
    product = get_object_or_404(Product,slug=slug,available=True)
    cart_product_form = CartAddProductForm()
    return render(request,'bookshop/product_detail.html',{'product': product,'cart_product_form': cart_product_form})

def all_Categories(request):
    categories = Category.objects.all()
    return render(request,'bookshop/all_category_list.html',{'categories':categories})



def contact_us(request):
    return render(request,'bookshop/contact_us.html')


def search_Result(request):
    if request.method== 'POST':
        searh_query = request.POST['search']
        query_result = Product.objects.filter(name__startswith=searh_query)
        return render(request,'bookshop/search.html',{'query_result':query_result,'searh_query':searh_query})