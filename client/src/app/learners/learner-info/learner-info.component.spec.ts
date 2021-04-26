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
import { MockContextPackService } from '../../../testing/contextpack.service.mock';
import { LearnerInfoComponent } from './learner-info.component';
import { Learner } from '../learner';
import { LearnerService } from '../learner.service';
import { ContextPackCardComponent } from '../../contextpacks/contextpack-card.component';
import { ContextPack, Word, Wordlist} from '../../contextpacks/contextpack';
import { ContextPackService } from '../../contextpacks/contextpack.service';



describe('LearnerInfoComponent', () => {
  let component: LearnerInfoComponent;
  let fixture: ComponentFixture<LearnerInfoComponent>;
  let learnerService: LearnerService;
  let contextPackService = ContextPackService;
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
      declarations: [LearnerInfoComponent, ContextPackCardComponent],
      providers: [
        { provide: LearnerService, useValue: new MockLearnerService() },
        { provide: ContextPackService, useValue: new MockContextPackService() },
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
      assignedContextPacks: ['chris_id', 'mary_id']
    };

    component.learner = testLearner;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get and filter packs', () => {
    expect(component.contextPacks.length).toBe(3);
    expect(component.assignedPacks.length).toBe(2);
  });
});
