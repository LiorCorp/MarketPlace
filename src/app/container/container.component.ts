import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../models/product.model';
import { FakeService } from '../services/fake.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  products: Observable<Product[]>;

  constructor(readonly fakeService: FakeService) { }

  ngOnInit(): void {
    this.products = this.fakeService.getProducts();
  }

}
