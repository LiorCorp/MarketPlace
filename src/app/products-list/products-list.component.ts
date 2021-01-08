import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product.model';
import { ProductService } from '../services/product.service';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  productsList: Product[];
  sellersMap = new Map();
  constructor(
    private readonly productService: ProductService,
    private readonly sellerService: SellerService
  ) {}

  ngOnInit(): void {
    this.productService.getHomeProducts(36).then((products) => {
      this.productsList = products;
    });
    this.sellerService.getAllSeller().subscribe((sellers) => {
      sellers.forEach((seller) => {
        this.sellersMap.set(seller.id, seller.data().name);
      });
    });
  }
}
