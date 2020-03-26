import React from 'react';
import { useSelector } from 'react-redux';
import { I18nProvider } from '@lingui/react';
import { ConfigProvider } from 'antd';

import { BaseLayout } from './BaseLayout';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import en_US from 'antd/lib/locale-provider/en_US';
import es_ES from 'antd/lib/locale-provider/es_ES';
import { Loader } from '@components';

const languages = {
  zh: zh_CN,
  en: en_US,
  es: es_ES
};

export const Layouts = ({ children }) => {
  const { language, catalogs } = useSelector(state => state.language);
  const isLoading = useSelector(state => state.ui.isLoading);

  if (isLoading) return <Loader spinning />;
  return (
    <ConfigProvider locale={languages[language]}>
      <I18nProvider language={language} catalogs={catalogs}>
        <BaseLayout language={language}>{children}</BaseLayout>
      </I18nProvider>
    </ConfigProvider>
  );
};
