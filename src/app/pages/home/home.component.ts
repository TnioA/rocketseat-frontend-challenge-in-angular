import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private PRODUCT_LIMIT_FOR_PAGE = 8;

  public categoriesDrop: boolean = false;
  public orderByDrop: boolean = false;

  public categoryParam!: string;
  public nameParam!: string;
  public pageParam!: string;
  public totalCount!: number;

  public products: ProductModel[] | null = [];

  constructor(
    private apiService: ApiService, 
    private route: ActivatedRoute, 
    private loadingService: LoadingService
  ) {
    this.route.queryParams.subscribe(params => {
      this.categoryParam = params['category'];
      this.nameParam = params['name'];
      this.pageParam = params['page'];
    });
  }

  async ngOnInit() {
    this.loadingService.show();
    this.products = [];
    var result = await this.apiService.GetAllByFilter(this.categoryParam, this.nameParam, Number(this.pageParam ?? "1"), this.PRODUCT_LIMIT_FOR_PAGE);
    if (!result.success || !result.data?.products || result.data.products.length === 0) {
      this.loadingService.hide();
      this.products = null;
      return;
    }

    this.products = result.data.products;
    this.totalCount = result.data.totalCount;
    this.loadingService.hide();
  }

  toInt(value: string) {
    if (!value)
      return 0;

    return Number(value);
  }
}