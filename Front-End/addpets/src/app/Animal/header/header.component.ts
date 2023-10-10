import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtClientService } from 'src/app/Service/jwt-client.service';
import { ServiceService } from 'src/app/Service/service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  title = 'add-pet';
  nume = '';
  prenume = '';
  isUserAdmin = false;
  isUserAuthenticated = false;

  constructor(private router:Router, private service:JwtClientService,public services: ServiceService){}

  
  ngOnInit() {
    this.service.isUserAdmin.subscribe(data=>{
      if(this.service.getRole() == 'admin'){
        this.isUserAdmin = true;
      }else{
        this.isUserAdmin = false;
      }
      });

   this.service.isUserAuthenticated.subscribe(data=>{
      if(sessionStorage.getItem('token') != null){
        this.isUserAuthenticated = true;
        this.nume = this.service.getName();
        this.prenume = this.service.getLastName();
      }else{
        this.prenume = "";
        this.nume = "";
        this.isUserAuthenticated = false;
      }
      });
  }

  ngOnDestroy(){
    this.service.isUserAdmin.unsubscribe();
    this.service.isUserAuthenticated.unsubscribe();
  }

  Liste(){
    this.router.navigate(["card"]);
  }
  
  Nou(){
    this.router.navigate(["add"]);
  }

  Login(){
    this.router.navigate(["login"]);
  }

  Personal(){
    localStorage.setItem("id",this.service.getId().toString());
    this.router.navigate(["personal"]);
  }

  Logout(){
    Swal.fire({
      title: 'Vrei sa parasesti pagina?',
      text: 'Fii sigur pe tine!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Da',
      cancelButtonText: 'Nu'
    }).then((result) => {
      if(result.value){
            Swal.fire("Ai iesit",
                "O zi buna",
                "success");
                this.service.Logout();
                this.services.id = 0;
                this.router.navigate(["login"]);
      }else if(result.dismiss === Swal.DismissReason.cancel){
        Swal.fire('Anulat',
                   "Poti sa te bucuri de aceasta pagina in continuare",
                   'error');
  }});    
  }
}
