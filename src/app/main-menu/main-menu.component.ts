import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FakeService } from '../services/fake.service';
import { Menu } from './../models/menu.model';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  animations: [
    trigger('category', [
      state('display', style({
        opacity: '1',
        transform: 'translateX(0%)',
      })),
      state('hide', style({
        opacity: '0',
        transform: 'translateX(10%)',
      }),
      ),
      transition('hide <=> display', [
        animate('300ms'),
      ])
    ])
  ]
})
export class MainMenuComponent implements OnInit {

  menuItems: Menu[];
  menuItemSelected: Menu;
  menuItemChildSelected: Menu;
  itemHovered: Menu;
  itemChildHovered: Menu;
  itemBabyHovered: Menu;
  displayCategoriesChild = false;

  constructor(private readonly fakeService: FakeService) {
    this.fakeService.getMenu().subscribe((menuItems => {
      this.menuItems = menuItems;
      this.itemHovered = this.menuItems[0];
      this.menuItemSelected = this.itemHovered;
    }));
  }

  ngOnInit(): void {
  }

  hoverMenuItem(item: Menu): void {
    this.menuItemSelected = item;
    this.itemHovered = item;
  }

  hoverMenuItemChild(item: Menu): void {
    this.menuItemChildSelected = item;
    this.itemChildHovered = item;
  }

  hoverMenuItemBaby(item: Menu): void {
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
