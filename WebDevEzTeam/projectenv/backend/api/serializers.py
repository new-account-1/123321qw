from rest_framework import serializers
from .models import Diets, Supplement, Task, Profile, ExerciseCategory, Exercise
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(validators=[UniqueValidator(queryset=User.objects.all())], min_length=1)
    email = serializers.CharField(max_length=300)
    password = serializers.CharField(min_length=8)

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'is_superuser')


# Profile Serializer
class ProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    user = UserSerializer(read_only=True)
    first_name = serializers.CharField(required=False, allow_blank=True, default='')
    second_name = serializers.CharField(required=False, allow_blank=True, default='')
    task_count = serializers.IntegerField(required=False, default=0)
    overall_body_test = serializers.FloatField(required=False, default=0)
    allergies = serializers.CharField(required=False, allow_blank=True, default='')
    blood_pressure = serializers.CharField(required=False, allow_blank=True, default='')

    class Meta:
        model = Profile
        fields = (
            'id',
            'user',
            'first_name',
            'second_name',
            'task_count',
            'overall_body_test',
            'allergies',
            'blood_pressure'
        )


# Task Serializer
class TaskSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    created_at = serializers.DateTimeField(read_only=True)
    status = serializers.CharField()
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Task
        fields = (
            'id',
            'name',
            'created_at',
            'status',
            'created_by'
        )

    def create(self, validated_data):
        return Task.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.status = validated_data.get('status', instance.status)
        created_by = UserSerializer(read_only=True)
        instance.save()
        return instance


# Supplement Serializer
class SupplementSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=True)
    description = serializers.CharField(required=False, allow_blank=True, default='')

    def create(self, validated_data):
        supplement = Supplement(**validated_data)
        supplement.save()
        return supplement

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.title)
        instance.save()
        return instance


# Diet Serializer
class DietSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField()
    description = serializers.CharField()

    class Meta:
        model = Diets
        fields = (
            'id',
            'title',
            'description'
        )


# Exercise Category Serializer
class ExerciseCategorySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=255)

    class Meta:
        model = ExerciseCategory
        fields = '__all__'


# Exercise Serializer
class ExerciseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=255)
    photo_link = serializers.CharField(max_length=255)
    equipment_needed = serializers.CharField(max_length=255)
    how_to_do_tips = serializers.CharField(max_length=1500)
    exercise_category = ExerciseCategorySerializer(required=False)

    class Meta:
        model = Exercise
        fields = '__all__'

    def create(self, validated_data):
        return Exercise.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.photo_link = validated_data.get('photo_link', instance.photo_link)
        instance.equipment_needed = validated_data.get('equipment_needed',instance.equipment_needed)
        instance.how_to_do_tips = validated_data.get('how_to_do_tips', instance.how_to_do_tips)
        instance.save()
        return instance
