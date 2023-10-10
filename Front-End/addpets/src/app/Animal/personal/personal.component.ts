import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { modelUser } from 'src/app/Model/User';
import { userComplet } from 'src/app/Model/UserComplet';
import { ServiceService } from '../../Service/service.service';
import { ModelStatistic } from 'src/app/Model/Statistic';
import { JwtClientService } from 'src/app/Service/jwt-client.service';
import { modelImg } from 'src/app/Model/Image';
import * as moment from 'moment';
import { ModelProgram } from 'src/app/Model/Program';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit{
  retrieveResonse: any;
  base64Data: any;
  retrievedImage: any;
  fileName = '';
  mesaj:string = 'Nu există înregistrări în această zi!';
  todayDate:Date;
  images:modelImg[] = [];
  persoane:modelUser[] = [];
  statistic:ModelStatistic[] = [];
  statisticTable:ModelStatistic[] = [];
  today:ModelStatistic[] = [];
  program: ModelProgram[] = [];
  defaultFileName= '';
  defaultBase64Data :any;
  isUserAdmin = false;
  isUserAuthenticated = false;
  selectedDate: string= '';
  formattedDate: string;
  userId = Number(localStorage.getItem("id"));
  ordineaZilelor = ['luni', 'marti', 'miercuri', 'joi', 'vineri'];
  tod: string;
  myId:Number = 0;

  constructor(private service:ServiceService, private router:Router,  private loginService:JwtClientService){}
  promise1 = this.service.getAllImages().toPromise();
  promise2 = this.service.getPersoana().toPromise();
  public mappedArrayPersoana:any[] = [];
  selectedPersoana:userComplet;

  ngOnInit(): void {
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
      this.selectedPersoana = this.mappedArrayPersoana.find((persoana) => persoana.id === this.userId);
    })
    .catch((error) => {
      console.error(error.message);
    });

    this.loginService.isUserAuthenticated.subscribe(data=>{
      if(sessionStorage.getItem('token') != null && this.loginService.isTokenValid()){
        this.isUserAuthenticated = true;
      }else{
        this.isUserAuthenticated = false;
      }
      });

      this.service.getStatisticById(this.userId).subscribe((response) => {
       this.statistic = response;
       this.todayCode();
       this.myId = Number(this.loginService.getId());
      });

      this.service.getProgramById(this.userId).subscribe((response) => {
        this.program = response;
        this.program.sort((a, b) => {
          const ziA = a.zi.toLowerCase();
          const ziB = b.zi.toLowerCase();
          
          const indexZiA = this.ordineaZilelor.indexOf(ziA);
          const indexZiB = this.ordineaZilelor.indexOf(ziB);
          
          return indexZiA - indexZiB;
        });
       });

       const now = new Date();
       this.tod = now.toISOString().substring(0, 10);
       this.selectedDate = this.tod;
  }

todayCode(){
  this.statistic.forEach((element) => {
    const dateString = element.time;
    const dateObj = new Date(dateString);
    const date = (dateObj.getMonth() + 1) + '/' + dateObj.getDate() + '/' + dateObj.getFullYear();
    this.todayDate = new Date(); 
    if (date === (this.todayDate.getMonth() + 1) + '/' + this.todayDate.getDate() + '/' + this.todayDate.getFullYear()) {
      this.today.push(element);
    }
  });
}
  Afisare(){
    this.statisticTable = [];
    this.today = [];
    this.statistic.forEach((element) => {
    const dateString = element.time;
    const dateObj = new Date(dateString);
    const date = (dateObj.getMonth()+1)+'/'+dateObj.getDate()+'/'+dateObj.getFullYear();
    this.formattedDate = moment(this.selectedDate).format('M/D/YYYY');
      if(date == this.formattedDate){
        this.statisticTable.push(element);
        this.mesaj = ' ';
      }else{
        this.mesaj = 'Nu există înregistrări în această zi!';
      }
    });
  }

  Editare(persoana:modelUser):void{
     localStorage.setItem("id",persoana.id.toString());
     this.router.navigate(["edit"]);
  }

  isToday(element: any): boolean {
    const today = new Date();
    const date = new Date(element.time);
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

  isTodayProgram(dayOfWeek: string): boolean {
    const today = new Date().getDay(); // 0 pentru duminică, 1 pentru luni, etc.
    const index = this.ordineaZilelor.indexOf(dayOfWeek.toLowerCase());
    return (index+1) === today;
  }
}
