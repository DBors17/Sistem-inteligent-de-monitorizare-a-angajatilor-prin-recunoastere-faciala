import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { modelUser } from 'src/app/Model/User';
import { ServiceService } from 'src/app/Service/service.service';
import { JwtClientService } from 'src/app/Service/jwt-client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{

  persoana:modelUser = new modelUser();
  selectedFile: any; // FILE
  retrieveResonse: any;
  base64Data: any;
  retrievedImage: any;
  fileName = '';
  isUserAdmin = false;
  isYourProfile = false;
  isUserAuthenticated = false;
  parola = "";
  userid = localStorage.getItem("id");

constructor(private router:Router, private service:ServiceService, private loginService:JwtClientService){}

ngOnInit(){
  this.Editare();
  this.getProfileImage();

    this.loginService.isUserAdmin.subscribe(data=>{
    if(this.loginService.getRole() == 'admin'){
      this.isUserAdmin = true;
    }else{
      this.isUserAdmin = false;
    }
    });

    this.loginService.isYourProfile.subscribe(data=>{
      let id = localStorage.getItem("id");
      this.service.getPersoanaId(Number(id))
      .subscribe(data=>{ 
        this.persoana=data;
         if(this.persoana.id.toString() == this.loginService.getId()){
            this.isYourProfile = true;
          }else{
            this.isYourProfile = false;
          }
        })
      });

    this.loginService.isUserAuthenticated.subscribe(data=>{
    if(sessionStorage.getItem('token') != null && this.loginService.isTokenValid()){
      this.isUserAuthenticated = true;
    }else{
      this.isUserAuthenticated = false;
    }
    });
  }

  
  Personal(){
    this.router.navigate(["personal"]);
  } 

  Editare(){
    let id = localStorage.getItem("id");
    this.service.getPersoanaId(Number(id))
    .subscribe(data=>{ 
      this.persoana=data;
      this.parola = this.persoana.password;
      })
  }

  Actualizare(persoana:modelUser){
    if(this.parola == persoana.password){
      persoana.password = '';
      this.service.updatePersoana(persoana)
      .subscribe(data=>{
        this.persoana=data;
        Swal.fire({
          title: 'Succes',
          text: 'Datele au fost actualizate cu succes!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(["personal"]);
      })
    }else{
    if(this.loginService.passwordVerification(persoana.password)){
    this.service.updatePersoana(persoana)
    .subscribe(data=>{
      this.persoana=data;
      Swal.fire({
        title: 'Succes',
        text: 'Datele au fost actualizate cu succes!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.router.navigate(["personal"]);
    })
      }else{
        Swal.fire({
          title: 'Eroare',
          text: 'Parola din 8 caractere trebuie sa contina numai litere mici si cifre',
          icon: 'error',
          confirmButtonText: 'OK'
        });
    }
  }}

  public onFileChanged(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
  //  let id = localStorage.getItem("id");
    const uploadImageData = new FormData(); 
    uploadImageData.append('imageFile', this.selectedFile, this.userid + '/' + this.selectedFile.name);
    this.service.uploadImage(uploadImageData).subscribe(
      (data:any) => {
     // console.log(data);
      this.getProfileImage();
      });
    //console.log(uploadImageData);
  }

  getProfileImage(): void {
    this.service.getImage(Number(this.userid)).subscribe(
      (res: any) => {
       // console.log(res);
        this.retrieveResonse = res;
        this.fileName = this.retrieveResonse.imageName;
        this.base64Data = this.retrieveResonse.image;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      });
  }

}
