import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { ITask, IProfile } from '../shared/models/models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private provider: ProviderService) { }

  public tasks: ITask[];
  public nameOfTask = '';
  public statusOfTask = '';
  private profile: IProfile;
  private user_id =0;
  public cur_task_id = 0;
  public page_number = 3;
  public countPages= 0;
  public nextPage='';
  public prevPage='';
  public offSet=0;
  public taskCount=0;
  public gettaskspaginatedpresed = false;

  ngOnInit() {
    // this.getAllTasks();
    // this.taskPagination(this.page_number);
    const token = localStorage.getItem('token');
    if(token){
      this.user_id = Number(localStorage.getItem('userId'));
      this.getProfile()
    }
  }

  increaseTasknumber(){
    this.provider.increaseTaskNumber(this.user_id, this.profile.task_count, this.profile).then(res=>{
    })
  }  

  getProfile(){
    this.provider.accessProfile(this.user_id).then(res=>{
      this.profile = res;
    })
  }

  getAllTasks(){
    this.provider.getAllUserTasks().then(res=>{
      this.tasks = res;
    })
  }

  getPagintedTasksNext(){
    if(this.nextPage !=='' || this.nextPage !==null){
      this.offSet+=2;
      this.provider.getPaginatedUserTasks('?limit=2&offset='+this.offSet).then(res=>{
        if(res.next == null){
          this.nextPage = ''
        }
        else{
          this.nextPage = res.next;
        }
        this.prevPage = res.previous;
        this.taskCount = res.count;
        this.tasks = res.results;
      })
    }
  }

  getPaginatedTasksPrev(){
    if(this.prevPage !=='' || this.prevPage !== null){
      this.offSet -=2;
      this.provider.getPaginatedUserTasks('?limit=2&offset='+this.offSet).then(res=>{
        if(res.previous == null){
          this.prevPage = '';
        }
        else{
          this.prevPage = res.previous;
        }
        this.nextPage = res.next;
        this.taskCount = res.count;
        this.tasks = res.results;
      })
    }
  }

  getPaginatedTasksInit(){
    this.gettaskspaginatedpresed = true;
    this.provider.getPaginatedUserTasks('?limit=2&offset=0').then(res=>{
      if(res.next === null){
        this.nextPage = ''
      }
      else{
        this.nextPage = res.next;
      }
        this.prevPage = '';
        this.taskCount = res.count;
        this.tasks = res.results;
        // console.log(this.prevPage)
    })
  }

  hidePaginatedTasks(){
    this.gettaskspaginatedpresed = false;
    this.prevPage = '';
    this.nextPage = '';
    this.countPages = 0;
  }

  updateTaskI(task: ITask){
    this.provider.updateUserTask(task).then(res=>{
      this.provider.getAllUserTasks().then(r=>{
        this.tasks = r;
        this.cur_task_id = 0;
      })
    })
  }

  chooseTask(task: ITask){
    this.cur_task_id = task.id;
  }

  deleteTask(task: ITask){
    this.provider.deleteUserTask(task).then(res=>{
      this.getPaginatedTasksInit()
    })
  }

  createNewTask(){
    if(this.nameOfTask !=='' && this.statusOfTask !==''){
      this.provider.createNewTask(this.nameOfTask, this.statusOfTask).then(res=>{
        window.alert('Task was successfully added! Check at the end of the list!')
        this.nameOfTask ="";
        this.statusOfTask="";
      })
    }
    else{
      window.alert('Fill all fields!')
    }
  }
}
