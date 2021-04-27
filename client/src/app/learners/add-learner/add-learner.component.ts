import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ObjectUnsubscribedError, Subscription } from 'rxjs';
import { Learner } from '../learner';
import { LearnerService } from '../learner.service';

@Component({
  selector: 'app-learner-list',
  templateUrl: './add-learner.component.html',
  styleUrls: ['./add-learner.component.scss']
})
export class AddLearnerComponent implements OnInit, OnDestroy {

  public serverFilteredLearners: Learner[];
  public filteredLearners: Learner[];
  public contextpackName: string;
  public learnerName: string;
  public learnerForm: FormGroup;
  isAdmin: boolean;

  getLearnersSub: Subscription;


  constructor(private learnerService: LearnerService, private fb: FormBuilder,
    private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.learnerForm = this.fb.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    });
    this.isAdmin = this.learnerService.checkIfAdmin(localStorage.getItem('admin'));
  }

  submitForm() {
    const newLearner = {
      _id: null,
      name: this.learnerForm.controls.name.value,
      assignedContextPacks: [],
    };

    this.learnerService.addLearner(newLearner).subscribe(newID => {
      this.snackBar.open('Added ' + newLearner.name, null, {
        duration: 2000,
      });
      this.router.navigate(['/learner/', newID]);
    }, err => {
      this.snackBar.open('Failed to add a new Learner', 'OK', {
        duration: 5000,
      });
    });
  }

  ngOnDestroy(): void {
  }

}
