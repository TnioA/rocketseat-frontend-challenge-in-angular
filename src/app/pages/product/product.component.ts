import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { convertCategory } from 'src/app/utils/convertCategory';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public product!: ProductModel;
  constructor(
    private route: ActivatedRoute, 
    private apiService: ApiService, 
    private cartService: CartService,
    private router: Router
  ) { }

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    var result = await this.apiService.GetById(id);
    if (!result.success)
      return;

    this.product = result.data;
  }

  convertCategoryHandler(category: string) {
    return convertCategory(category);
  }

  handleAddProduct() {
    this.product.count = 1;
    this.cartService.add(this.product);
    this.router.navigate(["cart"]);
  }
}
