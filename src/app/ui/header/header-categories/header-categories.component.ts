import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-categories',
  templateUrl: './header-categories.component.html',
  styleUrls: ['./header-categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderCategoriesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
