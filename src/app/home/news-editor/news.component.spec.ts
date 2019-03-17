import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AddNewsComponent } from './add-news/add-news.component';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { NewsComponent } from './news.component';
import { SafeHtmlPipe } from '../safe-html.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { tokenGetter } from 'app/app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { SvgComponent } from 'app/shared/svg/svg.component';
import { DebugElement } from '@angular/core';

describe('NewsEditorComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let debugElement: DebugElement;

  class MockHttpClient {
    get() {
      return of();
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewsComponent,
        AddNewsComponent,
        SafeHtmlPipe,
        SvgComponent,
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
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a list of news', inject([HttpClient], (httpClient: HttpClient) => {
    // given
    spyOn(httpClient, 'get').and.returnValue(of([
      {
        id: 'testid',
        headline: 'test headline',
        content: 'test content',
        timestamp: new Date()
      }
    ]));

    // when
    component.ngOnInit();

    // then
    expect(component.news.length).toBe(1);
  }));

});
