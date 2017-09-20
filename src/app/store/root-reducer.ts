import { Store } from '@ngrx/store';
import { voteReducer } from './votes/vote-reducer';
import { VotesState } from './votes/vote-state';
import { createStore, combineReducers } from 'redux';
import { FactoryProvider, InjectionToken } from '@angular/core';

const ROOT_REDUCER = {
  votes: voteReducer
};

function appStoreFactory() {
  return createStore(combineReducers(ROOT_REDUCER));
}

export interface ApplicationState {
  votes: VotesState
}

export const APP_STORE = new InjectionToken<Store<ApplicationState>>('appStore');

export const APP_STORE_PROVIDER: FactoryProvider = { provide: APP_STORE, useFactory: appStoreFactory };

