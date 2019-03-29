import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { tokenGetter } from 'app/app.module';
import { UserService, NotificationService } from 'app/services';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let debugElement: DebugElement;

  class MockHttpClient {
    get() {
      return of();
    }
    post() {
      return of();
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SigninComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['gundmann.dk'],
          }
        }),
      ],
      providers: [
        UserService,
        NotificationService,
        NgxSpinnerService,
        NgbModal,
        { provide: HttpClient, useClass: MockHttpClient },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not bee possible to sign in if fileds is empty', () => {
    // given
    const button = findElement('button');

    // when then
    expect(button.disabled).toBeTruthy();
  });

  it('should bee possible to send message if fileds is not empty', () => {
    // given
    setValueOn('number', 'email@email.dk');
    setValueOn('password', 'password');

    // when
    fixture.detectChanges();

    // then
    expect(component.signInForm.valid).toBeTruthy();
  });

  it('should send sign in', inject([HttpClient], (httpClient: HttpClient) => {
    // given
    spyOn(httpClient, 'post');

    sendInput('input[type="text"]', 'test@test.dk');
    sendInput('input[type="password"]', 'password');

    debugElement.query(By.css('[selenium-id="signin-button"]')).nativeElement.click();

    // when then
    expect(httpClient.post).toHaveBeenCalled();
  }));

  function setValueOn(elementName: string, value: string) {
    component.signInForm.get(elementName).setValue(value);
  }

  function findElement(serachFor: string) {
    return debugElement.nativeElement.querySelector(serachFor);
  }

  function sendInput(selector: string, text: string) {
    const inputElement = debugElement.query(By.css(selector)).nativeElement;
    inputElement.value = text;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    return fixture.whenStable();
  }

});
