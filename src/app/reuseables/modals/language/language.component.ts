import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  EventEmitter,
  Output,
  Input
 } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-language',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './language.component.html',
  styleUrl: './language.component.scss'
})
export class LanguageComponent implements OnDestroy {

  @Input() quickNav : any  // false;


  selectedLanguage: any = null;

  languageSearch = '';
  langName:any
  languageDropdownOpen = false;

  get filteredLanguages(): string[] {
    const search = this.languageSearch
      .trim()
      .toLowerCase();

    if (!search) {
      return this.quickNav.langKeys;
    }

    return this.quickNav.langKeys.filter(
      (lang: string) => {
        const details =
          this.quickNav.availableLang[lang];

        const displayName =
          details?.[0]?.toLowerCase() || '';

        return (
          lang.toLowerCase().includes(search) ||
          displayName.includes(search)
        );
      }
    );
  }

  selectLanguage(lang: any) {

    this.langName = lang

    localStorage.setItem("lang", lang)
    this.quickNav.selectedLang.set(lang)

    this.selectedLanguage = this.quickNav.availableLang[lang];

    this.languageDropdownOpen = false;

    // Keep your existing language logic
    this.quickNav.changeLanguage({
      target: {
        value: this.selectedLanguage[0]
      }
    } as any);
  }

  openLanguageModal(): void {
    this.quickNav.languageModalOpen = true;
    this.languageSearch = '';
    document.body.style.overflow = 'hidden';
  }

  closeLanguageModal(): void {
    this.quickNav.languageModalOpen = false;
    this.languageSearch = '';
    document.body.style.overflow = '';
  }

  selectModalLanguage(lang: string): void {
    this.selectLanguage(lang);
    this.closeLanguageModal();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

}
