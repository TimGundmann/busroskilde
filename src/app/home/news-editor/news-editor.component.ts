import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { News } from 'app/domain/news';
import { NewsService } from 'app/services/news.service';
import { NotificationService } from 'app/services';

@Component({
  selector: 'app-news-editor',
  templateUrl: './news-editor.component.html',
  styleUrls: ['./news-editor.component.scss']
})
export class NewsEditorComponent implements OnInit {

  news: News[];
  editNews: News;
  addVisible = false;

  constructor(
    private newsService: NewsService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.newsService.get()
      .subscribe(result => this.news = result.returnValue);
  }

  canAlter(): boolean {
    return this.authService.isAdmin();
  }

  toggleAdd() {
    if (!this.addVisible) {
      this.editNews = undefined;
    }
    this.addVisible = !this.addVisible;
  }

  addChangeVisisblity() {
    this.addVisible = !this.addVisible;
    if (!this.addVisible) {
      this.ngOnInit();
    }
  }

  delete(news: News) {
    this.spinner.show();
    this.newsService.delete(news)
      .subscribe(result => {
        if (result.okResult) {
          this.notificationService.info('Nyheden er slettet!');
          this.ngOnInit();
        } else {
          this.notificationService.error('Fejl ved sletning af nyheden!');
        }
        this.spinner.hide();
      });
  }

  edit(news: News) {
    this.toggleAdd();
    this.editNews = news;
  }

}
