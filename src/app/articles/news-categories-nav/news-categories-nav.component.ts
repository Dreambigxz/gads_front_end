import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NewsListComponent,
} from '../news-list/news-list.component';

import { QuickNavService } from '../../reuseables/services/quick-nav.service'; // ✅ adjust path as needed
import {  Router, NavigationEnd } from '@angular/router';
import { filter, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-news-categories-nav',
  imports: [
    CommonModule,
    NewsListComponent,

  ],
  templateUrl: './news-categories-nav.component.html',
  styleUrl: './news-categories-nav.component.scss'
})
export class NewsCategoriesNavComponent {

  @Input() activeCategory = 'all';

  @Output() categoryChanged =new EventEmitter<string>();
    categories: any[] = [
    {
      key: 'all',
      label: 'All',
      icon: 'bi-grid'
    },
    {},
    {
      key: 'sports',
      label: 'Sports',
      icon: 'bi-dribbble'
    },
    {
      key: 'technology',
      label: 'Technology',
      icon: 'bi-cpu-fill'
    },
    {
      key: 'business',
      label: 'Business',
      icon: 'bi-bar-chart-fill'
    },
    {
      key: 'entertainment',
      label: 'Entertainment',
      icon: 'bi-camera-reels-fill'
    }
  ];



  newsSections: any[] = [ ]
    filteredSections: any[] = [ ]

    constructor(
      private quickNav: QuickNavService,
      private router: Router

    ){}

  ngOnInit(){

    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(null)
    )
    .subscribe(() => {

      const url = new URL(window.location.href);
      if (url.pathname !== '/') return;

      if (!this.quickNav.storeData.get('articles')) {
        this.quickNav.reqServerData.get("articles/")
        .subscribe((res:any)=>{
          this.newsSections = this.quickNav.storeData.get('articles') || []
          if (this.latestNews.length) {
            this.categories[1]={
              key: 'latest',
              label: 'Latest',
              icon: 'bi-newspaper'
            }
          }
        })
      }
    });
  }

  selectCategory(category: string): void {
    this.activeCategory = category;
    this.categoryChanged.emit(category);;
  }

  get filteredNewsSections() {
    const category = this.activeCategory
      ?.trim()
      .toLowerCase();

    if (!category || category === 'all') {

      this.newsSections =  this.quickNav.storeData.get('articles') || []

      return this.newsSections;
    }

    if (category === 'latest') {
      return this.latestNews
    }

    return this.newsSections.filter(section =>
      section.key.toLowerCase() === category ||
      section.title.toLowerCase() === category
    );
  }

  get latestNews(){
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    return this.newsSections
      .map(section => ({
        ...section,

        articles: section.articles.filter((article:any) => {
          const articleTime = new Date(
            article.time
          ).getTime();

          if (Number.isNaN(articleTime)) {
            return false;
          }

          const timeDifference =
            now - articleTime;

          return (
            timeDifference >= 0 &&
            timeDifference <= oneHour
          );
        })
      }))
      .filter(section =>
        section.articles.length > 0
      );
  }

  openPromotion(){

    alert("sponsored earning not active at the moment")
  }

}
