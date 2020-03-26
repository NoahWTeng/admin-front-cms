import { combineReducers } from 'redux';
import { admin } from './admin.reducer';
import { ui } from './ui.reducer';
import { language } from './language.reducer';
import { users } from './users.reducer';
import { modal } from './modal.reducer';

export const rootReducer = combineReducers({
  admin,
  ui,
  language,
  users,
  modal
});
