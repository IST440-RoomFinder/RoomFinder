from django.views.generic import TemplateView
from django.shortcuts import render, redirect


class HomePageView(TemplateView):

    def get(self, request):
        print(request.GET) # gets startpoint and endpoint in a query
        return render(request, 'pages/home.html')
    template_name = 'pages/home.html'


class AboutPageView(TemplateView):
    template_name = 'pages/about.html'