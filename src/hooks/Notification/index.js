import React, { useCallback } from 'react';
import { notification } from 'antd';
import { I18nContext } from '@layouts';

notification.config({
  placement: 'bottomRight',
  bottom: 64,
  duration: 6,
});

const proxyTarget = notification;

const noxy = (i18n) =>
  new Proxy(proxyTarget, {
    get(target, propKey) {
      return (args) => {
        target[propKey]({
          message: i18n[args.message],
          description: i18n[args.description],
        });
      };
    },
  });

export const useNotification = () => {
  const { language, catalogs } = React.useContext(I18nContext);

  const openNotification = useCallback(noxy(catalogs[language].messages), []);

  return { openNotification };
};
