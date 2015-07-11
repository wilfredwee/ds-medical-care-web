from django.shortcuts import render

# Create your views here.
def index(request):
  return render(request, 'ds_medical_care_web/index.html', {})
