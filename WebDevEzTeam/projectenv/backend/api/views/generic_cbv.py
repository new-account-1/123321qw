from api.models import Supplement, Diets, Task, ExerciseCategory, Exercise
from api.serializers import SupplementSerializer, ExerciseCategorySerializer, ExerciseSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from api.serializers import DietSerializer, TaskSerializer
from django.http import Http404
from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination
from django.shortcuts import get_object_or_404
from rest_framework import filters
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from api.filters import TaskFilter


# Task Create and Get List
class TaskListView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.for_user(self.request.user)

    def get_serializer_class(self):
        return TaskSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class TaskListView2(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    pagination_class = LimitOffsetPagination

    def get_serializer_class(self):
        return TaskSerializer

    def get_queryset(self):
        return Task.objects.for_user(self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class TaskChange(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(id=self.kwargs['pk'])

    def get_serializer_class(self):
        return TaskSerializer


# Works
class SupplementListAllowAny(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Supplement.objects.all()
    serializer_class = SupplementSerializer
    http_method_names = ['get']


class SupplementListAllowAny2(generics.ListAPIView):
    permission_classes = [AllowAny]
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        return Supplement.objects.all()

    def get_serializer_class(self):
        return SupplementSerializer


class DietsListAllowAnyPaginated(generics.ListAPIView):
    permission_classes = [AllowAny]
    pagination_class = LimitOffsetPagination

    def get_serializer_class(self):
        return DietSerializer

    def get_queryset(self):
        return Diets.objects.all()


# Works
class DietCreateAdmin(generics.CreateAPIView):
    permission_classes = [IsAdminUser]
    queryset = Diets.objects.all()
    serializer_class = DietSerializer
    http_method_names = ['post']


# List of all Exercise Categories
class ExerciseCategoryList(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = ExerciseCategory.objects.all()
    serializer_class = ExerciseCategorySerializer
    http_method_names = ['get']


class ExerciseCategoryListCreate(generics.ListCreateAPIView):
    permission_classes = [IsAdminUser]
    queryset = ExerciseCategory.objects.all()
    serializer_class = ExerciseCategorySerializer
    http_method_names = ['get', 'post']


class ExerciseCategoryInfo(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return ExerciseCategory.objects.filter(id=self.kwargs['pk'])

    serializer_class = ExerciseCategorySerializer


class ExerciseCategoryInfoAllowAny(generics.RetrieveAPIView):
    permission_classes = [AllowAny]

    def get_queryset(self):
        return ExerciseCategory.objects.filter(id=self.kwargs['pk'])

    serializer_class = ExerciseCategorySerializer


class ExercisesViewListCreateAdmin(generics.ListCreateAPIView):
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        try:
            exercise_category = ExerciseCategory.objects.get(id=self.kwargs['pk'])
        except ExerciseCategory.DoesNotExist:
            raise Http404
        return exercise_category.exercise_set.all()

    def get_serializer_class(self):
        return ExerciseSerializer

    def perform_create(self, serializer):
        try:
            exercise_category = ExerciseCategory.objects.get(id=self.kwargs['pk'])
        except ExerciseCategory.DoesNotExist:
            raise Http404
        serializer.save(exercise_category=exercise_category)


class ExercisesViewAllowAny(generics.ListAPIView):
    permission_classes = [AllowAny]

    def get_queryset(self):
        try:
            exercise_category = ExerciseCategory.objects.get(id=self.kwargs['pk'])
        except ExerciseCategory.DoesNotExist:
            raise Http404
        return exercise_category.exercise_set.all()

    def get_serializer_class(self):
        return ExerciseSerializer
