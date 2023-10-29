import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { getPageCount } from 'src/app/utils/getPageCount';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() totalCount!: number;
  @Input() pageParam: number = 1;
  private PRODUCT_LIMIT_FOR_PAGE = 8;
  public paginationList: number[] = [];

  constructor(private router: Router, private activedRoute: ActivatedRoute, ) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => {
    //   return false;
    // };
    // this.activedRoute.params.subscribe(params => this._onRouteGetParams(params));
  }

  ngOnInit(): void {
    // this.paginationItems();
    console.log(this.pageParam);
  }

  toInt(value: string) {
    return Number(value);
  }

  paginate(value: string) {
    console.log(value);
    if (Number(value) < 1 || Number(value) > getPageCount(this.totalCount, this.PRODUCT_LIMIT_FOR_PAGE))
      return;

    this.activedRoute.queryParams.subscribe(params => {
      this.router.navigate(['home'], { queryParams: { ...params, page: value } }, )
    });
  }

  paginationItems() {
    var pages = getPageCount(this.totalCount, this.PRODUCT_LIMIT_FOR_PAGE);
    var newPaginationNumbers = [];

    // return Array.from(Array(pages).keys()).map(page => console.log(page));
    return Array.from(Array(pages).keys());
  }
}
