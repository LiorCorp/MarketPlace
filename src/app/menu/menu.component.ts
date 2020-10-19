import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu.model';
import { FakeService } from '../services/fake.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu: Observable<Menu[]>;
  treeControl = new NestedTreeControl<Menu>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Menu>();
  lastParentNodeSelected: Menu;
  lastChildrenNodeSelected: Menu;

  constructor(private readonly fakeService: FakeService) {
    this.fakeService.getMenu().subscribe((menuItems => {
      this.dataSource.data = menuItems;
    }));
  }

  ngOnInit(): void {
    this.lastParentNodeSelected = null;
    this.lastChildrenNodeSelected = null;
    this.menu = this.fakeService.getMenu();
  }

  hasChild = (_: number, node: Menu) => !!node.children && node.children.length > 0;

  expandAndCollapse(dataNode: Menu, treeControl: NestedTreeControl<Menu>): void {
    // On root parent expand
    if (!treeControl.isExpanded(dataNode) && dataNode.level === 0) {
      this.expandAndCollapseDataNode(dataNode, this.lastParentNodeSelected, treeControl);
      this.lastParentNodeSelected = dataNode;
      // On children expand
    } else if (!treeControl.isExpanded(dataNode) && dataNode.level === 1) {
      this.expandAndCollapseDataNode(dataNode, this.lastChildrenNodeSelected, treeControl);
      this.lastChildrenNodeSelected = dataNode;
    }
  }

  expandAndCollapseDataNode(dataNode: Menu, lastDataNode: Menu, treeControl: NestedTreeControl<Menu>): void {
    // Collapse the last expanded, if an other root parent expand
    if (lastDataNode && lastDataNode !== dataNode) {
      treeControl.collapse(lastDataNode);
    }
    treeControl.expand(dataNode);
  }

  hoverIsOutside(treeControl: NestedTreeControl<Menu>): void {
    treeControl.collapseAll();
  }
}
