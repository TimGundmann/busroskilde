import { JwtModule } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './../../services/notification.service';
import { UserService } from 'app/services';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { tokenGetter } from 'app/app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let debugElement: DebugElement;

  class MockHttpClient {
    get() {
      return of();
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageComponent],
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
        { provide: HttpClient, useClass: MockHttpClient },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not bee possible to send message if fileds is empty', () => {
    // given
    const button = findElement('button');

    // when then
    expect(button.disabled).toBeTruthy();
  });

  it('should bee possible to send message if fileds is not empty', () => {
    // given
    component.mailForm.get('name').setValue('Test');
    component.mailForm.get('from').setValue('test@test.dk');
    component.mailForm.get('content').setValue('Test text');

    // when
    fixture.detectChanges();

    // then
    expect(component.mailForm.valid).toBeTruthy();
  });

  function findElement(serachFor: string) {
    return debugElement.nativeElement.querySelector(serachFor);
  }

});
