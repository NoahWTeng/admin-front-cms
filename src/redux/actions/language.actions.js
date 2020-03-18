import { LANGUAGE_SUCCESS, LANGUAGE_PROCESS } from '@constants';

const changeLanguageProcess = data => ({
  type: LANGUAGE_PROCESS,
  payload: data
});

const changeLanguageSucess = data => ({
  type: LANGUAGE_SUCCESS,
  payload: data
});

export { changeLanguageProcess, changeLanguageSucess };
