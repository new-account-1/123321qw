from api.models import Diets, Supplement
from api.serializers import DietSerializer, SupplementSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


@api_view(['GET', 'PUT', 'DELETE'])
def diet_by_id(request, pk):
    try:
        diet = Diets.objects.get(id=pk)
    except Diets.DoesNotExist as e:
        return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DietSerializer(diet)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer = DietSerializer(instance=diet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        diet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def supplement_by_id(request,pk):
    try:
        supplement = Supplement.objects.get(id=pk)
    except Supplement.DoesNotExist as e:
        return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SupplementSerializer(supplement)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method =='PUT':
        serializer = SupplementSerializer(instance=supplement, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        supplement.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
