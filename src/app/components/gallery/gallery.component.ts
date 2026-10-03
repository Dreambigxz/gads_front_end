import { Component, HostListener, signal } from '@angular/core';

interface GalleryImage {
  id: number;
  title: string;
  category: string;
  src: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  categories = ['All', 'Events', 'Community', 'Updates'];

  activeCategory = signal('All');
  selectedImage = signal<GalleryImage | null>(null);

  // Replace these paths with your own images.
  images: GalleryImage[] = [
    {
      id: 1,
      title: 'Investment Plan',
      category: 'Community',
      src: 'assets/gallery/plan.jpeg',
    },
    {
      id: 2,
      title: 'Deposit Bonuses',
      category: 'Events',
      src: 'assets/gallery/wallet.jpeg',
    },
    {
      id: 3,
      title: 'Referral Bonuses',
      category: 'Updates',
      src: 'assets/gallery/referral.jpeg',
    },

    {
      id: 4,
      title: 'Salary Qualifications',
      category: 'Updates',
      src: 'assets/gallery/salary.jpeg',
    },

  ];

  filteredImages(): GalleryImage[] {
    const category = this.activeCategory();

    return category === 'All'
      ? this.images
      : this.images.filter(image => image.category === category);
  }

  @HostListener('document:keydown.escape')
  closePreview(): void {
    this.selectedImage.set(null);
  }
}
