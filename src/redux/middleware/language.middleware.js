import { LANGUAGE_SUCCESS, LANGUAGE_PROCESS } from '@constants';
import {
  showMessageLoading,
  hideMessage,
  changeLanguageSucess
} from '@actions';
import { storage } from '@helpers';

export const languageProcess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === LANGUAGE_PROCESS) {
    const language = action.payload;

    (async function loadCatalog() {
      const catalog = await import(
        /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
        `@lingui/loader!../../../src/locales/${language}/messages.json`
      );
      dispatch(changeLanguageSucess({ language, catalog }));
    })();

    dispatch(showMessageLoading());
  }
};

export const updateLanguageSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === LANGUAGE_SUCCESS) {
    storage.set('lang', action.payload);
    dispatch(hideMessage());
  }
};

export const languageMdl = [languageProcess, updateLanguageSuccess];
