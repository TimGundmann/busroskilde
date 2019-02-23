import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { News } from 'app/domain/news';
import { NewsService } from 'app/services/news.service';
import { NotificationService } from 'app/services';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '*',
        opacity: 1,
        display: 'flex'
      })),
      state('closed', style({
        height: '0',
        opacity: 0,
        display: 'none',
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],

})
export class AddNewsComponent {

  private _editNews: News;

  @Output() changeVisibility = new EventEmitter();
  @Input() visisble = false;
  @Input() set editNews(news: News) {
    this._editNews = news;
    if (this._editNews) {
      this.headline.setValue(this._editNews.headline);
      this.editor.setValue(this._editNews.content);
      this.action = 'Rediger';
    } else {
      this.addNewsForm.reset();
      this.action = 'Tilføj';
    }
  };

  action: string;

  editorData: string;

  addNewsForm = new FormGroup({
    headline: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    editor: new FormControl('')
  });

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no'
  };

  constructor(private newsService: NewsService, private notificationService: NotificationService) { }

  get headline() {
    return <FormControl>this.addNewsForm.get('headline');
  }

  get editor() {
    return <FormControl>this.addNewsForm.get('editor');
  }

  submit() {
    if (this._editNews) {
      this._editNews.headline = this.headline.value;
      this._editNews.content = this.editor.value;
    } else {
      this._editNews = { id: null, headline: this.headline.value, content: this.editor.value, timestamp: new Date() };
    }
    this.newsService.set(this._editNews)
      .subscribe(result => {
        if (result.okResult) {
          this.toggleAdd();
        } else {
          this.notificationService.error('Fejl ved oprettelse af nyheden, prøv igen senere!');
        }
      });
  }

  hasError(control): boolean {
    return control.invalid && (control.dirty || control.touched) && control.errors.required
  }

  toggleAdd() {
    this.visisble = !this.visisble;
    this.changeVisibility.emit('' + this.visisble);
  }

  change(event) {
    console.log(event);
  }

}
