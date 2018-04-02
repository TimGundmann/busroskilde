import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Directive } from '@angular/core';

@Directive( {
  selector: 'bus-header'
})
class MockHeaderDirective {}

@Directive( {
  selector: 'bus-main'
})
class MockMainDirective {}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockHeaderDirective,
        MockMainDirective
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
