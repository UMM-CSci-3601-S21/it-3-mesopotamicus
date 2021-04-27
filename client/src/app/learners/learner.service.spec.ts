import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Learner } from './learner';

import { LearnerService } from './learner.service';

describe('LearnerService', () => {

    let service: LearnerService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    const learnersTest: Learner[] = [
      {
        _id: 'test1',
        name: 'test',
        assignedContextPacks: ['chris_id','mary_id'],
      },
      {
        _id: 'test2',
        name: 'testtwo',
        assignedContextPacks: ['bob_id'],
      }
    ];

    beforeEach(() => {
      // Set up the mock handling of the HTTP requests
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      httpClient = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
      // Construct an instance of the service with the mock
      // HTTP client.
      service = new LearnerService(httpClient);
    });

    afterEach(() => {
      // After every test, assert that there are no more pending requests.
      httpTestingController.verify();
    });

    it('should be created', () => {
    expect(service).toBeTruthy();
    });

    it('getLearners() calls api/learners', () => {
      service.getLearners().subscribe(
        learners => expect(learners).toBe(learnersTest)
      );

      const req = httpTestingController.expectOne(service.learnerUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(learnersTest);
    });

    it('getLearnerById() calls api/learners/:id', () => {
      const targetLearner: Learner = learnersTest[0];
      const targetId: string = targetLearner._id;
      service.getLearnerById(targetId).subscribe(
        learner => expect(learner).toBe(targetLearner)
      );

      const expectedUrl: string = service.learnerUrl + '/' + targetId;
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(targetLearner);
    });

    it('should check strings with admin checker', () => {
      expect(service.checkIfAdmin('true')).toEqual(true);
      expect(service.checkIfAdmin('false')).toEqual(false);
    });
    it('should check strings with login checker', () => {
      expect(service.checkIfLoggedIn('true')).toEqual(true);
      expect(service.checkIfLoggedIn('false')).toEqual(false);
    });
});
