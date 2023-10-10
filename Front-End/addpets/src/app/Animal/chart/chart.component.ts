import { Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { ServiceService } from 'src/app/Service/service.service';
import { ModelProgram } from 'src/app/Model/Program';
import { ModelStatistic } from 'src/app/Model/Statistic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  loginService: any;
  constructor(private service:ServiceService, private router:Router) {}
  todayDate:Date;
  statistic:ModelStatistic[] = [];
  statisticLuni:ModelStatistic[] = [];
  statisticMarti:ModelStatistic[] = [];
  statisticMiercuri:ModelStatistic[] = [];
  statisticJoi:ModelStatistic[] = [];
  statisticVineri:ModelStatistic[] = [];
  totalLuni = 0;
  totalMarti = 0;
  totalMiercuri = 0;
  totalJoi = 0;
  totalVineri = 3;
  oraLuni:string[] = [];
  oraMarti:string[] = [];
  oraMiercuri:string[] = [];
  oraJoi:string[] = [];
  oraVineri:string[] = [];
  programLuni:string[] = [];
  programMarti:string[] = [];
  programMiercuri:string[] = [];
  programJoi:string[] = [];
  programVineri:string[] = [];
  today:ModelStatistic[] = [];
  program: ModelProgram[] = [];
  userId = Number(localStorage.getItem("id"));
  ordineaZilelor = ['luni', 'marti', 'miercuri', 'joi', 'vineri'];
  tod: string;
  myId:Number = 0;
  index:number = 0;
  // Referință la instanța graficului
  chart: am4charts.XYChart | undefined;
  ngOnInit() {

    this.service.getStatisticById(this.userId).subscribe((response) => {
      this.statistic = response;
      this.statistic.sort((a, b) => {
        const order = ['Intrare tura', 'Intrare pauza', 'Iesire pauza', 'Iesire tura'];
        return order.indexOf(a.reason) - order.indexOf(b.reason);
      });
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

    // Setăm tema animată pentru grafic
    am4core.useTheme(am4themes_animated);
     // Inițializăm instanța graficului
    this.chart = am4core.create('chartdiv', am4charts.XYChart);
  }

  configureChart(){
      if (!this.chart) {
        return;
      }
      // Adăugăm datele la grafic
      this.chart.data = [
        { employee: 'Luni', delay: this.totalLuni},
        { employee: 'Marti', delay: this.totalMarti},
        { employee: 'Miercuri', delay: this.totalMiercuri},
        { employee: 'Joi', delay: this.totalJoi},
        { employee: 'Vineri', delay: this.totalVineri}
      ];

      // Setăm axele și valorile graficului
      let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'employee';
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;

      let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());

      let series = this.chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = 'delay';
      series.dataFields.categoryX = 'employee';
      series.name = 'Intârzieri';
      series.columns.template.tooltipText = 'Ziua: {categoryX}\nIntârziere: {valueY} minute';
      series.columns.template.fill = am4core.color('rgb(78, 136, 127)');

      // Adăugăm textul "Săptămâna trecută" în partea stângă a graficului
      let title = this.chart.titles.create();
      title.text = "Întârzieri săptămâna trecută";
      title.fontSize = 20;
      title.fontWeight = 'bold';
      title.marginBottom = 15;
      title.marginLeft = 15;
      title.align = "left";
      title.fill = am4core.color("rgb(13, 62, 53)");

      // Adăugăm etichetele pe bare
      let labelBullet = series.bullets.push(new am4charts.LabelBullet());
      //labelBullet.label.text = '{valueY}';
      labelBullet.locationY = 0.5;
      labelBullet.label.fill = am4core.color('#ffffff');
      labelBullet.label.fontSize = 12;
      labelBullet.label.fontWeight = 'bold';

      // Configurăm animațiile pentru grafic
      this.chart.responsive.enabled = true;
      this.chart.responsive.useDefault = false;

      // Generăm efectul de "scroll" orizontal în grafic
      this.chart.scrollbarX = new am4core.Scrollbar();

      // Generăm efectul de hover pentru bare
      series.columns.template.column.adapter.add('fill', function(fill, target) {
        if (target.dataItem && target.dataItem.index === categoryAxis.dataItems.length - 1) {
          return am4core.color('rgb(78, 136, 127)'); 
        }
        return fill;
      });
  }

  getDayOfWeek(dateTimeString: string): string {
    const date: Date = new Date(dateTimeString);
    const dayIndex: number = date.getDay();
    return this.ordineaZilelor[dayIndex-1];
  }

  getDayIndex(dayOfWeek:string) {
    const lowerCaseDay = dayOfWeek.toLowerCase();
    const index = this.ordineaZilelor.indexOf(lowerCaseDay);
    return index;
  }

  dayStatistics(){
    this.program.forEach((element) => {
      if(element.zi === 'luni'){
         this.programLuni.push(element.intrare.slice(0, 5), element.intrareMasa.slice(0, 5), element.iesireMasa.slice(0, 5), element.iesire.slice(0, 5));
      }
      if(element.zi === 'marti'){
        this.programMarti.push(element.intrare.slice(0, 5), element.intrareMasa.slice(0, 5), element.iesireMasa.slice(0, 5), element.iesire.slice(0, 5));
      }
      if(element.zi === 'miercuri'){
        this.programMiercuri.push(element.intrare.slice(0, 5), element.intrareMasa.slice(0, 5), element.iesireMasa.slice(0, 5), element.iesire.slice(0, 5));
      }
      if(element.zi === 'joi'){
        this.programJoi.push(element.intrare.slice(0, 5), element.intrareMasa.slice(0, 5), element.iesireMasa.slice(0, 5), element.iesire.slice(0, 5));
      }
      if(element.zi === 'vineri'){
        this.programVineri.push(element.intrare.slice(0, 5), element.intrareMasa.slice(0, 5), element.iesireMasa.slice(0, 5), element.iesire.slice(0, 5));
      }
    });
  this.statistic.forEach((element) => {
    const dateString = element.time;
    const dateObj = new Date(dateString);
    const currentDate = new Date();
    const oneWeekAgo = new Date();
    this.index = this.getDayIndex(this.getDayOfWeek(currentDate.toDateString()));
    oneWeekAgo.setDate(oneWeekAgo.getDate() - (this.index+8));
    currentDate.setDate(currentDate.getDate() - (this.index+3));
    if (dateObj >= oneWeekAgo && dateObj <= currentDate){
    const date = (dateObj.getMonth()+1)+'-'+dateObj.getDate()+'-'+dateObj.getFullYear();
      if(this.getDayOfWeek(date) === 'luni'){
        this.statisticLuni.push(element);
      }
      if(this.getDayOfWeek(date) === 'marti'){
        this.statisticMarti.push(element);
      }
      if(this.getDayOfWeek(date) === 'miercuri'){
        this.statisticMiercuri.push(element);
      }
      if(this.getDayOfWeek(date) === 'joi'){
        this.statisticJoi.push(element);
      }
      if(this.getDayOfWeek(date) === 'vineri'){
        this.statisticVineri.push(element);
      } 
    }
    });
} 
  executieStatistica(){
    this.dayStatistics();
        this.statisticLuni.forEach((element) => {
          const timeString = element.time;
          const timeComponents = timeString.split(' ')[1].split(':');
          const hourMinutes = timeComponents.slice(0, 2).join(':');
          this.oraLuni.push(hourMinutes);
        });
        this.statisticMarti.forEach((element) => {
          const timeString = element.time;
          const timeComponents = timeString.split(' ')[1].split(':');
          const hourMinutes = timeComponents.slice(0, 2).join(':');
          this.oraMarti.push(hourMinutes);
        });
        this.statisticMiercuri.forEach((element) => {
          const timeString = element.time;
          const timeComponents = timeString.split(' ')[1].split(':');
          const hourMinutes = timeComponents.slice(0, 2).join(':');
          this.oraMiercuri.push(hourMinutes);
        });
        this.statisticJoi.forEach((element) => {
          const timeString = element.time;
          const timeComponents = timeString.split(' ')[1].split(':');
          const hourMinutes = timeComponents.slice(0, 2).join(':');
          this.oraJoi.push(hourMinutes);
        });
        this.statisticVineri.forEach((element) => {
          const timeString = element.time;
          const timeComponents = timeString.split(' ')[1].split(':');
          const hourMinutes = timeComponents.slice(0, 2).join(':');
          this.oraVineri.push(hourMinutes);
        });

       
      for (let i = 0; i < this.programLuni.length; i++) {
        const programTime = this.programLuni[i];
        const registrationTime = this.oraLuni[i];

        const programComponents = programTime.split(":");
        const registrationComponents = registrationTime.split(":");

        const programHours = parseInt(programComponents[0], 10);
        const programMinutes = parseInt(programComponents[1], 10);
        const registrationHours = parseInt(registrationComponents[0], 10);
        const registrationMinutes = parseInt(registrationComponents[1], 10);

        const minutesLate = (registrationHours - programHours) * 60 + (registrationMinutes - programMinutes);

        if (minutesLate > 0) {
          this.totalLuni += minutesLate;
        }
      }
     
      
     for (let i = 0; i < this.programMarti.length; i++) {
      const programTime = this.programMarti[i];
      const registrationTime = this.oraMarti[i];

      const programComponents = programTime.split(":");
      const registrationComponents = registrationTime.split(":");

      const programHours = parseInt(programComponents[0], 10);
      const programMinutes = parseInt(programComponents[1], 10);
      const registrationHours = parseInt(registrationComponents[0], 10);
      const registrationMinutes = parseInt(registrationComponents[1], 10);

      const minutesLate = (registrationHours - programHours) * 60 + (registrationMinutes - programMinutes);

      if (minutesLate > 0) {
        this.totalMarti += minutesLate;
      }
    }

    
    for (let i = 0; i < this.programMiercuri.length; i++) {
      const programTime = this.programMiercuri[i];
      const registrationTime = this.oraMiercuri[i];

      const programComponents = programTime.split(":");
      const registrationComponents = registrationTime.split(":");

      const programHours = parseInt(programComponents[0], 10);
      const programMinutes = parseInt(programComponents[1], 10);
      const registrationHours = parseInt(registrationComponents[0], 10);
      const registrationMinutes = parseInt(registrationComponents[1], 10);

      const minutesLate = (registrationHours - programHours) * 60 + (registrationMinutes - programMinutes);

      if (minutesLate > 0) {
        this.totalMiercuri += minutesLate;
      }
    }

    
    for (let i = 0; i < this.programJoi.length; i++) {
      const programTime = this.programJoi[i];
      const registrationTime = this.oraJoi[i];

      const programComponents = programTime.split(":");
      const registrationComponents = registrationTime.split(":");

      const programHours = parseInt(programComponents[0], 10);
      const programMinutes = parseInt(programComponents[1], 10);
      const registrationHours = parseInt(registrationComponents[0], 10);
      const registrationMinutes = parseInt(registrationComponents[1], 10);

      const minutesLate = (registrationHours - programHours) * 60 + (registrationMinutes - programMinutes);

      if (minutesLate > 0) {
        this.totalJoi += minutesLate;
      }
    }

   
    // for (let i = 0; i < this.programVineri.length-2; i++) {
    //   const programTime = this.programVineri[i];
    //   const registrationTime = this.oraVineri[i];

    //   const programComponents = programTime.split(":");
    //   const registrationComponents = registrationTime.split(":");

    //   const programHours = parseInt(programComponents[0], 10);
    //   const programMinutes = parseInt(programComponents[1], 10);
    //   const registrationHours = parseInt(registrationComponents[0], 10);
    //   const registrationMinutes = parseInt(registrationComponents[1], 10);

    //   const minutesLate = (registrationHours - programHours) * 60 + (registrationMinutes - programMinutes);

    //   if (minutesLate > 0) {
    //     this.totalVineri += minutesLate;
    //   }
    // }
    this.configureChart();
  }
}
