import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Learner } from '../learner';
import { LearnerService } from '../learner.service';

@Component({
  selector: 'app-learner-info',
  templateUrl: './learner-info.component.html',
  styleUrls: ['./learner-info.component.scss']
})
export class LearnerInfoComponent implements OnInit {

  public learnerName: string;

  learner: Learner;
  id: string;
  getLearnerSub: Subscription;

  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar,
    private learnerService: LearnerService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
      if (this.getLearnerSub) {
        this.getLearnerSub.unsubscribe();
      }
      this.getLearnerSub = this.learnerService.getLearnerById(this.id).subscribe(learner => this.learner = learner);
    });
  }

  onDestroy(): void {
    if (this.getLearnerSub) {
      this.getLearnerSub.unsubscribe();
    }
  }
}
