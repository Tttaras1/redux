import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { delay, pluck, publish, tap, timeout } from 'rxjs/operators';
import { Template } from '../models/template.model';
import { Actions, Store } from '../services/store.service';

@Component({
  selector: 'app-temlate-info',
  templateUrl: './temlate-info.component.html',
  styleUrls: ['./temlate-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemlateInfoComponent implements OnInit {

  public templates$: Observable<any> = new Subject();
  public counter = 0;

  public displayedColumns: string[] = ['name', 'modified'];

  constructor(
    private readonly _store: Store
  ) { }

  public ngOnInit(): void {
    this.templates$ = this._store.get
      .pipe(
        pluck('templates'),
      );
  }
}
