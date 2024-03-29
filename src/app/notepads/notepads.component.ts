import {Component, OnDestroy, OnInit} from '@angular/core';
import { GistsService } from '../shared/gists.service';
import { Gist } from '../shared/gist.interface';
import { Subscription } from 'rxjs';
import { NotepadsService } from './notepads.service';

@Component({
  selector: 'app-notepads',
  templateUrl: './notepads.component.html',
  styleUrls: ['./notepads.component.scss']
})
export class NotepadsComponent implements OnInit, OnDestroy {

  public notepads: Gist[];
  private subscriptions = new Subscription();

  constructor(private gistsService: GistsService,
              private notepadsService: NotepadsService,
  ) { }

  ngOnInit(): void {
    this.getNotepads();
    const subscription = this.notepadsService
        .notepadsUpdateSubject
        .subscribe(() => this.getNotepads());
    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getNotepads(): void {
    const subscription = this.gistsService
        .getGists()
        .subscribe((notepads: Gist[]) => this.notepads = notepads);
    this.subscriptions.add(subscription);
  }

}
