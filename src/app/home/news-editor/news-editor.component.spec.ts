import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AddNewsComponent } from './add-news/add-news.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsEditorComponent } from './news-editor.component';
import { SafeHtmlPipe } from '../safe-html.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { tokenGetter } from 'app/app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';

describe('NewsEditorComponent', () => {
  let component: NewsEditorComponent;
  let fixture: ComponentFixture<NewsEditorComponent>;

  class MockHttpClient {
    get() {
      return of();
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewsEditorComponent,
        AddNewsComponent,
        SafeHtmlPipe
      ],
      imports: [
        RouterTestingModule,
        AngularEditorModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['gundmann.dk'],
          }
        }),
      ],
      providers: [
        JwtHelperService,
        { provide: HttpClient, useClass: MockHttpClient },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
