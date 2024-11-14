from django import forms

from website.models import ElementoTabelaPeriodica


class SimulacaoDeElementosForm(forms.Form):
    element1 = forms.ModelChoiceField(
        queryset=ElementoTabelaPeriodica.objects.all(),
        widget=forms.Select(attrs={'class': 'form-select'})
    )
    element2 = forms.ModelChoiceField(
        queryset=ElementoTabelaPeriodica.objects.all(),
        widget=forms.Select(attrs={'class': 'form-select'})
    )
