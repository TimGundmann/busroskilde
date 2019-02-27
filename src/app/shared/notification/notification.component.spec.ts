import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from './../../services/notification.service';
import { inject, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationComponent],
      imports: [
        RouterTestingModule,
        NgbModule.forRoot()
      ],
      providers: [NotificationService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be notified', inject([NotificationService], (notifications: NotificationService) => {
    // given
    notifications.info('test');

    // when then
    expect(component.alerts.length).toBe(1);
  }));

  it('should be removed when closed', inject([NotificationService], (notifications: NotificationService) => {
    // given
    notifications.info('test');

    // when
    component.closeAlert(component.alerts[0]);

    // then
    expect(component.alerts.length).toBe(0);
  }));

});
