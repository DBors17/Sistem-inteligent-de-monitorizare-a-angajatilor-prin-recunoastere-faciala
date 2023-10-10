import { Component,OnInit } from '@angular/core';
import { JwtClientService } from 'src/app/Service/jwt-client.service';
import { Login } from 'src/app/Model/Login';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';


@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit{
   user: Login = new Login();
  constructor(private router:Router, private service:JwtClientService,private services: ServiceService) { }

  ngOnInit() {
  }
  
  Logare(){
    this.service.getAccessToken(this.user);
    this.services.id = 0;
   }
   
   FaceRecognition(){
    this.router.navigate(["face-r"]);
  }
  }