import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsHeaderComponent } from '../articles/news-header/news-header.component';
import { NewsCategoriesNavComponent } from '../articles/news-categories-nav/news-categories-nav.component';
import { SlidersComponent } from '../components/sliders/sliders.component';
import { QuickNavService } from '../reuseables/services/quick-nav.service'; // ✅ adjust path as needed

import { MobileMenuComponent } from "../components/mobile-menu/mobile-menu.component";

@Component({
  selector: 'app-main',
  imports: [
    CommonModule,
    // SpinnerComponent,
    MobileMenuComponent,
    NewsHeaderComponent,
    SlidersComponent,
    NewsCategoriesNavComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  constructor(
    public quickNav:QuickNavService
  ){}


}
