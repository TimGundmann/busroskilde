import { HttpClient } from '@angular/common/http';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationComponent } from './configuration.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('ConfigurationComponent', () => {
  let component: ConfigurationComponent;
  let fixture: ComponentFixture<ConfigurationComponent>;

  class MockHttpClient {
    get() {
      return of();
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfigurationComponent
      ],
      imports: [
        FormsModule,
        JwBootstrapSwitchNg2Module,
        RouterTestingModule
      ],
      providers: [
        { provide: HttpClient, useClass: MockHttpClient },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
