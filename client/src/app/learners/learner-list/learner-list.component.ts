import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Learner } from '../learner';
import { LearnerService } from '../learner.service';

@Component({
  selector: 'app-learner-list',
  templateUrl: './learner-list.component.html',
  styleUrls: ['./learner-list.component.scss']
})
export class LearnerListComponent implements OnInit, OnDestroy {

  public serverFilteredLearners: Learner[];
  public filteredLearners: Learner[];
  public contextpackName: string;
  public learnerName: string;
  public learnerForm: FormGroup;

  getLearnersSub: Subscription;

  isSignedIn: boolean;

  constructor(private learnerService: LearnerService, private fb: FormBuilder,
    private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.learnerForm = this.fb.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    });
    this.getLearnersFromServer();
    this.isSignedIn = localStorage.getItem('loggedIn') === 'true';
  }

  ngOnDestroy(): void {
    this.unsubLearner();
  }

  getLearnersFromServer(): void {
    this.unsubLearner();
    this.getLearnersSub = this.learnerService.getLearners().subscribe(returnedLearners => {
      this.serverFilteredLearners = returnedLearners;
      this.updateLearnerFilter();
    }, err => {
      console.log(err);
    });
  }

  public updateLearnerFilter(): void {
    this.filteredLearners = this.learnerService.filterLearners(
      this.serverFilteredLearners, { name: this.learnerName });
  }

  unsubLearner(): void {
    if (this.getLearnersSub) {
      this.getLearnersSub.unsubscribe();
    }
  }

}
