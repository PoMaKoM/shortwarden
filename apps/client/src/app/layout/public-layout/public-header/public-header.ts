import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { Theme } from '../../../core/services/theme';
import { HlmButton } from '@spartan-ng/helm/button';
import { toSignal } from '@angular/core/rxjs-interop';

import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMoon, lucideSun } from '@ng-icons/lucide';

@Component({
  selector: 'app-public-header',
  imports: [HlmButton, HlmIcon, NgIcon],
  providers: [provideIcons({ lucideMoon, lucideSun })],
  templateUrl: './public-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicHeader {
  private themeService = inject(Theme);
  private theme = toSignal(this.themeService.theme$);
  protected isDarkMode = computed(() => this.theme() === 'dark');

  protected toggleTheme() {
    this.themeService.toggleDarkMode();
  }

  protected openDashboard() {
    console.warn('Open Dashboard not implemented yet!');
  }
}
