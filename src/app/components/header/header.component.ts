import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public searchValue!: string;
  constructor(private router: Router) {

  }
  handleSearch() {
    if (!this.searchValue)
      return;

    this.router.navigate(['home'], { queryParams: { name: this.searchValue } });
  }
}
