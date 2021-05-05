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
      assignedContextPacks: ['chris_id','mary_id'],
    },
    {
      _id: 'testLearner2',
      name: 'two',
      assignedContextPacks: ['bob_id'],
    }
  ];

  constructor() {
    super(null);
  }

  getLearners(): Observable<Learner[]> {
    return of(MockLearnerService.testLearners);
  }

  getLearnerById(id: string): Observable<Learner>{
    return of(MockLearnerService.testLearners[0]);
  }

  filterLearners(learners: Learner[], filters: { name?: string }): Learner[] {

    let filteredLearners = learners;

    // Filter by topic
    if (filters.name) {
      filters.name = filters.name.toLowerCase();

      filteredLearners = filteredLearners.filter(learner => learner.name.toLowerCase().indexOf(filters.name) !== -1);
    }

    return filteredLearners;
  }

}
