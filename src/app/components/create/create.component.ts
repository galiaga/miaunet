import { Component, OnInit } from '@angular/core';
import { Cat } from '../../models/cat';
import { CatService } from '../../services/cat.service';
import { UploadService } from '../../services/upload.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [CatService, UploadService],
})
export class CreateComponent implements OnInit {
  public title: string;
  public cat: Cat;
  public status: string;
  public filesToUpload: Array<File>;

  constructor(
    private _catService: CatService,
    private _uploadService: UploadService
  ) {
    this.title = 'Añadir gato';
    this.cat = new Cat('', '', 0, 0, '', '');
  }

  ngOnInit(): void {}

  onSubmit(form) {
    // Guardar datos básicos
    this._catService.saveCat(this.cat).subscribe(
      (response) => {
        if (response.cat) {
          // Subir la imagen
          this._uploadService
            .makeFileRequest(
              global.url + '/upload-image/' + response.cat._id,
              [],
              this.filesToUpload,
              'image'
            )
            .then((result: any) => {
              this.status = 'success';
              console.log(result);
              form.reset();
            });
        } else {
          this.status = 'failed';
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
