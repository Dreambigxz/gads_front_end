import { CommonModule } from '@angular/common';
import {
  Component,
  inject ,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { filter, startWith } from 'rxjs/operators';
import {  Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { QuickNavService } from '../../reuseables/services/quick-nav.service'; // ✅ adjust path as needed
import { EngagementService } from
  '../services/engagement.service';

  // import { MobileMenuComponent } from "../../components/mobile-menu/mobile-menu.component";
  import { HeaderComponent } from "../../components/header/header.component";


@Component({
  selector: 'app-details',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  @ViewChild('articleBody')
  articleBody?: ElementRef<HTMLElement>;

  isSubmittingComment = false;

  article: any
  // {
  //   id: 1,
  //   title:
  //     'World leaders unite for a cleaner, greener future',
  //   excerpt:
  //     'Global summit sets ambitious climate targets designed to accelerate meaningful environmental change.',
  //   content: `
  //     <p>
  //       World leaders gathered this week to discuss a new set
  //       of environmental policies aimed at creating a cleaner
  //       and more sustainable future.
  //     </p>
  //
  //     <p>
  //       The summit focused on renewable energy, sustainable
  //       cities, climate financing and reducing global carbon
  //       emissions over the next decade.
  //     </p>
  //
  //     <h2>A shared global responsibility</h2>
  //
  //     <p>
  //       Representatives agreed that protecting the environment
  //       requires cooperation between governments, businesses
  //       and local communities. Several countries announced new
  //       investments in clean energy and sustainable transport.
  //     </p>
  //
  //     <blockquote>
  //       Climate action is no longer a future responsibility.
  //       It is something that must begin today.
  //     </blockquote>
  //
  //     <p>
  //       The agreement also encourages governments to support
  //       communities that are already experiencing the effects
  //       of extreme weather and changing environmental conditions.
  //     </p>
  //
  //     <h2>What happens next?</h2>
  //
  //     <p>
  //       Participating countries will submit progress reports
  //       and updated climate plans. Independent organizations
  //       will monitor the targets and publish annual reports.
  //     </p>
  //   `,
  //   image:
  //     'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=90',
  //   category: 'World',
  //   category_color: '#ef2d2d',
  //   author: {
  //     id: 4,
  //     name: 'Sarah Williams',
  //     avatar: null
  //   },
  //   published_at: '2026-09-17T19:18:39.933829Z',
  //   reading_time: 5,
  //   views: 12450,
  //   likes: 1250,
  //   comments_count: 3,
  //   liked_by_user: false,
  //   user_has_commented: false,
  //   comments: [
  //     {
  //       id: 1,
  //       user: {
  //         id: 12,
  //         name: 'David Johnson',
  //         avatar: null
  //       },
  //       content:
  //         'This is an important step. Hopefully every country follows through with the agreement.',
  //       created_at: '2026-09-17T19:40:00Z',
  //       likes: 18,
  //       liked_by_user: false
  //     },
  //     {
  //       id: 2,
  //       user: {
  //         id: 25,
  //         name: 'Maria Collins',
  //         avatar: null
  //       },
  //       content:
  //         'Investment in renewable energy will create jobs and protect the environment at the same time.',
  //       created_at: '2026-09-17T20:15:00Z',
  //       likes: 9,
  //       liked_by_user: true
  //     },
  //     {
  //       id: 3,
  //       user: {
  //         id: 31,
  //         name: 'Kelvin James',
  //         avatar: null
  //       },
  //       content:
  //         'I would like to see clear progress reports so the promises can be properly monitored.',
  //       created_at: '2026-09-17T21:04:00Z',
  //       likes: 4,
  //       liked_by_user: false
  //     }
  //   ]
  // };

  constructor(
    public quickNav: QuickNavService,
    private router: Router,
    private route: ActivatedRoute,
    private engagementService: EngagementService,

  ) {}

  fb = inject(FormBuilder)

  commentForm = this.fb.group({
    content: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(1000)
      ]
    ]
  });

  articleId: any

  ngOnInit()  {

    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(null)
    )
    .subscribe(() => {

      const id = this.route.snapshot.paramMap.get('id');

        const url = new URL(window.location.href);
        if (!url.pathname.includes("article")) return;

        if (this.articleId===Number(id)) return;

        this.articleId = Number(id);

        this.quickNav.reqServerData.get(`articles/${this.articleId}/`)
        .subscribe((res:any)=>{
          this.article = res.article;
            setTimeout(() => {

              const element =
                this.articleBody?.nativeElement;
              if (!element) return;

              this.engagementService.startArticle({
                articleId: this.article.id,
                slug: this.article.slug,
                articleElement: element,
              });

            }, 500);
        })
    });

  }

  get commentContent(): string {
    return this.commentForm.controls.content.value ?? '';
  }

  toggleArticleLike(): void {
    this.article.liked_by_user =
      !this.article.liked_by_user;

    this.article.likes +=
      this.article.liked_by_user ? 1 : -1;

      this.quickNav.reqServerData.post(`articles/${this.articleId}/like/`,{ })
      .subscribe((res:any)=>{
        if (res.article){
          this.article=res.article;
        }

        this.engagementService.recordReaction()

        // if (res.liked) {
        //
        // }

        this.isSubmittingComment = false

      })

  }

  toggleCommentLike(comment: any): void {
    comment.liked_by_user =
      !comment.liked_by_user;

    comment.likes +=
      comment.liked_by_user ? 1 : -1;
  }

  submitComment(): void {
    if (
      this.commentForm.invalid ||
      this.article.user_has_commented ||
      this.isSubmittingComment
    ) {
      this.commentForm.markAllAsTouched();
      return;
    }

    this.isSubmittingComment = true;

    this.quickNav.reqServerData.post(`articles/${this.articleId}/comment/`,{ content: this.commentContent.trim() })
    .subscribe((res:any)=>{
      if (res.article){
        this.article=res.article;
        this.engagementService.recordComment()
      }

      this.isSubmittingComment = false

    })
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .slice(0, 2)
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  }

  formatCount(value: number): string {
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)}M`;
    }

    if (value >= 1_000) {
      return `${(value / 1_000).toFixed(1)}K`;
    }

    return value.toString();
  }

}
