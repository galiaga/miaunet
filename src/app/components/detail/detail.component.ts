import { Component, OnInit } from '@angular/core';
import { Cat } from '../../models/cat';
import { CatService } from '../../services/cat.service';
import { global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [CatService],
})
export class DetailComponent implements OnInit {
  public url: string;
  public cat: Cat;
  public confirm: boolean;

  constructor(
    private _catService: CatService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = global.url;
    this.confirm = false;
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

  setConfirm(confirm) {
    this.confirm = confirm;
  }

  deleteCat(id) {
    this._catService.deleteCat(id).subscribe(
      (response) => {
        if (response.cat) {
          this._router.navigate(['/cats']);
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
