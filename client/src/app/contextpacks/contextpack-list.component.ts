import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextPack } from './contextpack';
import { ContextPackService} from './contextpack.service';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contextpack-list-component',
  templateUrl: 'contextpack-list.component.html',
  styleUrls: ['./contextpack-list.component.scss'],
  providers: []
})

export class ContextPackListComponent implements OnInit, OnDestroy  {
  // These are public so that tests can reference them (.spec.ts)
  public serverFilteredContextpacks: ContextPack[];
  public filteredContextpacks: ContextPack[];

  public contextpackName: string;

  getContextpacksSub: Subscription;

  constructor(private contextpackService: ContextPackService, private snackBar: MatSnackBar, private router: Router) {

  }

  reloadComponent() {
    const currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

  updateField(contextPack: ContextPack, event: string[]) {
    //to figure out what field is being changed so the correct http param can be sent
    const field = event[1];
    const data = event[0];
    switch(field) {

    case 'name' :
      this.contextpackService.updateContextPack(contextPack, {name: data}).subscribe(existingID => {
        this.snackBar.open('Updated field ' + field + ' of pack ' + contextPack.name, null, {
        duration: 2000,
      });
      this.reloadComponent();
    }, err => {
      this.snackBar.open('Failed to update the ' + field + ' field with value ' + data, 'OK', {
        duration: 5000,
      });
    });

    break;

    case 'enabled' :
      this.contextpackService.updateContextPack(contextPack, {enabled: event[0]}).subscribe(existingID => {
        this.snackBar.open('Updated field ' + event[1] + ' of pack ' + contextPack.name, null, {
        duration: 2000,
      });
      this.reloadComponent();
    }, err => {
      this.snackBar.open('Failed to update the ' + event[1] + ' field with value ' + event[0], 'OK', {
        duration: 5000,
      });
    });

    break;

    case 'icon' :
      this.contextpackService.updateContextPack(contextPack, {icon: event[0]}).subscribe(existingID => {
        this.snackBar.open('Updated field ' + event[1] + ' of pack ' + contextPack.name, null, {
        duration: 2000,
      });
      this.reloadComponent();
    }, err => {
      this.snackBar.open('Failed to update the ' + event[1] + ' field with value ' + event[0], 'OK', {
        duration: 5000,
      });
    });

    break;
    }
  }

  getContextpacksFromServer(): void {
    this.unsub();
    this.getContextpacksSub = this.contextpackService.getContextPacks().subscribe(returnedContextpacks => {
      this.serverFilteredContextpacks = returnedContextpacks;
      this.updateFilter();
    }, err => {
      console.log(err);
    });
  }

  public updateFilter(): void {
    this.filteredContextpacks = this.contextpackService.filterContextPacks(
      this.serverFilteredContextpacks, { name: this.contextpackName });
  }

  /**
   * Starts an asynchronous operation to update the contextpacks list
   *
   */
  ngOnInit(): void {
    this.getContextpacksFromServer();
  }

  ngOnDestroy(): void {
    this.unsub();
  }

  unsub(): void {
    if (this.getContextpacksSub) {
      this.getContextpacksSub.unsubscribe();
    }
  }
}
