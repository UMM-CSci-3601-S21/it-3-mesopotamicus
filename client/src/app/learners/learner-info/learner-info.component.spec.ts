import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ContextPackService } from 'src/app/contextpacks/contextpack.service';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { MockContextPackService } from 'src/testing/contextpack.service.mock';
import { MockLearnerService } from 'src/testing/learner.service.mock';
import { LearnerService } from '../learner.service';
import { LearnerInfoComponent } from './learner-info.component';


describe('LearnerInfoComponent', () => {
  let component: LearnerInfoComponent;
  let fixture: ComponentFixture<LearnerInfoComponent>;
  let learnerService: LearnerService;
  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      declarations: [ LearnerInfoComponent ],
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
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(LearnerInfoComponent);
    component = fixture.componentInstance;
    component.learner = {
      _id: 'testLearner1',
      name: 'string',
      assignedContextPacks: ['chris_id','mary_id']
    };
    activatedRoute.setParamMap({ id: 'testLearner1' });
    fixture.detectChanges();
  });

   it('should create', () => {
     expect(component).toBeTruthy();
   });

   it('should navigate to a specific Learner\'s info page', () => {
    activatedRoute.setParamMap({ id: 'testLearner1' });
    expect(component.id).toEqual('testLearner1');
  });

  it('should not allow duplicate packs', () => {
    const unchangedPacks = component.learner.assignedContextPacks;
    component.ctxID = 'chris_id';
    component.submitContextPackID();
    component.submitContextPackID();
    component.submitContextPackID();
    expect(component.learner.assignedContextPacks).toEqual(unchangedPacks);
  });

  it('should get assigned context packs', () => {
    component.getAssignedContextPacks();
    component.learner = {
      _id: 'learner',
      name: 'string',
      assignedContextPacks: ['chris_id']
    };
    expect(component.assignedPacks.length).toBeGreaterThan(0);
    expect(component.assignedPacks[0]._id).toEqual('chris_id');
  });
});
