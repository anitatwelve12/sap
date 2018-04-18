import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'app';
  uploader:FileUploader;
    hasBaseDropZoneOver:boolean;
    response:string;
    constructor (){
        this.uploader = new FileUploader({
            url:'http://localhost:3001/upload',
            disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
            formatDataFunctionIsAsync: true,
            formatDataFunction: async (item) => {
                return new Promise( (resolve, reject) => {
                     resolve({
                    name: item._file.name,
                    length: item._file.size,
                    contentType: item._file.type,
                    date: new Date()
                });
            });
        }
    });
    console.log(this.uploader);

    this.hasBaseDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe( res => this.response = res );
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
}
