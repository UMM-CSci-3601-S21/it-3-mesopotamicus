import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ContextPackService } from 'src/app/contextpacks/contextpack.service';
import { MockContextPackService } from 'src/testing/contextpack.service.mock';
import { MockLearnerService } from 'src/testing/learner.service.mock';
import { LearnerInfoComponent } from '../learner-info/learner-info.component';
import { LearnerService } from '../learner.service';

import { AddLearnerComponent } from './add-learner.component';

describe('AddLearnerComponent', () => {
  let addLearnerForm: FormGroup;
  let component: AddLearnerComponent;
  let fixture: ComponentFixture<AddLearnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatSnackBarModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      declarations: [ LearnerInfoComponent ],
      providers: [
        { provide: LearnerService, useValue: new MockLearnerService() },
        { provide: ContextPackService, useValue: new MockContextPackService() },
        { provide: ActivatedRoute, useValue: ActivatedRoute }
      ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLearnerComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    component.isAdmin = true;
    addLearnerForm = component.learnerForm;
    expect(addLearnerForm).toBeDefined();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(addLearnerForm).toBeTruthy();
  });
  it('should check for admin privileges', () => {
    expect(component.isAdmin).toBeTruthy();
  });
});
