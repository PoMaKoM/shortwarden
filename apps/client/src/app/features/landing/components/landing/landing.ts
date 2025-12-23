import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionWelcome } from '../section-welcome/section-welcome';

@Component({
  selector: 'app-landing',
  imports: [SectionWelcome],
  templateUrl: './landing.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Landing {}
