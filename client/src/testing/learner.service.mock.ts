import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Learner } from 'src/app/learners/learner';
import { LearnerService } from 'src/app/learners/learner.service';

@Injectable()
export class MockLearnerService extends LearnerService {

  static testLearners: Learner[] = [
    {
      _id: 'testLearner1',
      name: 'one',
      assignedContextPacks: ['oneId','twoId','threeId'],
    },
    {
      _id: 'testLearner2',
      name: 'two',
      assignedContextPacks: ['oneId','twoId','threeId'],
    }
  ];

  constructor() {
    super(null);
  }

  getLearners(): Observable<Learner[]> {
    return of(MockLearnerService.testLearners);
  }

}
