import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { Base64ToGallery, Base64ToGalleryOptions } from '@ionic-native/base64-to-gallery/ngx';

  


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements AfterViewInit {
  @ViewChild('imageCanvas', { static: false }) canvas: any;
  canvasElement: any;
  saveX: number;
  saveY: number;
  
  selectedColor = '#faf281';
  colors = [ '#fafa96', '#feffe2', '#ff6c40', '#ffffff', '#222222' ];
 
  drawing = false;
  lineWidth = 10;
 
  constructor(private plt: Platform, private base64ToGallery: Base64ToGallery, private toastCtrl: ToastController) {}
 
  ngAfterViewInit() {
    // Set the Canvas Element and its size
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width() + '';
    this.canvasElement.height = (this.plt.height() * 0.5) + '';
  }
 ///////////////////////////Drawing
  startDrawing(ev) {
    this.drawing = true;
    var canvasPosition = this.canvasElement.getBoundingClientRect();
 
    this.saveX = ev.pageX - canvasPosition.x;
    this.saveY = ev.pageY - canvasPosition.y;
  }
 
  endDrawing() {
    this.drawing = false;
  }  
  
  moved(ev) {
    if (!this.drawing) return;
   
    var canvasPosition = this.canvasElement.getBoundingClientRect();
    let ctx = this.canvasElement.getContext('2d');
   
    let currentX = ev.pageX - canvasPosition.x;
    let currentY = ev.pageY - canvasPosition.y;
   
    ctx.lineJoin = 'round';
    ctx.strokeStyle = this.selectedColor;
    ctx.lineWidth = this.lineWidth;
   
    ctx.beginPath();
    ctx.moveTo(this.saveX, this.saveY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
   
    ctx.stroke();
   
    this.saveX = currentX;
    this.saveY = currentY;
  }
 ////////////////////////////canvas
  selectColor(color) {
    let sand = document.getElementById("canvas")
    let garden = this.canvasElement.getContext('2d');
    garden.fillStyle = color;
    garden.fillRect(0, 0, garden.canvas.width, garden.canvas.height);
    if (color =='#fafa96'){
      this.selectedColor ='#faf281';
    }else if (color =='#feffe2'){
      this.selectedColor ='#f2f2dc';
    }else if (color =='#ff6c40'){
      this.selectedColor ='#f26040';
    }else if (color =='#ffffff'){
      this.selectedColor ='#e0f7ff';
    }else if (color =='#222222'){
      this.selectedColor ='#1a1a1a';
    }else{
      this.selectedColor ='#000088';
    } 
   

  }
 
  setOnFire() {

   
      
    //TODO set fireBase
  }
  liner(int){
    this.lineWidth = int;

  }

   
  exportCanvasImage() {
    var dataUrl = this.canvasElement.toDataURL();
   
    
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
   
   
    if (this.plt.is('cordova')) {
      const options: Base64ToGalleryOptions = { prefix: 'canvas_', mediaScanner:  true };
   
      this.base64ToGallery.base64ToGallery(dataUrl, options).then(
        async res => {
          const toast = await this.toastCtrl.create({
            message: 'Image saved!',
            duration: 2000
          });
          toast.present();
        },
        err => console.log('Error connot save ', err)
      );
    } else {
      //Desktop
      var data = dataUrl.split(',')[1];
      let blob = this.b64toBlob(data, 'image/png');
   
      var a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = 'canvasimage.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
   
  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
   
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
   
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
   
      var byteArray = new Uint8Array(byteNumbers);
   
      byteArrays.push(byteArray);
    }
   
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

}