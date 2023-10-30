import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api.service';
import { convertCategory } from 'src/app/utils/convertCategory';
import { convertPrice } from 'src/app/utils/convertPrice';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public product!: ProductModel;
  constructor(private route: ActivatedRoute, private apiService: ApiService) {

  }

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    var result = await this.apiService.GetById(id);
    if (!result.success)
      return;

    this.product = result.data;
  }

  convertPriceHandler(price: number) {
    return convertPrice(price);
  }

  convertCategoryHandler(category: string) {
    return convertCategory(category);
  }

  handleAddProduct() {

  }
}
