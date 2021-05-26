import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }
    api:any = "http://localhost:3000/api";
  getDetails(){
    return this.http.get(this.api+'/items');
  }
  postDetails(data:any){
    return this.http.post(this.api+'/add',data);
  }
  deleteDetails(data:any){
    return this.http.delete(this.api+'/item/'+data);
  }
}
