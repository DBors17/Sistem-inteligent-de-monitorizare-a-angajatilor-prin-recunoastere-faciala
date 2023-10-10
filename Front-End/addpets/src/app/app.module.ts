import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditComponent } from './Animal/edit/edit.component';
import { AddComponent } from './Animal/add/add.component';
import { HeaderComponent } from './Animal/header/header.component';
import { CardComponent } from './Animal/card/card.component';
import { ServiceService } from '../app/Service/service.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SecurityComponent } from './Animal/security/security.component';
import { BasicAuthHtppInterceptorService } from './interceptor';
import { WebcamModule } from 'ngx-webcam';
import { FaceRComponent } from './Animal/face-r/face-r.component';
import { PersonalComponent } from './Animal/personal/personal.component';
import { ProgramComponent } from './Animal/program/program.component';
import { FooterComponent } from './Animal/footer/footer.component';
import { ChartComponent } from './Animal/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    AddComponent,
    HeaderComponent,
    CardComponent,
    SecurityComponent,
    FaceRComponent,
    PersonalComponent,
    ProgramComponent,
    FooterComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    WebcamModule
  ],
  providers: [ServiceService, { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
