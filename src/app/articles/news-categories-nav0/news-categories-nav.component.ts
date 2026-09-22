import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NewsListComponent,
} from '../news-list/news-list.component';

import { QuickNavService } from '../../reuseables/services/quick-nav.service'; // ✅ adjust path as needed

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

  @Output() categoryChanged =
    new EventEmitter<string>();
    categories: any[] = [
    {
      key: 'all',
      label: 'All',
      icon: 'bi-grid'
    },
    {
      key: 'latest',
      label: 'Latest',
      icon: 'bi-newspaper'
    },
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

    c = [
      {
      key: 'latest',
      title: 'Latest',
      color: '#ef2d2d',
      articles: [
        {
          id: 1,
          title: 'New policy aims to make cities more livable for everyone',
          image:
            'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=400&q=80',
          time: '1h ago',
          category: 'Latest',
          likes: 1250,
          comments: 348
        },
        {
          id: 2,
          title: 'Communities rally after severe storms hit coastal regions',
          image:
            'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=400&q=80',
          time: '4h ago',
          category: 'Latest',
          likes: 1250,
          comments: 348
        }
      ]
      },
      {
        key: 'sports',
        title: 'Sports',
        color: '#14a064',
        articles: [
          {
            id: 3,
            title: 'Underdogs stun champions in dramatic final',
            image:
              'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=400&q=80',
            time: '2h ago',
            category: 'Sports',
            likes: 1250,
            comments: 348
          },
          {
            id: 4,
            title: 'Record breaker eyes bigger goals after historic win',
            image:
              'https://images.unsplash.com/photo-1530137073520-4ea6e2f10a48?auto=format&fit=crop&w=400&q=80',
            time: '6h ago',
            category: 'Sports',
            likes: 1250,
            comments: 348
          }
        ]
      },
      {
        key: 'technology',
        title: 'Technology',
        color: '#1769ed',
        articles: [
          {
            id: 5,
            title: 'Next-generation smartphone brings smarter AI to daily life',
            image:
              'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
            time: '3h ago',
            category: 'Technology',
            likes: 1250,
            comments: 348
          },
          {
            id: 6,
            title: 'How artificial intelligence is changing the future of work',
            image:
              'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
            time: '7h ago',
            category: 'Technology',
            likes: 1250,
            comments: 348
          }
        ]
      },
      {
        key: 'business',
        title: 'Business',
        color: '#6d36e8',
        articles: [
          {
            id: 7,
            title: 'Global markets show renewed optimism this week',
            image:
              'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
            time: '2h ago',
            category: 'Business',
            likes: 1250,
            comments: 348
          },
          {
            id: 8,
            title: 'Supply chains stabilize as international trade improves',
            image:
              'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80',
            time: '5h ago',
            category: 'Business',
            likes: 1250,
            comments: 348
          }
        ]
      }
    ];

    constructor(
      private quickNav: QuickNavService

    ){}

    ngOnInit(){

      if (!this.quickNav.storeData.get('articles')) {
        this.quickNav.reqServerData.get("articles/")
        .subscribe((res:any)=>{

          console.log({res});

          this.newsSections = this.quickNav.storeData.get('articles') || []

        })
      }
    }



  selectCategory(category: string): void {
    this.activeCategory = category;
    this.categoryChanged.emit(category);
  }

  viewMoreNews(category: string): void {
    console.log('View category:', category);
  }

  openArticle(article: any): void {
    console.log('Open article:', article);
  }


}
