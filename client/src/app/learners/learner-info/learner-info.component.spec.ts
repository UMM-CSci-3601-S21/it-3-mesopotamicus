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
import { Learner } from '../learner';
import { LearnerService } from '../learner.service';
import { ContextPackCardComponent } from '../../contextpacks/contextpack-card.component';
import { ContextPack, Word, Wordlist} from '../../contextpacks/contextpack';
import { ContextPackService } from '../../contextpacks/contextpack.service';



describe('LearnerInfoComponent', () => {
  let component: LearnerInfoComponent;
  let fixture: ComponentFixture<LearnerInfoComponent>;
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
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(LearnerInfoComponent);
    component = fixture.componentInstance;
    component.learner = {
      _id: 'learner',
      name: 'string',
      assignedContextPacks: ['chris_id','chris_id'],
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

  it('should get and filter packs', () => {
    expect(component.contextPacks.length).toBe(3);
    expect(component.assignedPacks.length).toBe(2);
  });
});
