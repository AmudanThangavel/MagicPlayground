from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('chapters', views.chapters_list, name="chapters_list"),
    path('apiView', views.apiOverview, name='api_view'),
    path('codeView', views.CodeSubmitView, name='codeView'),
    path('codeCreate', views.CodeSubmitCreate, name='codeCreate'),
    path('codeGet/<str:user_name>/<str:chap_id>/',
         views.CodeSubmitGet, name='codeGet'),
    path('codeUpdate/<str:user_name>/<str:chap_id>/',
         views.CodeSubmitUpdate, name='codeUpdate'),
    path('codeDelete/<str:user_name>/<str:chap_id>/',
         views.CodeSubmitDelete, name='codeDelete'),
    path('codeUC/<str:user_name>/<str:chap_id>/',
         views.APICreatePost, name='codeUC'),
    path('chapters/<str:pk>/', views.chapter, name="chapter"),
]
