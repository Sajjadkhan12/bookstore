from django.shortcuts import render,redirect,reverse
from cart.cart import Cart
from .models import OrderItem,Order
from .forms import OrderCreateForm
from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import get_object_or_404
from .models import Order

def order_create(request):
    cart = Cart(request)
    if request.method == 'POST':
        form = OrderCreateForm(request.POST)

        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        email = request.POST['email']
        address = request.POST['address']
        phone = request.POST['phone']
        postal_code = request.POST['postal_code']
        city = request.POST['city']
        
        
        if cart.coupon:
            coupon = cart.coupon
            discount = cart.coupon.discount
            
            order = Order.objects.create(first_name=first_name,last_name=last_name,email=email,address=address, 
                                        phone=phone,postal_code=postal_code,city=city,coupon=coupon,discount=discount)
         
        else:
                                      
            order = Order.objects.create(first_name=first_name,last_name=last_name,email=email,address=address,
                                    phone=phone,postal_code=postal_code,city=city)
        for item in cart:
            OrderItem.objects.create(order=order,product=item['product'],price=item['price'],quantity=item['quantity'])
        # clear the cart
        cart.clear()
        
          # set the order in the session
        request.session['order_id'] = order.id
        # redirect for payment
        return redirect(reverse('process'))
    
    return render(request,'orders/order_create.html',{'cart': cart})

@staff_member_required
def admin_order_detail(request, order_id):
    order = get_object_or_404(Order, id=order_id)
    return render(request,'admin/orders/order/detail.html',{'order': order})
