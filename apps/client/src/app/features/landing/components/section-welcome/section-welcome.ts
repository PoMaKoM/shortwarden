import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmButton } from '@spartan-ng/helm/button';
import {
  HlmInputGroup,
  HlmInputGroupAddon,
  HlmInputGroupButton,
  HlmInputGroupInput,
  HlmInputGroupText,
} from '@spartan-ng/helm/input-group';
import { HlmSpinner } from '@spartan-ng/helm/spinner';
import { HlmCard } from '@spartan-ng/helm/card';
import { hlmH1, hlmLead } from '@spartan-ng/helm/typography';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LinkService } from '../../../../core/services/link.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-welcome',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HlmBadge,
    HlmButton,
    HlmInputGroup,
    HlmInputGroupInput,
    HlmInputGroupAddon,
    HlmInputGroupText,
    HlmSpinner,
    HlmCard,
    HlmInputGroupButton,
  ],
  templateUrl: './section-welcome.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionWelcome {
  protected readonly hlmLead = hlmLead;
  protected readonly hlmH1 = hlmH1;
  protected badge = 'Announcing something new v2.0';

  private readonly linkService = inject(LinkService);

  protected readonly linkControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)
  ]);

  protected readonly isLoading = signal(false);

  protected shortenLink() {
    if (this.linkControl.invalid) {
      return;
    }

    const url = this.linkControl.value;
    if (!url) return;

    this.isLoading.set(true);
    this.linkService.createTemporaryLink(url).subscribe({
      next: (res) => {
        console.log('Link created', res);
        this.isLoading.set(false);
        // TODO: Handle success (e.g. show the shortened link)
      },
      error: (err) => {
        console.error('Error creating link', err);
        this.isLoading.set(false);
        // TODO: Handle error
      }
    });
  }
}
