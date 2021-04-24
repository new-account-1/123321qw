import { Component, OnInit } from '@angular/core';
import { IDiet } from '../shared/models/models';
import { ProviderService } from '../shared/services/provider.service';

@Component({
  selector: 'app-dietary',
  templateUrl: './dietary.component.html',
  styleUrls: ['./dietary.component.css']
})
export class DietaryComponent implements OnInit {

  public diets: IDiet[] = [];
  public coutPages = 0;
  public nextPage = '';
  public prevPage = '';
  public offSet = 0;
  public dietsCount = 0;

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    // this.getDiets()
    this.getDietsPaginatedInit()
  }

  getDiets(){
    this.provider.getDiets().then(res=>{
      this.diets = res;
    })
  }

  getDietsPaginatedInit(){
    this.provider.getDietsPaginated('?limit=2&offset=0').then(res=>{
      this.nextPage = res.next;
      this.prevPage = '';
      this.dietsCount = res.count;
      this.diets = res.results;
    })
  }

  getDietsPaginatedNext(){
    if(this.nextPage !=='' || this.nextPage !==null){
      this.offSet +=2;
      this.provider.getDietsPaginated('?limit=2&offset='+this.offSet).then(res=>{
        if(res.next == null){
          this.nextPage = '';
        }
        else{
          this.nextPage = res.next;
        }
        this.prevPage = res.previous;
        this.dietsCount = res.count;
        this.diets = res.results;
      })
    }
  }

  getDietsPaginatedPrev(){
    if(this.prevPage !== '' || this.prevPage !== null){
      this.offSet-=2;
      this.provider.getDietsPaginated('?limit=2&offset='+this.offSet).then(res=>{
        if(res.previous == null){
          this.prevPage = '';
        }
        else{
          this.prevPage = res.previous;
        }
        this.nextPage = res.next;
        this.dietsCount = res.count;
        this.diets = res.results;
      })
    }
  }
}