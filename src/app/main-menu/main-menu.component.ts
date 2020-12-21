import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { AuthService } from '../services/auth.service';
import { FakeService } from '../services/fake.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  animations: [
    trigger('category', [
      state(
        'display',
        style({
          opacity: '1',
          transform: 'translateX(0%)',
        })
      ),
      state(
        'hide',
        style({
          opacity: '0',
          transform: 'translateX(10%)',
        })
      ),
      transition('hide <=> display', [animate('300ms')]),
    ]),
  ],
})
export class MainMenuComponent implements OnInit {
  menuItems: Category[];
  menuItemSelected: Category;
  menuItemChildSelected: Category;
  itemHovered: Category;
  itemChildHovered: Category;
  itemBabyHovered: Category;
  displayCategoriesChild = false;
  isAuthenticated: firebase.default.User;

  constructor(
    private readonly fakeService: FakeService,
    private readonly authService: AuthService
  ) {
    this.fakeService.getMenu().subscribe((menuItems) => {
      this.menuItems = menuItems;
      this.itemHovered = this.menuItems[0];
      this.menuItemSelected = this.itemHovered;
    });
    this.authService.currentAuthStatus.subscribe(
      (authStatus) => (this.isAuthenticated = authStatus)
    );
  }

  ngOnInit(): void {}

  hoverMenuItem(item: Category): void {
    this.menuItemSelected = item;
    this.itemHovered = item;
  }

  hoverMenuItemChild(item: Category): void {
    this.menuItemChildSelected = item;
    this.itemChildHovered = item;
  }

  hoverMenuItemBaby(item: Category): void {
    this.itemBabyHovered = item;
  }

  mouseLeaveCategoriesBaby(): void {
    this.itemChildHovered = null;
    this.itemBabyHovered = null;
  }

  categoriesParentAnimationDone(event): void {
    if (event.fromState !== 'void') {
      this.displayCategoriesChild = true;
    }
  }
}
