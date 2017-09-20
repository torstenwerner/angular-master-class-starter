import { createSelector } from '@ngrx/store';
import { ApplicationState } from '../';
import { Contact } from '../../models/contact';
import { ContactsActions, ContactsActionTypes } from './contacts.actions';

export interface ContactsState {
  list: Array<Contact>;
  selectedContactId: number | null;
}

const INITIAL_STATE: ContactsState = {
  list: [],
  selectedContactId: null
}

export function contactsReducer(state: ContactsState = INITIAL_STATE, action: ContactsActions) {

  switch (action.type) {

    case ContactsActionTypes.LOAD_CONTACTS_SUCCESS:
      return {
        ...state,
        list: action.payload
      }

    case ContactsActionTypes.UPDATE_CONTACT:
      const updatedList = state.list.map(contact =>
        contact.id == state.selectedContactId ? { ...contact, ...action.payload } : contact);
      return {
        ...state,
        list: updatedList
      }

    case ContactsActionTypes.SELECT_CONTACT:
      return {
        ...state,
        selectedContactId: action.payload
      }

    case ContactsActionTypes.ADD_CONTACT:
      const hasAlready = state.list.some(contact => contact.id == action.payload.id);
      return {
        ...state,
        list: hasAlready ? state.list : [...state.list, action.payload]
      }

    default:
      return state;
  }
}

export namespace ContactsQuery {
  export const getContacts = (state: ApplicationState) => state.contacts.list;
  export const isLoaded = (state: ApplicationState) => state.contacts.list.length > 0;
  export const getSelectedContactId = (state: ApplicationState) => state.contacts.selectedContactId;
  export const getSelectedContact = createSelector(getContacts, getSelectedContactId, (contacts, id) => {
    const contact = contacts.find(contact => contact.id == id);
    return contact ? {...contact} : undefined;
  })
}
