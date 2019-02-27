import { JwtModule } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropModalComponent } from './crop-modal.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { tokenGetter } from 'app/app.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('CropModalComponent', () => {
  let component: CropModalComponent;
  let fixture: ComponentFixture<CropModalComponent>;

  class MockHttpClient {
    get() {
      return of();
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CropModalComponent
      ],
      imports: [
        RouterTestingModule,
        ImageCropperModule,
        NgbModule.forRoot(),
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['gundmann.dk'],
          }
        }),
      ],
      providers: [
        NgbActiveModal,
        { provide: HttpClient, useClass: MockHttpClient },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
