import { Injectable, EventEmitter } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { IAuthResponse, ITask, ISupplement, IDiet, IRegResponse, IExerciseCategory, IProfile, IUserProfileList, IExercise, ITaskPaginted, ISupplementPaginted, IDietPaginated } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService{

  public sendMessage = new EventEmitter<string>();1

  constructor(http: HttpClient) {
    super(http);
   }
  
  login(uname: any, password: any): Promise<IAuthResponse>{
    return this.post('http://localhost:8000/api/api-token-auth/',{
      username: uname,
      password: password
    });
  }

  register(login: any, email: any, password: any): Promise<IRegResponse>{
    return this.post('http://localhost:8000/api/register/',{
      username: login,
      email: email,
      password: password
    });
  }

  logout():Promise<any>{
    return this.post('http://localhost:8000/api/logout/',{});
  }

  getExercisesAllowAny(id: number):Promise<IExercise[]>{
    return this.get('http://localhost:8000/api/exercise_categories/'+id+'/exercises/',{})
  }

  getExercisesDetailAllowAny(excategoryid: number, exerciseid:number):Promise<IExercise>{
    return this.get('http://localhost:8000/api/exercise_categories/'+excategoryid+'/exercises/'+exerciseid+'/',{})
  }

  getSupplements():Promise<ISupplement[]>{
    return this.get('http://localhost:8000/api/supplements/',{});
  }

  getSupplementsPaginated(url: string):Promise<ISupplementPaginted>{
    return this.get('http://localhost:8000/api/supplements/paginated/'+url,{})
  }

  getDiets():Promise<IDiet[]>{
    return this.get('http://localhost:8000/api/diets/',{});
  }

  getDietsPaginated(url: string):Promise<IDietPaginated>{
    return this.get('http://localhost:8000/api/diets/paginated/'+url,{})
  }

  getExerciseCategories():Promise<IExerciseCategory[]>{
    return this.get('http://localhost:8000/api/exercise_categories/',{})
  }

  // Admin Panel
  getExercisesAdminOnly(id: number):Promise<IExercise[]>{
    return this.get('http://localhost:8000/api/exercise_category/'+id+'/exercises/',{})
  }

  // Admin Panel
  getExerciseDetailAdminOnly(excategoryid: number, exerciseid:number):Promise<IExercise>{
    return this.get('http://localhost:8000/api/exercise_category/'+excategoryid+'/exercises/'+exerciseid+'/',{})
  }

  // Admin Panel
  getUserList():Promise<IUserProfileList[]>{
    return this.get('http://localhost:8000/api/users/',{})
  }

  // Admin Panel
  createNewExercise(title: string, photo_link: string, equipment_needed:string, how_to_do_tips:string, excategory: IExerciseCategory):Promise<IExercise>{
    return this.post('http://localhost:8000/api/exercise_category/'+excategory.id+"/exercises/",{
      title: title,
      photo_link: photo_link,
      equipment_needed: equipment_needed,
      how_to_do_tips: how_to_do_tips
    })
  }

  // Admin Panel
  createNewDiet(title: any, description: any):Promise<IDiet>{
    return this.post('http://localhost:8000/api/diet/',{
      title: title,
      description: description
    })
  }

  // Admin Panel
  createNewSupplement(title: any, description: any):Promise<ISupplement>{
    return this.post('http://localhost:8000/api/supplement/',{
      title: title,
      description: description
    })
  }
  
  // Admin Panel
  createNewExerciseCategory(name: any):Promise<IExerciseCategory>{
    return this.post('http://localhost:8000/api/exercise_category/',{
      name: name
    })
  }

  // Admin Panel
  updateExercise(excategory:IExerciseCategory, exercise: IExercise):Promise<IExercise>{
    return this.put('http://localhost:8000/api/exercise_category/'+excategory.id+'/exercises/'+exercise.id+'/',{
      title: exercise.title,
      photo_link: exercise.photo_link,
      equipment_needed: exercise.equipment_needed,
      how_to_do_tips: exercise.how_to_do_tips
    })
  }

  // Admin Panel
  updateDiet(diet: IDiet):Promise<IDiet>{
    return this.put('http://localhost:8000/api/diet/'+diet.id+"/",{
      title: diet.title,
      description: diet.description
    })
  }

  // Admin Panel
  updateSupplement(supplement: ISupplement):Promise<ISupplement>{
    return this.put('http://localhost:8000/api/supplement/'+supplement.id+"/",{
      title: supplement.title,
      description: supplement.description
    })
  }

  // Admin Panel
  updateExerciseCategory(exerciseCategory: IExerciseCategory):Promise<IExerciseCategory>{
    return this.put('http://localhost:8000/api/exercise_category/'+exerciseCategory.id+'/',{
      name: exerciseCategory.name
    })
  }

  // Admin Panel
  deleteExercise(excategory: IExerciseCategory, exercise:IExercise):Promise<any>{
    return this.delet('http://localhost:8000/api/exercise_category/'+excategory.id+'/exercises/'+exercise.id+'/',{})
  }

  // Admin Panel
  deleteDiet(diet: IDiet):Promise<any>{
    return this.delet('http://localhost:8000/api/diet/'+diet.id+"/",{})
  }

  // Admin Panel
  deleteSupplement(supplement: ISupplement):Promise<any>{
    return this.delet('http://localhost:8000/api/supplement/'+supplement.id+"/",{})
  }

  // Admin Panel
  deleteExerciseCategory(exerciseCategory: IExerciseCategory):Promise<any>{
    return this.delet('http://localhost:8000/api/exercise_category/'+exerciseCategory.id+'/',{})
  }

  // Authentificated Users
  accessProfile(userId: any):Promise<IProfile>{
    return this.get('http://localhost:8000/api/profile/'+userId+"/",{})
  }

  // Authentificated Users
  increaseTaskNumber(userId: any, task_count:any, profile: IProfile):Promise<IProfile>{
    return this.put('http://localhost:8000/api/profile/'+userId+"/inc_task_number/",{
      first_name: profile.first_name,
      second_name: profile.second_name,
      overall_body_test: profile.overall_body_test,
      allergies: profile.allergies,
      blood_pressure: profile.blood_pressure,
      task_count: task_count +1
    })
  }

  // Authentificated Users
  changeProfile(userId: any, first_name: any, second_name:any, task_count:any, overall_body_test:any, allergies:any, blood_pressure: any):Promise<IProfile>{
    return this.put('http://localhost:8000/api/profile/'+userId+"/",{
      first_name: first_name,
      second_name: second_name,
      task_count: task_count,
      overall_body_test: overall_body_test,
      allergies: allergies,
      blood_pressure: blood_pressure
    })
  }

  // Authentificated Users
  getAllUserTasks():Promise<ITask[]>{
    return this.get('http://localhost:8000/api/tasks/',{})
  }

  // Authentificated Users
  getPaginatedUserTasks(url: string):Promise<ITaskPaginted>{
    return this.get('http://localhost:8000/api/tasks/paginated/'+url,{})
  }

  // Authentificated Users
  createNewTask(name: any, status: any): Promise<ITask>{
    return this.post('http://localhost:8000/api/tasks/',{
      name: name,
      status: status
    })
  }

  // Authentificated Users
  updateUserTask(task: ITask):Promise<ITask>{
    return this.put('http://localhost:8000/api/tasks/'+task.id+'/',{
      name: task.name,
      created_at: task.created_at,
      status: task.status,
    })
  }

  // Authentificated Users
  deleteUserTask(task: ITask):Promise<any>{
    return this.delet('http://localhost:8000/api/tasks/'+task.id+'/',{})
  }
  
  // Authentificated Users
  takeaTest(userId: any, overall_body_test: number, allergies: string, blood_pressure:string, profile: IProfile):Promise<IProfile>{
    return this.put('http://localhost:8000/api/profile/'+userId+"/test/",{
      first_name: profile.first_name,
      second_name: profile.second_name,
      task_count: profile.task_count,
      overall_body_test: overall_body_test,
      allergies: allergies,
      blood_pressure: blood_pressure
    })
  }

}