import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Learner } from '../learner';
import { LearnerService } from '../learner.service';
import { ContextPack } from '../../contextpacks/contextpack';
import { ContextPackService } from '../../contextpacks/contextpack.service';
import { ContextPackCardComponent } from '../../contextpacks/contextpack-card.component';

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
  getContextPackSub: Subscription;
  contextPacks: ContextPack[];
  assignedPacks: ContextPack[];

  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar,
    private learnerService: LearnerService, private router: Router, private contextPackService: ContextPackService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
      if (this.getLearnerSub) {
        this.getLearnerSub.unsubscribe();
      }
      this.getLearnerSub = this.learnerService.getLearnerById(this.id).subscribe(learner => this.learner = learner);
      this.getContextPackSub = this.contextPackService.getContextPacks().subscribe(contextpacks => this.contextPacks = contextpacks);
      this.filterPacks();
    });
  }

  filterPacks(): void {
    this.contextPacks.forEach(contextPack => {
      this.learner.assignedContextPacks.forEach(packID => {
        if(contextPack._id === packID) {
          this.assignedPacks.push(contextPack);
      }});
    });
  }

  onDestroy(): void {
    if (this.getLearnerSub) {
      this.getLearnerSub.unsubscribe();
    }
  }
}
