import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { MockLearnerService } from '../../../testing/learner.service.mock';
import { LearnerInfoComponent } from './learner-info.component';
import { Learner } from '../learner';
import { LearnerService } from '../learner.service';

describe('LearnerInfoComponent', () => {
  let component: LearnerInfoComponent;
  let fixture: ComponentFixture<LearnerInfoComponent>;
  let learnerService: LearnerService
  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [LearnerInfoComponent],
      providers: [
        { provide: LearnerService, useValue: new MockLearnerService() },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
      .compileComponents().catch(error => {
        expect(error).toBeNull();
      });
      learnerService = TestBed.inject(LearnerService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    const testLearner: Learner =
    {
      _id: 'test_id',
      name: 'test',
      assignedContextPacks: ['contextpacks']
    };

    component.learner = testLearner;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
