import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('cardFlip', [
      state(
        'default',
        style({
          transform: 'none',
        })
      ),
      state(
        'flipped',
        style({
          transform: 'rotateY(180deg)',
        })
      ),
      transition('default => flipped', [animate('400ms')]),
      transition('flipped => default', [animate('200ms')]),
    ]),
  ],
})
export class AppComponent {
  title = 'Portfolio';
  githubStats: any;

  flip1: string = 'default';
  flip2: string = 'default';
  flip3: string = 'default';
  flip4: string = 'default';
  flip5: string = 'default';
  flip6: string = 'default';
  flip7: string = 'default';
  flip8: string = 'default';

  constructor(private client: HttpClient, private router: Router) {
    this.client
      .get('https://api.github.com/users/salmanqureshi97')
      .subscribe((data) => {
        this.githubStats = data;
      });
  }

  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
  }

  cardClicked(id: any, event: any) {
    event.preventDefault();
    if (screen.orientation.type === 'landscape-primary') {
      if (event.type !== 'click') {
        if (this['flip' + id] === 'default') {
          this['flip' + id] = 'flipped';
        } else {
          this['flip' + id] = 'default';
        }
      }
    } else {
      if (event.type === 'click') {
        if (this['flip' + id] === 'default') {
          this['flip' + id] = 'flipped';
        } else {
          this['flip' + id] = 'default';
        }
      }
    }
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  copyUrl() {
    console.log(this.router.url);
  }
}
