import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { modelImg } from '../Model/Image';
import { modelUser } from '../Model/User';
import { Observable } from 'rxjs';
import { ModelStatistic } from '../Model/Statistic';
import { ModelProgram } from '../Model/Program';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  constructor(private http:HttpClient) { }
  Url = 'http://localhost:8080/';
  id: number = 0;
  
  getPersoana(){
    return this.http.get<modelUser[]>(this.Url+'users');
  }

  getProgram(){
    return this.http.get<ModelProgram[]>(this.Url+'programs');
  }

  getAllImages(){
    return this.http.get<modelImg[]>(this.Url+'getAllImages');
  }

  deletePersoana(userId:number| undefined){
    return this.http.delete<any>(this.Url+'deleteUser/'+userId);
  }

  deleteProgram(userId:number| undefined){
    return this.http.delete<any>(this.Url+'deleteProgram/'+userId);
  }

  deleteStatistic(userId:number| undefined){
    return this.http.delete<any>(this.Url+'deleteStatistic/'+userId);
  }
  
  createPersoana(persoana:modelUser){
    return this.http.post<Number>(this.Url+'addUser',persoana);
  }

  createProgram(program:ModelProgram){
    return this.http.post<Number>(this.Url+'addProgram',program);
  }

  getPersoanaId(id:number){
    return this.http.get<modelUser>(this.Url+'getUserById/'+id);
  }

  getProgramById(id:number){
    return this.http.get<ModelProgram[]>(this.Url+'getProgramById/'+id);
  }

  getStatisticById(id:number){
    return this.http.get<ModelStatistic[]>(this.Url+'getStatisticById/'+id);
  }

  findUserById(id:number){
    return this.http.get<any>(this.Url+'findById/'+id);
  }

  updatePersoana(persoana:modelUser){
    return this.http.post<modelUser>(this.Url+'editUser',persoana);
  }

  updateProgram(program:ModelProgram){
    return this.http.post<ModelProgram>(this.Url+'editProgram',program);
  }

  public getImage(userId: number): any {
      return this.http.get<any>(this.Url + 'image/get/' + userId);
    }

  public uploadImage(uploadImageData: any): any {
    return this.http.post<any>(this.Url + 'image/upload', uploadImageData);
  }

  public uploadImageToRecognize(image: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('file', image, 'image.jpeg');
    const headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');
    return this.http.post<any>(this.Url +'upload-imageToRecognize', formData, {headers});
  }

  runPython(param: string, reason:string) {
    return this.http.get(this.Url + 'run-python/' + param+'/'+ reason);
  }

  getLastId(id:number){
    return this.http.get<any>(this.Url+'getLastId/'+id);
  }
}
