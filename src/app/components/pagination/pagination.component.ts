import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  toInt(value: string) {
    return Number(value);
  }

  paginate(value: string) {
    if (Number(value) < 1 || Number(value) > getPageCount(this.totalCount, this.PRODUCT_LIMIT_FOR_PAGE))
      return;

    this.activedRoute.queryParams.subscribe(params => {
      this.router.navigate(['home'], { queryParams: { ...params, page: value } }, );
    });
  }

  paginationItems() {
    var pages = getPageCount(this.totalCount, this.PRODUCT_LIMIT_FOR_PAGE);

    return Array.from(Array(pages).keys());
  }
}
