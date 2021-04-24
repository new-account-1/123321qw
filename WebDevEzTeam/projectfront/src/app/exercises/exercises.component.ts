import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { IExerciseCategory, IExercise } from '../shared/models/models';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  public exerciseCategories: IExerciseCategory[];
  public exercises: IExercise[];
  public targetExCat: IExerciseCategory;
  public targetExercise: IExercise;
  public resultExercise: IExercise;

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    this.getExerciseCategories()
  }

  getExerciseCategories(){
    this.provider.getExerciseCategories().then(res=>{
      this.exerciseCategories = res;
    })
  }

  showExercises(exCat: IExerciseCategory){
    if(this.targetExercise !== null){
      this.targetExercise = null;
    }
    this.targetExCat = exCat;
  }

  hideExercises(){
    this.targetExCat = null;
  }

  chooseExercise(exercise: IExercise){
    this.targetExercise = exercise;
  }

  getExercises(exCat:IExerciseCategory){
    this.provider.getExercisesAllowAny(exCat.id).then(res=>{
      this.exercises = res;
    })
  }

  getExerciseDetail(exCat:IExerciseCategory, ex: IExercise){
    this.provider.getExercisesDetailAllowAny(exCat.id, ex.id).then(res=>{
      this.resultExercise = res;
    })
  }
}

