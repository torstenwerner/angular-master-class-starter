import { Store } from '@ngrx/store';
import { voteReducer } from './votes/vote-reducer';
import { VotesState } from './votes/vote-state';
import { createStore, combineReducers } from 'redux';
import { InjectionToken } from '@angular/core';

const ROOT_REDUCER = {
  votes: voteReducer
};

export interface ApplicationState {
  votes: VotesState
}

export const APP_STORE = new InjectionToken<Store<ApplicationState>>('appStore');

export function appStoreFactory() {
  return createStore(combineReducers(ROOT_REDUCER));
}

