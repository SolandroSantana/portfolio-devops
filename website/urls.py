from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('simulacao-de-elementos/', views.simulacao_de_elementos, name='simulacao-de-elementos'),
]