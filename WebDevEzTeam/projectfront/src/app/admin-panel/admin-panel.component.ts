import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { IExerciseCategory, ISupplement, IDiet, IUserProfileList, IExercise } from '../shared/models/models';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private provider: ProviderService) { }

  public exerciseCategories: IExerciseCategory[];
  public supplements: ISupplement[];
  public diets: IDiet[];
  public userlist: IUserProfileList[];
  public exercises: IExercise[];
  public targetExCategory: IExerciseCategory;
  public targetExercise: IExercise;
  public targetExerciseId: number;

  public updateExerciseCategoryPressed = false;
  public updateSupplementPressed=false;
  public updateDietPressed = false;
  public updateExercisePressed= false;

  public exerciseCategoryName = "";
  public supplementName = "";
  public supplementDescription = "";
  public dietName = "";
  public dietDescription = "";
  public exerciseName="";
  public exerciseLink="";
  public exerciseEquipment="";
  public exerciseHowTodo="";

  public manipulateExCatPressed = false;
  public manipulateSupplementPressed = false;
  public maniplateDietsPressed = false;
  public manipulateExercisePressed = false;
  public showUserListPressed = false;

  ngOnInit() {
    this.getExerciseCategoryList();
    this.getSupplementsList();
    this.getDietsList();
    this.getUsersList();
  }

  manipulateExerciseCategories(){
    this.manipulateExCatPressed = !this.manipulateExCatPressed;
    this.manipulateSupplementPressed = false;
    this.maniplateDietsPressed = false;
    this.updateExerciseCategoryPressed = false;
    this.updateSupplementPressed = false;
    this.updateDietPressed = false;
    this.showUserListPressed = false;
    this.updateExercisePressed = false;
    this.manipulateExercisePressed = false;
    this.targetExCategory = null;
    this.targetExerciseId = 0;
    this.targetExercise=null;
  }

  manipulateExercises(excat: IExerciseCategory){
    this.targetExCategory = excat;
    this.manipulateExercisePressed = !this.manipulateExercisePressed;
    this.updateSupplementPressed=false;
    this.updateDietPressed = false;
    this.updateExercisePressed= false;
    this.manipulateSupplementPressed = false;
    this.maniplateDietsPressed = false;
    this.targetExercise=null;
    this.showUserListPressed = false;
  }
    
  manipulateSupplements(){
    this.manipulateSupplementPressed = !this.manipulateSupplementPressed;
    this.manipulateExCatPressed = false;
    this.maniplateDietsPressed = false;
    this.updateExerciseCategoryPressed = false;
    this.updateSupplementPressed = false;
    this.updateDietPressed = false; 
    this.updateExercisePressed = false;
    this.manipulateExercisePressed = false;
    this.showUserListPressed = false;
    this.targetExCategory = null;
    this.targetExercise=null;
    this.targetExerciseId = 0;
  }

  manipulateDiets(){
    this.maniplateDietsPressed = !this.maniplateDietsPressed;
    this.manipulateExCatPressed = false;
    this.manipulateSupplementPressed = false;
    this.updateExerciseCategoryPressed = false;
    this.updateSupplementPressed = false;
    this.updateDietPressed = false; 
    this.updateExercisePressed = false;
    this.manipulateExercisePressed = false;
    this.showUserListPressed = false;
    this.targetExCategory = null;
    this.targetExercise=null;
    this.targetExerciseId = 0;
  }

  showUsersList(){
    this.showUserListPressed = !this.showUserListPressed;
    this.manipulateExCatPressed = false;
    this.maniplateDietsPressed = false;
    this.manipulateSupplementPressed = false;
    this.updateExerciseCategoryPressed = false;
    this.updateSupplementPressed = false;
    this.updateExercisePressed = false;
    this.manipulateExercisePressed = false;
    this.updateDietPressed = false;
    this.targetExCategory = null;
    this.targetExercise=null;
    this.targetExerciseId = 0;
  }

  getUsersList(){
    this.provider.getUserList().then(res=>{
      this.userlist = res;
    })
  }

  getSupplementsList(){
    this.provider.getSupplements().then(res=>{
      this.supplements = res;
    })
  }

  getExercisesList(id: number){
    this.provider.getExercisesAdminOnly(id).then(res=>{
      this.exercises = res;
    })
  }

  getExerciseCategoryList(){
    this.provider.getExerciseCategories().then(res=>{
      this.exerciseCategories = res;
    })
  }

  getDietsList(){
    this.provider.getDiets().then(res=>{
      this.diets = res;
    })
  }

  showExerciseCategories(){
    this.updateExerciseCategoryPressed = !this.updateExerciseCategoryPressed;
    this.targetExercise=null;
    this.targetExCategory = null;
    this.targetExerciseId = 0;
  }
  showSupplement(){
    this.updateSupplementPressed =!this.updateSupplementPressed;
  }
  showDiet(){
    this.updateDietPressed = !this.updateDietPressed;
  }
  showExercises(){
    this.updateExercisePressed = !this.updateExercisePressed;
  }

  chooseExercise(ex: IExercise){
    this.targetExerciseId = ex.id;
    this.targetExercise=ex;
    console.log(this.targetExercise)

  }

  createExercise(excat: IExerciseCategory){
    if(this.exerciseName !=='' && this.exerciseLink !=='' && this.exerciseEquipment !=='' && this.exerciseHowTodo !==''){
      this.provider.createNewExercise(this.exerciseName, this.exerciseLink, this.exerciseEquipment, this.exerciseHowTodo, excat).then(res=>{
        this.exercises.push(res);
        this.exerciseName = "";
        this.exerciseLink ="";
        this.exerciseEquipment="";
        this.exerciseHowTodo="";
      })
    }
  }

  createDiet(){
    if(this.dietName !==''){
      this.provider.createNewDiet(this.dietName, this.dietDescription).then(res=>{
        this.diets.push(res);
        this.dietName="";
        this.dietDescription="";
      })
    }
  }

  createSupplement(){
    if(this.supplementName!==""){
      this.provider.createNewSupplement(this.supplementName, this.supplementDescription).then(res=>{
        this.supplements.push(res);
        this.supplementName="";
        this.supplementDescription ="";
      })
    }
  }

  createExerciseCategory(){
    if(this.exerciseCategoryName !==''){
      this.provider.createNewExerciseCategory(this.exerciseCategoryName).then(res=>{
        this.exerciseCategories.push(res)
        this.exerciseCategoryName ='';
      })
    }
  }

  updateExercise(excat: IExerciseCategory, ex: IExercise){
    if(ex.title !=='' && ex.photo_link !=='' && ex.equipment_needed !=='' && ex.how_to_do_tips !==''){
      this.provider.updateExercise(excat,ex).then(res=>{
        this.provider.getExercisesAdminOnly(excat.id).then(r=>{
          this.exercises = r;
          this.targetExerciseId = 0;
        })
      })
    }
  }

  updateDiet(diet: IDiet){
    this.provider.updateDiet(diet).then(res=>{
      this.provider.getDiets().then(r=>{
        this.diets = r;
      })
    })
  }

  updateSupplement(supplement: ISupplement){
    this.provider.updateSupplement(supplement).then(res=>{
      this.provider.getSupplements().then(r=>{
        this.supplements = r;
      })
    })
  }

  updateExerciseCategory(exerciseCategory: IExerciseCategory){
    this.provider.updateExerciseCategory(exerciseCategory).then(res=>{
      this.provider.getExerciseCategories().then(r=>{
        this.exerciseCategories = r;
      })
    })
  }

  deleteExercise(excat: IExerciseCategory, ex: IExercise){
    this.provider.deleteExercise(excat, ex).then(res=>{
      this.provider.getExercisesAdminOnly(excat.id).then(r=>{
        this.exercises = r;
        this.targetExerciseId = 0;
      })
    })
  }

  deleteDiet(diet: IDiet){
    this.provider.deleteDiet(diet).then(res=>{
      this.provider.getDiets().then(r=>{
        this.diets = r;
      })
    })
  }

  deleteThisSupplement(supplement: ISupplement){
    this.provider.deleteSupplement(supplement).then(res=>{
      this.provider.getSupplements().then(r=>{
        this.supplements = r;
      })
    })
  }

  deleteExerciseCategory(exerciseCategory: IExerciseCategory){
    this.provider.deleteExerciseCategory(exerciseCategory).then(res=>{
      this.provider.getExerciseCategories().then(r=>{
        this.exerciseCategories = r;
      })
    })
  }
}
