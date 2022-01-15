import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Portfolio';
  githubStats: any;

  constructor(private client: HttpClient) {
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
}
