from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from django.db.models.signals import post_save
from django.dispatch import receiver


# Manager for Task Model
class TaskManager(models.Manager):
    def for_user(self, user):
        return self.filter(created_by=user)


# Task Model
class Task(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(default=datetime.now())
    # due_on = models.DateTimeField(default=None, null=True)
    status = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    objects = TaskManager()

    class Meta:
        verbose_name = 'Task'
        verbose_name_plural = 'Tasks'


# User Profile Model
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    second_name = models.CharField(max_length=255)
    task_count = models.IntegerField(default=0)
    overall_body_test = models.FloatField(default=0.0)
    allergies = models.CharField(default="No Info", max_length=100)
    blood_pressure = models.CharField(default="No Info", max_length=100)

    class Meta:
        verbose_name = 'Profile'
        verbose_name_plural = 'Profiles'


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()


# Diets Model
class Diets(models.Model):
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=1500)

    class Meta:
        verbose_name = 'Diet'
        verbose_name_plural = 'Diets'


# Supplement Model
class Supplement(models.Model):
    title = models.CharField(max_length=255, default="")
    description = models.CharField(max_length=1500, default="")

    class Meta:
        verbose_name = 'Supplement'
        verbose_name_plural = 'Supplements'


# Exercise Category Model
class ExerciseCategory(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name = "Exercise Category"
        verbose_name_plural = "Exercise Categories"


class ExercisesManager(models.Manager):
    def for_user(self, pk1, pk2, user):
        return ExerciseCategory.objects.get(id=pk1).exercises_set.get(id=pk2)


# Exercise Model
class Exercise(models.Model):
    title = models.CharField(max_length=255)
    photo_link = models.CharField(max_length=1000)
    equipment_needed = models.CharField(max_length=255)
    how_to_do_tips = models.CharField(max_length=1500)
    exercise_category = models.ForeignKey(ExerciseCategory, on_delete=models.CASCADE)
    objects = ExercisesManager()

    class Meta:
        verbose_name = 'Exercise'
        verbose_name_plural = 'Exercises'
