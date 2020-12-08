import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Store } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test-task';

  constructor(
    private readonly _router: Router,
    private readonly _store: Store
  ) {}

  public ngOnInit() {
    this._store.dispatch({ type: Actions.LOAD_TEMPLATE });
  }

  public navigate(url): void {
    this._router.navigate([`/${url}`]);
  }
}
