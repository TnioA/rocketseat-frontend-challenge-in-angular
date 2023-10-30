import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public searchValue!: string;
  public totalCartProducts: number = 0;

  constructor(private router: Router, public cartService: CartService) {
    this.updateTotalCartProducts();
  }

  handleSearch() {
    if (!this.searchValue)
      return;

    this.router.navigate(['home'], { queryParams: { name: this.searchValue } });
  }

  updateTotalCartProducts() {
    // this.totalCartProducts = this.cartService.getTotalInfoCart()[0];
  }
}
