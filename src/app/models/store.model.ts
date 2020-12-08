import { Actions } from '../services/store.service';

export interface State {
    templates: any;
}

export interface Action {
    type: Actions;
    payload?: any;
}
