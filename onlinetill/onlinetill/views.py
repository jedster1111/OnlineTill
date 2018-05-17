from django.shortcuts import render


def index(request):
    return render(request, 'index/index.html')

def jsx(request):
    return render(request, 'index/jsx.html')