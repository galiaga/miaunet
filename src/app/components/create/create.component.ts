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

  constructor(private _catService: CatService) {
    this.title = 'Añadir gato';
    this.cat = new Cat('', '', 0, 0, '', '');

    /*    public _id: string,
    public name: string,
    public age_years: number,
    public age_months: number,
    public breed: string,
    public image: string
    */
  }

  ngOnInit(): void {}

  onSubmit(form) {
    console.log(this.cat);
  }
}
