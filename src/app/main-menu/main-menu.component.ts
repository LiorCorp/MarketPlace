import { Component, OnInit } from '@angular/core';
import { FakeService } from '../services/fake.service';
import { Menu } from './../models/menu.model';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  menuItems: Menu[];
  menuItemSelected: Menu;
  menuItemChildSelected: Menu;
  itemHovered: Menu;
  itemChildHovered: Menu;
  itemBabyHovered: Menu;

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
}
