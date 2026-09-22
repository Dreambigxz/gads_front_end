import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageComponent } from '../../reuseables/language/language.component';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    LanguageComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', "../auth.scss"]
})
export class HeaderComponent {

  @Input() quickNav!: any;

}
