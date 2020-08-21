import { Component, OnInit } from '@angular/core';
import { Cat } from '../../models/cat';
import { CatService } from '../../services/cat.service';
import { UploadService } from '../../services/upload.service';
import { global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [CatService, UploadService],
})
export class EditComponent implements OnInit {
  public title: string;
  public cat: Cat;
  public save_cat;
  public status: string;
  public filesToUpload: Array<File>;
  public url: string;

  constructor(
    private _catService: CatService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = 'Editar gato';
    this.url = global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      let id = params.id;

      this.getCat(id);
    });
  }

  getCat(id) {
    this._catService.getCat(id).subscribe(
      (response) => {
        this.cat = response.cat;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  onSubmit() {
    this._catService.updateCat(this.cat).subscribe(
      (response) => {
        if (response.cat) {
          // Subir la imagen
          if (this.filesToUpload) {
            this._uploadService
              .makeFileRequest(
                global.url + '/upload-image/' + response.cat._id,
                [],
                this.filesToUpload,
                'image'
              )
              .then((result: any) => {
                this.save_cat = result.cat;

                this.status = 'success';
              });
          } else {
            this.save_cat = response.cat;

            this.status = 'success';
          }
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
