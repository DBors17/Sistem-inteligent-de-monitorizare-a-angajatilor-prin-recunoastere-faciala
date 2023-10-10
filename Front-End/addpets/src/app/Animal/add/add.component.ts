import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { modelUser } from 'src/app/Model/User';
import { ServiceService } from 'src/app/Service/service.service';
import { JwtClientService } from 'src/app/Service/jwt-client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{
  selectedFile: any; // FILE

 constructor(private router:Router, private service:ServiceService, private loginService:JwtClientService){}

 ngOnInit(): void {
 }
 persoana:modelUser = new modelUser();

 addPersoana(persoana:modelUser){
  if(this.loginService.passwordVerification(persoana.password)){
      this.service.createPersoana(persoana)
        .subscribe(data=>{
          console.log(data);
          this.onUpload(data);
          Swal.fire({
            title: 'Succes',
            text: 'A fost adaugat un nou utilizator!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.router.navigate(['card']);
        })
      }else{
        Swal.fire({
          title: 'Eroare',
          text: 'Parola din 8 caractere trebuie sa contina numai litere mici si cifre',
          icon: 'error',
          confirmButtonText: 'OK'
        });
    }
   
 }

 public onFileChanged(event: any): void {
  this.selectedFile = event.target.files[0];
  console.log(this.selectedFile);
}

onUpload(userId:Number): void {
    const uploadImageData = new FormData(); 
    uploadImageData.append('imageFile', this.selectedFile,userId + '/' + this.selectedFile.name);
    this.service.uploadImage(uploadImageData).subscribe(
      (data:any) => {
      console.log(data);
      });
    //console.log(uploadImageData);
  }
}
