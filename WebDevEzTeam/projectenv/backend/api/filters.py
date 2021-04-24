from django_filters import rest_framework as filters
from api.models import Task, Supplement, Exercise, Diets


class TaskFilter(filters.FilterSet):

    class Meta:
        model = Task
        fields = '__all__'


class SupplementsFilter(filters.FilterSet):
    title = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Supplement
        fields = '__all__'
