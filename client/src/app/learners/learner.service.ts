import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Learner } from './learner';

@Injectable({
  providedIn: 'root'
})
export class LearnerService {
  readonly learnerUrl: string = environment.apiUrl + 'learners';
  readonly learnerUrl2: string = environment.apiUrl + 'learner';
  readonly idTokenUrl: string = environment.apiUrl + 'users';

  constructor(private httpClient: HttpClient) { }

  checkIfLoggedIn(log: string){
    let isSignedIn: boolean;
    if (log === 'true'){
      isSignedIn = true;
    }
    else{
      isSignedIn = false;
    }
    return isSignedIn;
  }

  checkIfAdmin(log: string){
    let isAdmin: boolean;
    if (log === 'true'){
      isAdmin = true;
    }
    else{
      isAdmin = false;
    }
    return isAdmin;
  }


  getLearnerById(id: string): Observable<Learner> {
    return this.httpClient.get<Learner>(this.learnerUrl + '/' + id);
  }

  getLearners(): Observable<Learner[]> {
    const httpParams: HttpParams = new HttpParams();
    return this.httpClient.get<Learner[]>(this.learnerUrl, {
      params: httpParams,
    });
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

  addContextPackIdToLearner(idpack: string, id: string){
    return this.httpClient.post<{id: string}>(this.learnerUrl2 + '/' + id, '"'+idpack+'"').pipe(map(res => res.id));
  }

  addLearner(newLearner: Learner){
    return this.httpClient.post<{id: string}>(this.learnerUrl + '/' + 'add', newLearner).pipe(map(res => res.id));
  }

}
