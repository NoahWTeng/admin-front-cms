import { combineReducers } from 'redux';
import { admin } from './admin.reducer';
import { ui } from './ui.reducer';
import { language } from './language.reducer';
import { users } from './users.reducer';
import { modal } from './modal.reducer';
import { categories } from './categories.reducer';
import { products } from './products.reducer';
import { notification } from './notification.reducer';

export const rootReducer = combineReducers({
  admin,
  ui,
  language,
  users,
  modal,
  categories,
  products,
  notification,
});
