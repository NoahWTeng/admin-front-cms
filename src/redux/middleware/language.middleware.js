import { LANGUAGE_SUCCESS, LANGUAGE_PROCESS } from '@constants';
import {
  showMessageLoading,
  hideMessage,
  changeLanguageSucess
} from '@actions';

import { storage, history, updatePath } from '@helpers';

export const languageProcess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === LANGUAGE_PROCESS) {
    const language = action.payload;
    const newPath = updatePath(window.location);

    (async function loadCatalog() {
      const catalog = await import(
        /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
        `@lingui/loader!../../../src/locales/${language}/messages.json`
      );
      dispatch(changeLanguageSucess({ language, catalog }));
    })();

    history.push({
      pathname: newPath ? `/${language}/${newPath}` : '/',
      search: window.location.search
    });

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
