/* I18n configuration, `languages` and `defaultLanguage` are required currently. */

const zhFlag = require('@assets/svg/china.svg');
const esFlag = require('@assets/svg/spain.svg');
const usFlag = require('@assets/svg/usa.svg');

const logoDark = require('@assets/images/logo-dark.png');
const logoLight = require('@assets/images/logo-light.png');

module.exports = {
  siteName: 'React Admin Dashboard',
  copyright: 'Created by Noah. W ©2020',
  logoDark: logoDark,
  logoLight: logoLight,
  apiPrefix: '/api/v1',
  fixedHeader: true, // sticky primary layout header

  i18n: {
    /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
    languages: [
      {
        key: 'es',
        title: 'Español',
        flag: esFlag
      },
      {
        key: 'en',
        title: 'English',
        flag: usFlag
      },
      {
        key: 'zh',
        title: '中文',
        flag: zhFlag
      }
    ],
    defaultLanguage: 'en'
  }
};
