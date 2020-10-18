import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FakeService } from '../services/fake.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent implements OnInit {

  constructor(readonly fakeService: FakeService) {
  }

  ngOnInit(): void {
  }
}
