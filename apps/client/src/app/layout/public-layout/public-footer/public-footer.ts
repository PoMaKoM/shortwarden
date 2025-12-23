import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-public-footer',
  imports: [HlmButton],
  templateUrl: './public-footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicFooter {
  authorLink = '';
  githubLink = '';
}
