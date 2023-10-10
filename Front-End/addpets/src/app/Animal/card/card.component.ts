import { Component,OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { modelUser } from 'src/app/Model/User';
import { userComplet } from 'src/app/Model/UserComplet';
import {ServiceService} from '../../Service/service.service';
import { JwtClientService } from 'src/app/Service/jwt-client.service';
import Swal from 'sweetalert2';
import { modelImg } from 'src/app/Model/Image';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit{
  retrieveResonse: any;
  base64Data: any;
  retrievedImage: any;
  fileName = '';
  images:modelImg[] = [];
  persoane:modelUser[] = [];
  persoana:modelUser = new modelUser();
  defaultFileName= '';
  defaultBase64Data :any;
  isUserAdmin = false;
  isUserAuthenticated = false;
  myId:string = '';
  userId = Number(this.loginService.getId());

  constructor(private service:ServiceService, private router:Router,  private loginService:JwtClientService){}
  promise1 = this.service.getAllImages().toPromise();
  promise2 = this.service.getPersoana().toPromise();
  public mappedArrayPersoana:any[] = [];

  ngOnInit(){
    Promise.all([this.promise1, this.promise2])
    .then(values => {  
      const returnedData:modelUser[]|any=values[1];
      const returnedImages:modelImg[]|any=values[0];
      const imgNimic: modelImg[]|any = values[0];
  
      if (imgNimic && imgNimic[0]) {
        this.defaultFileName = imgNimic[0].imageName;
        this.defaultBase64Data = imgNimic[0].image;
        imgNimic[0].image = 'data:image/jpeg;base64,' + this.defaultBase64Data;
      }
  
      this.mappedArrayPersoana = returnedData.map((element:modelUser) => {
        const matchedElement = returnedImages.find((e:modelImg) => e.id === element.id);
        if(matchedElement){
          this.fileName = matchedElement.imageName;
          this.base64Data = matchedElement.image;
          if (this.base64Data.startsWith("data:image/jpeg;base64,")) {
            matchedElement.image = this.base64Data;
          } else {
            matchedElement.image = 'data:image/jpeg;base64,' + this.base64Data;
          }
          return { ...element, ...matchedElement };
        }else{
          return { ...(imgNimic[0] || {}) , ...element};
        }
      });
    })
    .catch((error) => {
      console.error(error.message);
    });

   this.loginService.isUserAdmin.subscribe(data=>{
    if(this.loginService.getRole() == 'admin'){
      this.isUserAdmin = true;
    }else{
      this.isUserAdmin = false;
    }
    });

 this.loginService.isUserAuthenticated.subscribe(data=>{
    if(sessionStorage.getItem('token') != null && this.loginService.isTokenValid()){
      this.isUserAuthenticated = true;
    }else{
      this.isUserAuthenticated = false;
    }
    });

      this.myId = this.loginService.getId();
  }

  Program(persoana:modelUser):void{
    localStorage.setItem("id",persoana.id.toString());
    this.router.navigate(["program"]);
  }

  deleteUser(userId:number | undefined){
    Swal.fire({
      title: 'Doriți să ștergeți datele angajatului?',
      text: 'Aceste date nu pot fi restabilite după ștergere!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Da',
      cancelButtonText: 'Nu'
    }).then((result) => {
       if(result.dismiss === Swal.DismissReason.cancel){
                    Swal.fire('Anulat',
                              "Datele sunt în siguranța",
                              'error');
         }
      if(result.value){
        this.service.deleteProgram(userId).subscribe(data=>{});
        this.service.deleteStatistic(userId).subscribe(date=>{});
         this.service.deletePersoana(userId)
         .subscribe(data=>{
      if(data==1){
            Swal.fire("Șters",
                "Datele au fost șterse",
                "success");
            this.mappedArrayPersoana = this.mappedArrayPersoana.filter((persoana) => persoana.id !== userId);
       }else if( data==2){
            Swal.fire("Eroare",
                 "Nu s-au putut șterge datele utizatorului.",
                  "error");
      }else if( data==3){
            Swal.fire("Eroare",
                  "Nu s-au putut șterge imaginea utizatorului.",
                  "error");
      }});
   }},error=>{console.log(error)});
  }
 
  Inregistrari(persoana:modelUser){
    localStorage.setItem("id",persoana.id.toString());
    this.router.navigate(["personal"]);
  }

  Editare(persoana:modelUser):void{
     localStorage.setItem("id",persoana.id.toString());
     this.router.navigate(["edit"]);
  } 
}
