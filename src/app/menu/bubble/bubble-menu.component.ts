import { Component, Input, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';
import { FakeService } from 'src/app/services/fake.service';

@Component({
  selector: 'app-bubble-menu',
  templateUrl: './bubble-menu.component.html',
  styleUrls: ['./bubble-menu.component.scss']
})
export class BubbleMenuComponent implements OnInit {

  @Input() menuClosed: boolean;
  menuHover: boolean;
  menuItems: Menu[];
  menuItemSelected: Menu;
  menuItemChildSelected: Menu;
  itemHovered: Menu;
  itemChildHovered: Menu;
  itemBabyHovered: Menu;

  constructor(private readonly fakeService: FakeService) {
    this.menuHover = false;
    this.menuItemSelected = null;
    this.menuItemChildSelected = null;
    this.fakeService.getMenu().subscribe((menuItems => {
      this.menuItems = menuItems;
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
}
