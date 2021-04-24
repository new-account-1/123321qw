from api.models import Diets, ExerciseCategory, Exercise
from api.serializers import SupplementSerializer, DietSerializer, ExerciseCategorySerializer, ExerciseSerializer
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from django.http import Http404


class DietListAllowAny(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        diets = Diets.objects.all()
        serializer = DietSerializer(diets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SupplementCreate(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = SupplementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ExerciseCategoryExercise(APIView):
    permission_classes = [IsAdminUser]

    def get_exercise(self, request, pk1, pk2):
        try:
            exercise = ExerciseCategory.objects.get(id=pk1).exercise_set.get(id=pk2)
        except:
            raise Http404
        return exercise

    def get(self, request, pk1, pk2):
        exercise = self.get_exercise(request, pk1,pk2)
        serializer = ExerciseSerializer(exercise)
        return Response(serializer.data)

    def put(self, request, pk1, pk2):
        exercise = self.get_exercise(request, pk1, pk2)
        try:
            request.data.pop('exercise_category')
        except:
            pass
        serializer = ExerciseSerializer(instance=exercise, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk1, pk2):
        exercise = self.get_exercise(request, pk1, pk2)
        exercise.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ExerciseCategoryExerciseAllowAny(APIView):
    permission_classes = [AllowAny]

    def get_exercise(self, request, pk1,pk2):
        try:
            exercise = ExerciseCategory.objects.get(id=pk1).exercise_set.get(id=pk2)
        except:
            raise Http404
        return exercise

    def get(self, request, pk1,pk2):
        exercise = self.get_exercise(request, pk1,pk2)
        serializer = ExerciseSerializer(exercise)
        return Response(serializer.data)
