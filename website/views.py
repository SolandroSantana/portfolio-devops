from django.shortcuts import render

from .forms import SimulacaoDeElementosForm
from .models import ElementoTabelaPeriodica
import google.generativeai as genai
import os

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

def index(request):
    elements = ElementoTabelaPeriodica.objects.all()
    return render(request, 'website/index.html', {'elements': elements})

def simulacao_de_elementos(request):
    elements = ElementoTabelaPeriodica.objects.all()
    model = genai.GenerativeModel("gemini-1.5-flash")
    form = SimulacaoDeElementosForm()
    if request.method == 'POST':
        form = SimulacaoDeElementosForm(request.POST)
        if form.is_valid():
            element1 = form.cleaned_data['element1']
            element2 = form.cleaned_data['element2']
            results = model.generate_content(f"Informe qual seria o resultado da fusão dos elementos quimicos {element1} e {element2}. "
                                             f"Conte em detalhes e o que aconteceria se esses elementos fossem fundidos. "
                                             f"Quero que o texto esteja formatado em html")
            return render(request, 'website/simulacao-de-elementos.html', {'elements': elements, 'results': results.text, 'form': form})


    return render(request, 'website/simulacao-de-elementos.html', {'elements': elements, 'form': form})