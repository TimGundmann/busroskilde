import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordComponent } from './new-password.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('NewPasswordComponent', () => {
  let component: NewPasswordComponent;
  let fixture: ComponentFixture<NewPasswordComponent>;

  class MockHttpClient {
    get() {
      return of();
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPasswordComponent ],
      imports: [ ReactiveFormsModule, FormsModule, RouterTestingModule ],
      providers: [
        { provide: HttpClient, useClass: MockHttpClient },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
