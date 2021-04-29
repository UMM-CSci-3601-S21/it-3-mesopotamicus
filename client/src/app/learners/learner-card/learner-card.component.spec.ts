import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { ContextPackService } from 'src/app/contextpacks/contextpack.service';
import { MockContextPackService } from 'src/testing/contextpack.service.mock';
import { MockLearnerService } from 'src/testing/learner.service.mock';
import { LearnerListComponent } from '../learner-list/learner-list.component';
import { LearnerService } from '../learner.service';
import { LearnerCardComponent } from './learner-card.component';


describe('LearnerCardComponent', () => {
  let component: LearnerCardComponent;
  let fixture: ComponentFixture<LearnerCardComponent>;


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [LearnerListComponent, LearnerCardComponent],
      providers: [
        {provide: LearnerService, useValue: new MockLearnerService()},
        { provide: ContextPackService, useValue: new MockContextPackService() }
      ]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerCardComponent);
    component = fixture.componentInstance;
    component.learner = {
      _id: 'learner',
      name: 'string',
      assignedContextPacks: ['chris_id','chris_id']
    };
    fixture.detectChanges();
  });
  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
