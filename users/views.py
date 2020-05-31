from django.shortcuts import render,redirect,HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages,auth
# Create your views here.


def register(request):
    if request.method == 'POST':
        #Get form Values 
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        confirm_password = request.POST['confirm_password']
        #check if password match
        if password == confirm_password:
            #check username
            if User.objects.filter(username=username).exists():
                messages.error(request,"That username is taken")
                return redirect('register')
            else:
                if User.objects.filter(email=email).exists():
                    messages.error(request,"That email is being used.")
                    return redirect('register')
                else:
                    user = User.objects.create_user(username=username,email=email,password=password)
                    user.save()
                    messages.success(request,'You are now registered and can login in')
                    return redirect('login')
        else:
            messages.error(request, "Password do not match.")
            return redirect('register')
    else:
        return render(request,'users/registration.html')


def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = auth.authenticate(username=username,password=password)

        if user is not None:
            auth.login(request,user)
            #messages.success(request,'You are Now Logged in')
            return redirect('dashboard')
        else:
            messages.error(request,"Invalid Credentials")
            return redirect('login')
    else:
       return render(request,'users/login.html') 
    


def dashboard(request):
    return HttpResponse("dashboard")