import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContextPack, Word, Wordlist } from 'src/app/contextpacks/contextpack';
import { ContextPackService } from 'src/app/contextpacks/contextpack.service';
import { Learner } from '../learner';
import { LearnerService } from '../learner.service';




@Component({
  selector: 'app-learner-info',
  templateUrl: './learner-info.component.html',
  styleUrls: ['./learner-info.component.scss'],
  providers :[]
})

export class LearnerInfoComponent implements OnInit, OnDestroy {

  learner: Learner;
  id: string;
  name: string;
  getLearnerSub: Subscription;
  getContextPackSub: Subscription;
  contextPacks: ContextPack[];
  assignedPacks: ContextPack[] =[];

  constructor( public snackBar: MatSnackBar, private route: ActivatedRoute, private contextPackService: ContextPackService,
    private learnerService: LearnerService, private router: Router) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
      if (this.getLearnerSub) {
        this.getLearnerSub.unsubscribe();
      }
      if (this.getContextPackSub) {
        this.getContextPackSub.unsubscribe();
      }
      this.getLearnerSub = this.learnerService.getLearnerById(this.id)
      .subscribe(learner =>{this.learner = learner;
      });
      if (this.learner) {
        this.getContextPackSub = this.contextPackService.getContextPacks().subscribe(
          contextpacks => { this.contextPacks = contextpacks;
          });}
    });
      this.getContextPackSub = this.contextPackService.getContextPacks().subscribe(contextpacks => this.contextPacks = contextpacks);
      this.filterPacks();
  }

  ngOnDestroy(): void {
    if (this.getLearnerSub) {
      this.getLearnerSub.unsubscribe();
    }
    if (this.getContextPackSub) {
      this.getContextPackSub.unsubscribe();
    }
  }

  filterPacks(): void {
    this.contextPacks.forEach(contextPack => {
      this.learner.assignedContextPacks.forEach(packID => {
        if(contextPack._id === packID) {
          this.assignedPacks.push(contextPack);
      }});
    });
  }

}
