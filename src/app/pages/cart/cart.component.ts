import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cartProducts: ProductModel[] = [];
  public cartValues: number[] = [0, 0];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartInfo();
  }

  updateCartInfo() {
    this.cartProducts = this.cartService.get();
    const values = this.cartService.getTotalInfoCart();
    this.cartValues = values;
  }

  removeProduct(id: number) {
    this.cartService.remove(id);
    this.updateCartInfo();
  }

  updateProductCount(id: number, count: string) {
    const product = this.cartProducts.find(x => x.id === id);
    if (!product)
      return;

    product.count = Number(count);
    this.cartService.update(product);

    this.updateCartInfo();
  }
}
