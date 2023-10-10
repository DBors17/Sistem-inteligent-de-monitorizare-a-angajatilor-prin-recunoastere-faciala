import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { modelUser } from 'src/app/Model/User';
import { JwtClientService } from 'src/app/Service/jwt-client.service';
import { ServiceService } from 'src/app/Service/service.service';
import { Login } from 'src/app/Model/Login';

@Component({
  selector: 'app-face-r',
  templateUrl: './face-r.component.html',
  styleUrls: ['./face-r.component.css']
})
export class FaceRComponent {
  private stream: MediaStream| null;
  reason: string = "";
  progres:boolean = false;
  cameraStarted = false;
  isUserAuthenticated = false;
  persoana:modelUser = new modelUser();
  user: Login = new Login();
  hasCapturedPhoto:boolean = false;

  constructor(public service: ServiceService, private router: Router, private loginService:JwtClientService) {}

  @ViewChild('video') video: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;

  ngOnInit(): void {
   this.loginService.isUserAuthenticated.subscribe(data=>{
      if(sessionStorage.getItem('token') != null && this.loginService.isTokenValid()){
        this.isUserAuthenticated = true;
      }else{
        this.isUserAuthenticated = false;
      }
      });
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  getRecognizedId() {
      this.service.getPersoanaId(this.service.id)
      .subscribe(
        data => {
          this.persoana = data;
          this.user.userName = this.persoana.userName;
          this.user.password = this.persoana.password;
          this.loginService.getAccessToken(this.user);
        },
        error => {
          console.error('Error retrieving ID:', error);
        }
      );
  }

  startCamera(): void {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
        this.stream = stream;
        this.cameraStarted = true;
      });
  }

  stopCamera(): void {
    if (this.stream) {
      const tracks = this.stream.getTracks();
      tracks.forEach(track => track.stop());
      this.stream = null;
      this.cameraStarted = false;
    }
  }

  capture(): void {
    const context = this.canvas.nativeElement.getContext('2d');
    if (context) {
      this.canvas.nativeElement.width = 640; 
      this.canvas.nativeElement.height = 480; 
  
      context.drawImage(this.video.nativeElement, 0, 0, 640, 480);
      const imageData = this.canvas.nativeElement.toDataURL('image/jpeg', 1.0);
      const imageBlob = this.dataURItoBlob(imageData);
      this.service.uploadImageToRecognize(imageBlob).subscribe(response => {
      });
      this.hasCapturedPhoto = true;
      this.stopCamera();
    }
  }

  private dataURItoBlob(dataURI: string): Blob {
    const splitDataURI = dataURI.split(',');
    const byteString = atob(splitDataURI[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([uint8Array], { type: 'image/jpeg' });
  }

  handleButtonClick(value: string) {
    this.reason = value;
    this.startCamera();
  }

  runPython() {
    const param = 'image.jpeg';
    this.service.runPython(param,this.reason).subscribe((response) => {
    this.service.id = Number(response);
    });
    this.reason = '';
    this.progres = true;
    this.stopCamera();
  }
}
