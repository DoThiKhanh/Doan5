import { Component, Injector, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../../lib/base-component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends BaseComponent implements OnInit {
  item:any;
 tuongtu:any;
  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    this.item = {};
    this.tuongtu=[];
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.get('/api/product/get-by-id/'+id).pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {
        this.item = res;
        setTimeout(() => {
          this.loadScripts();
        });
      });
    });
    this._route.params.subscribe(params => {
    let id = params['id'];
    this._api.get('/api/product/get-tuongtu/'+id).takeUntil(this.unsubscribe).subscribe(res => {
      this.tuongtu = res;});
    });
  }
  addToCart(it) {
    this._cart.addToCart(it);
    alert('Thêm thành công!');
  }
}
