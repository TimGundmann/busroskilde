import { AuthService } from './../../services/auth.service';
import { PlanService } from './../../services/plan.service';
import { NotificationService } from 'app/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { SvgComponent } from 'app/shared/svg/svg.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { AddComponent } from './add/add.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanComponent } from './plan.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { tokenGetter } from 'app/app.module';
import { of } from 'rxjs';
import { PaginatorComponent } from './paginator/paginator.component';
import { SimplePdfViewerModule } from 'simple-pdf-viewer';

describe('PlanComponent', () => {
  let component: PlanComponent;
  let fixture: ComponentFixture<PlanComponent>;

  class MockHttpClient {
    get() {
      return of();
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PlanComponent,
        AddComponent,
        SvgComponent,
        PaginatorComponent
      ],
      providers: [
        JwtHelperService,
        AuthService,
        PlanService,
        NotificationService,
        NgxSpinnerService,
        { provide: HttpClient, useClass: MockHttpClient },
      ],
      imports: [
        SimplePdfViewerModule,
        ImageCropperModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        FileUploadModule,
        RouterTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['gundmann.dk'],
          }
        }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanComponent);
    component = fixture.componentInstance;
    component.category = { name: 'test', type: 'test', subCategories: [], alterRoles: []  }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
