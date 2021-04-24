from django.urls import path, include 
from api import views
from rest_framework_jwt.views import obtain_jwt_token 
from rest_framework_jwt.views import refresh_jwt_token 
from rest_framework_jwt.views import verify_jwt_token 
urlpatterns = [
    # for all users
    path('login/', views.login),
    path('logout/', views.logout),
    path('register/', views.UserCreate.as_view()),
    path('supplements/', views.SupplementListAllowAny.as_view(), name='account-create'),
    path('supplements/paginated/', views.SupplementListAllowAny2.as_view()),
    path('diets/', views.DietListAllowAny.as_view()),
    path('diets/paginated/',views.DietsListAllowAnyPaginated.as_view()),
    path('exercise_categories/', views.ExerciseCategoryList.as_view()),
    path('exercise_categories/<int:pk>/', views.ExerciseCategoryInfoAllowAny.as_view()),
    path('exercise_categories/<int:pk>/exercises/', views.ExercisesViewAllowAny.as_view()),
    path('exercise_categories/<int:pk1>/exercises/<int:pk2>/',views.ExerciseCategoryExerciseAllowAny.as_view()),
    path(r'auth/', include('rest_auth.urls')),
    path(r'', include('django.contrib.auth.urls')),
    path(r'api-token-auth/', obtain_jwt_token),
    path(r'api-token-refresh/', refresh_jwt_token),
    path(r'api-token-verify/', verify_jwt_token),
    # for admin
    path('users/', views.UserList.as_view()),
    path('supplement/', views.SupplementCreate.as_view()),
    path('supplement/<int:pk>/', views.supplement_by_id),
    path('exercise_category/', views.ExerciseCategoryListCreate.as_view()),
    path('exercise_category/<int:pk>/', views.ExerciseCategoryInfo.as_view()),
    path('exercise_category/<int:pk>/exercises/', views.ExercisesViewListCreateAdmin.as_view()),
    path('exercise_category/<int:pk1>/exercises/<int:pk2>/', views.ExerciseCategoryExercise.as_view()),
    path('diet/', views.DietCreateAdmin.as_view()),
    path('diet/<int:pk>/', views.diet_by_id),
    # for authorized users
    path('profile/<int:pk>/', views.get_update_user_profile),
    path('profile/<int:pk>/test/', views.get_update_user_profile),
    path('profile/<int:pk>/inc_task_number/', views.get_update_user_profile),
    path('tasks/', views.TaskListView.as_view()),
    path('tasks/<int:pk>/', views.TaskChange.as_view()),
    path('tasks/paginated/', views.TaskListView2.as_view()),
    # template
    path('', views.api)
]
