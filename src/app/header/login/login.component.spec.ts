import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule, MatFormFieldModule, MatButtonModule } from '@angular/material';

import { LoginComponent } from './login.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule, NoopAnimationsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
