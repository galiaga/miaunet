import { Component, OnInit } from '@angular/core';
import { Cat } from '../../models/cat';
import { CatService } from '../../services/cat.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [CatService],
})
export class CreateComponent implements OnInit {
  public title: string;
  public cat: Cat;
  public status: string;

  constructor(private _catService: CatService) {
    this.title = 'Añadir gato';
    this.cat = new Cat('', '', 0, 0, '', '');
  }

  ngOnInit(): void {}

  onSubmit(form) {
    this._catService.saveCat(this.cat).subscribe(
      (response) => {
        if (response.cat) {
          this.status = 'success';
          form.reset();
        } else {
          this.status = 'failed';
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
