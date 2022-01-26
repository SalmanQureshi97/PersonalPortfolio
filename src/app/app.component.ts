import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Router } from '@angular/router';

import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

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
  hidden = false;
  marginTop = '0px';
  tester;
  type;

  flip1: string = 'default';
  flip2: string = 'default';
  flip3: string = 'default';
  flip4: string = 'default';
  flip5: string = 'default';
  flip6: string = 'default';
  flip7: string = 'default';
  flip8: string = 'default';

  constructor(
    private client: HttpClient,
    private router: Router,
    @Inject(BreakpointObserver) private breakpointObserver: BreakpointObserver
  ) {
    this.client
      .get('https://api.github.com/users/salmanqureshi97')
      .subscribe((data) => {
        this.githubStats = data;
      });

    this.breakpointObserver
      .observe(['(max-width: 992px)', '(max-width: 574px)'])
      .subscribe((result: BreakpointState) => {
        let bp_lower = result.breakpoints['(max-width: 574px)'];
        let bp_upper = result.breakpoints['(max-width: 992px)'];
        console.log(bp_lower, bp_upper);
        if (!bp_lower && bp_upper) {
          this.hidden = true;
          this.marginTop = '90px';
        }
        if (!bp_upper && !bp_lower) {
          this.hidden = false;
          this.marginTop = '0px';
        }
        if (bp_lower && bp_upper) {
          this.hidden = false;
          this.marginTop = '0px';
        }
        // if (bp_572) {
        //   this.hidden = false;
        // } else {
        //   // show stuff
        //   this.hidden = true;
        // }
        // if (bp_992) {
        //   this.hidden = true;
        // } else {
        //   // show stuff
        //   this.hidden = false;
        // }
      });

    if (window.innerWidth > 572 && window.innerWidth < 972) {
      this.hidden = true;
    }
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
    //this.tester = screen.orientation.type;
    console.log('CArd CLicked Called', event.type);
    if (typeof screen.orientation === 'undefined') {
      if (this['flip' + id] === 'default') {
        this['flip' + id] = 'flipped';
      } else {
        this['flip' + id] = 'default';
      }
    } else {
      console.log('This should not be printing');
      if (event.type != 'mouseout' || event.type != 'mouseover') {
        if (this['flip' + id] === 'default') {
          this['flip' + id] = 'flipped';
        } else {
          this['flip' + id] = 'default';
        }
      }
    }
  }

  cardHovered(id: any, event: any) {
    //this.tester = screen.orientation.type;
    event.preventDefault();
    if (typeof screen.orientation !== 'undefined') {
      console.log('THis should not be printing');
      if (screen.orientation.type) {
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
      if (event.type === 'mouseout') {
        this['flip' + id] = 'default';
      }
    } else {
      console.log('Hovered Called', event.type, 'But I aint doing nothing');
    }
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  copyUrl() {
    console.log(this.router.url);
  }

  widthCheck() {}
}
