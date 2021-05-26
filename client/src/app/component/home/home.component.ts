import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private service:ServiceService) { }
  data:any;
  allData:any;
  ngOnInit(): void {
   this.getAllData();
  }
  profileName = new FormGroup({
    itemName: new FormControl(''),
    itemQuantity: new FormControl(''),
    itemBought: new FormControl(''),

  })
getAllData() {
  this.service.getDetails().subscribe(resData =>{
    this.allData = resData;
    console.log(this.allData);
  })
}
  saveFrom(){
    console.log(this.profileName.value)
    this.service.postDetails(this.profileName.value).subscribe(resData => {
        this.data = resData;
        this.profileName.reset()
        this.getAllData();
    })
  }
  deleteItem(item:any){
    const id = item._id;
    this.service.deleteDetails(id).subscribe(resData =>{
      console.log(resData);
      this.getAllData();
    })

  }

}
