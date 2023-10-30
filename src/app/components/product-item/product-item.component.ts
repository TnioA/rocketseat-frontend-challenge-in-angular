import { Component, Input } from '@angular/core';
import { ProductModel } from 'src/app/models/product';
import { convertPrice } from 'src/app/utils/convertPrice';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: ProductModel;

  convertPriceHandler(price: number) {
    return convertPrice(price);
  }
}
