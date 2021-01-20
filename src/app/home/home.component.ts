import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from '../models/Product.model';
import { AppState } from '../store/app-state/app.state';
import { ProductService } from './../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Select(AppState.products) productsList$: Observable<Product[]>;

  advantages = [
    {
      title: 'home.advantages.money-gain.title',
      icon: '../../assets/svg/saving.svg',
      description: 'home.advantages.money-gain.description',
    },
    {
      title: 'home.advantages.time-gain.title',
      icon: '../../assets/svg/time.svg',
      description: 'home.advantages.time-gain.description',
    },
    {
      title: 'home.advantages.certified-sellers.title',
      icon: '../../assets/svg/certified-sellers.svg',
      description: 'home.advantages.certified-sellers.description',
    },
    {
      title: 'home.advantages.secured-data.title',
      icon: '../../assets/svg/privacy.svg',
      description: 'home.advantages.secured-data.description',
    },
    {
      title: 'home.advantages.advice-practitioners.title',
      icon: '../../assets/svg/feedback.svg',
      description: 'home.advantages.advice-practitioners.description',
    },
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}
}
