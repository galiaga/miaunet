import { Component, OnInit } from '@angular/core';
import { Cat } from '../../models/cat';
import { CatService } from '../../services/cat.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css'],
  providers: [CatService],
})
export class CatsComponent implements OnInit {
  public cats: Cat[];
  public url: string;

  constructor(private _catService: CatService) {
    this.url = global.url;
  }

  ngOnInit() {
    this.getCats();
  }

  getCats() {
    this._catService.getCats().subscribe(
      (response) => {
        if (response.cats) {
          this.cats = response.cats;
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
