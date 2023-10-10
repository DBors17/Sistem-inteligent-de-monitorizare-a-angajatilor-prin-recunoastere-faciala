import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModelProgram } from 'src/app/Model/Program';
import { JwtClientService } from 'src/app/Service/jwt-client.service';
import { ServiceService } from 'src/app/Service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent {

constructor(private service:ServiceService, private router:Router,  private loginService:JwtClientService){}

program:ModelProgram = new ModelProgram();
programs: ModelProgram[] = [];
zi: string = "";
intrare: string = "";
intrareMasa: string = "";
iesireMasa: string = "";
iesire: string = "";
editable:boolean =true;
aceeasiZi:boolean = false;
ordineaZilelor = ['luni', 'marti', 'miercuri', 'joi', 'vineri'];

ngOnInit(): void {
  this.service.getProgramById(Number(localStorage.getItem("id"))).subscribe((response) => {
    this.programs = response;
  
  this.programs.sort((a, b) => {
    const ziA = a.zi.toLowerCase();
    const ziB = b.zi.toLowerCase();
    
    const indexZiA = this.ordineaZilelor.indexOf(ziA);
    const indexZiB = this.ordineaZilelor.indexOf(ziB);
    
    return indexZiA - indexZiB;
  });
  });
}

editProgram(program:ModelProgram){
  this.service.updateProgram(program).subscribe((data)=>{
    this.program = data;
  })
}


addProgram(program: ModelProgram) {
  program.id = Number(localStorage.getItem("id"));
  program.zi = this.zi;
  program.intrare = this.intrare+':00';
  program.intrareMasa = this.intrareMasa+':00';
  program.iesireMasa = this.iesireMasa+':00';
  program.iesire = this.iesire+':00';

  let isProgramValid = true; // Variabilă de control pentru verificarea programului

  this.programs.forEach((element) => {
    if (this.zi == element.zi) {
      Swal.fire({
        title: 'Eroare',
        text: 'Pentru ' + this.zi + ' deja există un program!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      isProgramValid = false; // Setează variabila de control ca false dacă există deja un program pentru ziua respectivă
    }
  });

  if (!isProgramValid) {
    return; // Întrerupe execuția dacă programul nu este valid
  }

  if (this.intrare == '' || this.intrareMasa == '' || this.iesireMasa == '' || this.iesire == '' || this.zi == '') {
    Swal.fire({
      title: 'Eroare',
      text: 'Trebuie completat fiecare câmp!',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  } else {
    this.service.createProgram(program)
      .subscribe(data => {
        Swal.fire({
          title: 'Succes',
          text: 'A fost adăugat un nou program!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.intrare = '';
        this.intrareMasa = '';
        this.iesireMasa = '';
        this.iesire = '';
        this.programs.push(program);
        this.router.navigate(['program']);
      });
  }
}
}
