import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable, of, Subject } from 'rxjs';
import { delay, map, mapTo, scan, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { Action, State } from '../models/store.model';
import { TemplateRepositoryService } from './template-repository.service';

const InitialState: State = {
  templates: []
};

export enum Actions {
  __EMPTY_ACTION__ = '__EMPTY_ACTION__',
  LOAD_TEMPLATE = 'LOAD_TEMPLATE',
  LOAD_TEMPLATE_SUCCESS = 'LOAD_TEMPLATE_SUCCESS',
  SAVE_TEMPLATE = 'SAVE_TEMPLATE',
  SAVE_TEMPLATE_SUCCESS = 'SAVE_TEMPLATE_SUCCESS'
}

@Injectable({
  providedIn: 'root'
})
export class Store {
  private readonly _action$ = new Subject<Action>();
  private readonly _dispatcher$: Observable<Action> = merge(this._action$, this.effects$).pipe(shareReplay());

  constructor(
    private readonly _templateService: TemplateRepositoryService
  ) {
    this.get.subscribe();
  }

  public get get(): Observable<State> {
    return this._dispatcher$
      .pipe(
        startWith(InitialState),
        scan(this.reducer, InitialState)
      );
  }

  public dispatch(action: Action): void {
    return this._action$.next(action);
  }

  private reducer(state: State, action: Action): State {
    switch (action.type) {
      case Actions.LOAD_TEMPLATE_SUCCESS:
        return { ...state, ...{templates: action.payload} };
      case Actions.SAVE_TEMPLATE_SUCCESS:
        return { ...state, ...{templates: action.payload} };
      default: {
        return state;
      }
    }
  }

  private get effects$(): Observable<Action> {
    return this._action$
      .pipe(
        switchMap((action: Action) => {
          switch (action.type) {
            case Actions.LOAD_TEMPLATE:
              return this._templateService.getTemplates()
                .pipe(
                  map(response => ({ type: Actions.LOAD_TEMPLATE_SUCCESS, payload: response }))
                  );
            case Actions.SAVE_TEMPLATE:
              return of({})
                  .pipe(
                    delay(500),
                    mapTo({type: Actions.SAVE_TEMPLATE_SUCCESS, payload: action.payload})
                  );
            default:
              return of({type: Actions.__EMPTY_ACTION__});
          }
        })
      );
  }
}
