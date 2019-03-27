import { NotificationService } from 'app/services';
import { UserService } from './../../services/user.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ActivateComponent } from './activate.component';
import { of, Observable } from 'rxjs';
import { RequestResult } from 'app/domain/error-details';

xdescribe('ActivateComponent', () => {

  let component: ActivateComponent;
  let fixture: ComponentFixture<ActivateComponent>;

  class UserServiceMock {
    public activate(token: string): Observable<RequestResult<any>> {
      return of(new RequestResult());
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivateComponent ],
      providers: [
        UserService,
        NotificationService,
        { provide: UserService, useClass: UserServiceMock } ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
