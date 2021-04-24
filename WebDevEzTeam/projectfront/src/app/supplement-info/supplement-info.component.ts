import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { ISupplement } from '../shared/models/models';

@Component({
  selector: 'app-supplement-info',
  templateUrl: './supplement-info.component.html',
  styleUrls: ['./supplement-info.component.css']
})
export class SupplementInfoComponent implements OnInit {

  public supplements: ISupplement[] = [];
  public clicked: boolean = false;
  public nextPage = '';
  public prevPage = '';
  public pageCount = 0;
  public offSet = 0;
  public supplementCount = 0;
  constructor(private provider: ProviderService) { }

  ngOnInit() {
    // this.getSupplements()
    this.getSupplementsPaginatedInit()

  }

  checkClicked(){
    this.clicked = !this.clicked;
  }

  getSupplements(){
    this.provider.getSupplements().then(res=>{
      this.supplements = res;
    });
  }

  getSupplementsPaginatedInit(){
    this.provider.getSupplementsPaginated('?limit=2&offset=0').then(res=>{
      this.nextPage = res.next;
      this.prevPage = '';
      this.supplementCount = res.count;
      this.supplements = res.results;
    })
  }

  getSupplementsPaginatedNext(){
    if(this.nextPage !== '' || this.nextPage !== null){
      this.offSet +=2;
      this.provider.getSupplementsPaginated('?limit=2&offset='+this.offSet).then(res=>{
        if(res.next == null){
          this.nextPage = '';
        }
        else{
          this.nextPage = res.next;
        }
        this.prevPage = res.previous;
        this.supplementCount = res.count;
        this.supplements = res.results;
      })
    }
  }

  getSupplementsPaginatedPrev(){
    if(this.prevPage !== '' || this.prevPage == null){
      this.offSet -=2;
      this.provider.getSupplementsPaginated('?limit=2&offset='+this.offSet).then(res=>{
        if(res.previous == null){
          this.prevPage = '';
        }
        else{
          this.prevPage = res.previous;
        }
        this.nextPage = res.next;
        this.supplementCount = res.count;
        this.supplements = res.results;
      })
    }
  }
}