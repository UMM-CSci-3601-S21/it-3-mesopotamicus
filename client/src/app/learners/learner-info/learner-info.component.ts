/* eslint-disable eqeqeq */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContextPack } from 'src/app/contextpacks/contextpack';
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
  ctxID: string;
  id: string;
  availableCtxPacks: ContextPack[];
  allCxtPacks: ContextPack[];
  getLearnerSub: Subscription;
  assignedPacks: ContextPack[] =[];
  assignedPacksObj: AssignedPack[]=[];

  constructor( public snackBar: MatSnackBar, private route: ActivatedRoute, private contextPackService: ContextPackService,
    private learnerService: LearnerService, private router: Router) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
      this.contextPackService.getContextPacks().subscribe(returnedContextpacks => {
        this.allCxtPacks = returnedContextpacks;
      }, err => {
        console.log(err);
      });
      if (this.getLearnerSub) {
        this.getLearnerSub.unsubscribe();
      }
      this.getLearnerSub = this.learnerService.getLearnerById(this.id)
      .subscribe(learner =>{this.learner = learner;
        this.getAssignedContextPacks();
      });
    });
    this.filterPacks();
  }

  ngOnDestroy(): void {
    if (this.getLearnerSub) {
      this.getLearnerSub.unsubscribe();
    }

  }

  getAssignedContextPacks(){
    let i=0;
    for(i; i<this.learner.assignedContextPacks.length; i++){
      this.contextPackService.getContextPackById(this.learner.assignedContextPacks[i])
      .subscribe(contextpack => {
      this.assignedPacks.push(contextpack);
      }
      );
    }
  }

  filterPacks(): void {
    this.allCxtPacks.forEach(contextPack => {
      this.learner.assignedContextPacks.forEach(packID => {
        if(contextPack._id != packID) {
          this.availableCtxPacks.push(contextPack);
      }});
    });
  }

  submitContextPackID(){
    console.log(this.ctxID);
    console.log(this.id);

    this.learnerService.addContextPackIdToLearner(this.ctxID, this.id).subscribe();

  }


}

export interface AssignedPack {
  contextpack: ContextPack;
}
