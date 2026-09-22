import { Component } from '@angular/core';
import { QuickNavService } from '../services/quick-nav.service'; // ✅ adjust path as needed
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-language',
  imports: [
    CommonModule
  ],
  templateUrl: './language.component.html',
  styleUrl: './language.component.css'
})
export class LanguageComponent {

  constructor(
    public quickNav: QuickNavService
  ){}

  selectedLanguage: any = null;
  langName:any
  languageDropdownOpen = false;

  ngOnInit(){

    const lang = localStorage.getItem("lang") || "English"
      this.selectLanguage(lang)

  }

  toggleLanguageDropdown(event: Event) {
    event.stopPropagation();

    this.languageDropdownOpen =
      !this.languageDropdownOpen;
  }

  selectLanguage(lang: any) {

    this.langName = lang

    localStorage.setItem("lang", lang)

    this.selectedLanguage = this.quickNav.availableLang[lang];

    this.languageDropdownOpen = false;

    // Keep your existing language logic
    this.quickNav.changeLanguage({
      target: {
        value: this.selectedLanguage[0]
      }
    } as any);
  }


}
