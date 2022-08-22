import email
from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages

from .models import user_info
# Create your views here.


def login(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        user = auth.authenticate(username=email, password=password)

        if user is not None:
            auth.login(request, user)
            return redirect('home')
        else:
            messages.info(request, 'invalid credentials')
            return redirect('login')

    else:
        return render(request, "login/index.html")


def register(request):

    if request.method == "POST":

        name = request.POST['name']
        email = request.POST['email']
        password1 = request.POST['password1']
        password2 = request.POST['password2']
        class_year = request.POST['class_year']
        school_college = request.POST['school']
        country = request.POST['country']
        if password1 == password2:
            if User.objects.filter(username=email).exists():
                messages.info(request, 'Mail ID already used')
                return redirect('register')
            else:
                user = User.objects.create_user(
                    username=email, email=email, password=password1, first_name=name)
                user.save()
                user_details = user_info(
                    user=user, standard=class_year, school=school_college, country=country)
                user_details.save()
                print('user created')
                return redirect('home')
        else:
            messages.info(request, 'Password not matched')

            return redirect('register')

    else:
        return render(request, "register/index.html")


def logout(request):
    auth.logout(request)
    return redirect('home')
