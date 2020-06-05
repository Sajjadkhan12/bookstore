from django.shortcuts import render, redirect
from django.utils import timezone
from django.views.decorators.http import require_POST
from .models import Coupon
from .forms import CouponApplyForm


@require_POST
def coupon_apply(request):
    if request.method == 'POST':
        mycode = request.POST['coupon']
    
    now = timezone.now()
    
    try:
        coupon = Coupon.objects.get(code__iexact=mycode,
                                    valid_from__lte=now,
                                    valid_to__gte=now,
                                    active=True)
        request.session['coupon_id'] = coupon.id
    except Coupon.DoesNotExist:
        request.session['coupon_id'] = None
    return redirect('cart_detail')
