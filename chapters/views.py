import re
from django.shortcuts import redirect, render
from users.models import chapter_info
from users.models import code_submit
from django.templatetags.static import static
from django.contrib.auth.models import User

# Rest framework

from rest_framework.response import Response
from rest_framework.decorators import api_view

# Serializer
from .serializers import CodeSubmitSerializer


# Create your views here.


def home(request):
    return render(request, 'home_page/home_page.html')


def chapters_list(request):
    if request.user.is_authenticated:
        chapters_list = chapter_info.objects.all()
        return render(request, 'chapters_homepage/index.html', {"chapters_list": chapters_list})
    else:
        return redirect('login')


def chapter(request, pk):
    if request.user.is_authenticated:
        chapter_details = chapter_info.objects.get(chapter_id=pk[-3:])
        chapter_list = chapter_info.objects.filter(chapter_no=int(pk[-3]))
        js_url = static('game/js/chapter' + chapter_details.chapter_id + '.js')
        if chapter_details.chapter_intro:
            return render(request, 'chapter_slides/chapter' + chapter_details.chapter_id + '.html', {'chapter_details': chapter_details, 'js_url': js_url, 'chapter_list': chapter_list})
        else:

            return render(request, 'chapters/chapter.html', {'chapter_details': chapter_details, 'js_url': js_url, 'chapter_list': chapter_list})
    else:
        return redirect('login')


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'code_submitted': 'code_submitted',
        'update': 'code_update/<str:pk>/',
        'delete': 'code_delete/<str:pk>/',
    }

    return Response(api_urls)


@api_view(['GET'])
def CodeSubmitView(request):
    code_submit_objs = code_submit.objects.all()
    serializer = CodeSubmitSerializer(code_submit_objs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def CodeSubmitGet(request, user_name, chap_id):
    try:
        code_submit_objs = code_submit.objects.get(
            user=user_name, chapter_id=chap_id)
        serializer = CodeSubmitSerializer(code_submit_objs, many=False)
        return Response(serializer.data)
    except:
        return Response({
            "message": "code doesn't exist"
        })


@api_view(['POST'])
def CodeSubmitCreate(request):
    serializer = CodeSubmitSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['POST'])
def CodeSubmitUpdate(request, user_name, chap_id):
    code_submit_objs = code_submit.objects.get(
        user=user_name, chapter_id=chap_id)
    serializer = CodeSubmitSerializer(
        instance=code_submit_objs, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def CodeSubmitDelete(request, user_name, chap_id):
    code_submit_objs = code_submit.objects.get(
        user=user_name, chapter_id=chap_id)
    serializer = CodeSubmitSerializer(
        instance=code_submit_objs, data=request.data)
    code_submit_objs.delete()

    return Response(serializer.data)


def APICreatePost(request, user_name=1, chap_id='1_1'):
    # user_name = int(user_name)
    try:
        code_submit.objects.get(user=user_name, chapter_id=chap_id)
        return CodeSubmitUpdate(request, user_name, chap_id)
    except code_submit.DoesNotExist:
        return CodeSubmitCreate(request)
