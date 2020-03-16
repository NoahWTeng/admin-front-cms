export * from './app.actions';
export * from './auth.actions';

import { globalType } from '@constants';

export const authError = error => ({ type: globalType.ERROR, error });
