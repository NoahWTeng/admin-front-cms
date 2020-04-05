import React from 'react';
import { Trans } from '@lingui/react';
import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  TagsOutlined,
  TagOutlined
} from '@ant-design/icons';

export const RoutesList = language => {
  return [
    {
      id: '1',
      icon: <DashboardOutlined />,
      name: <Trans>{'Dashboard'}</Trans>,
      route: `/`
    },
    {
      id: '2',
      breadcrumbParentId: '1',
      icon: <TeamOutlined />,
      name: <Trans>{'Users'}</Trans>,
      route: `/${language}/user`
    },
    {
      id: '3',
      menuParentId: '-1',
      icon: <UserOutlined />,
      breadcrumbParentId: '2',
      name: <Trans>{'User detail'}</Trans>,
      route: `/${language}/user/:id`
    },
    {
      id: '5',
      breadcrumbParentId: '1',
      name: <Trans>{'Categories'}</Trans>,
      icon: <TagsOutlined />
    },
    {
      id: '51',
      breadcrumbParentId: '5',
      menuParentId: '5',
      name: <Trans>{'Category 1'}</Trans>,
      icon: <TagOutlined />,
      route: `/${language}/categories/first`
    },
    {
      id: '52',
      breadcrumbParentId: '5',
      menuParentId: '5',
      name: <Trans>{'Category 2'}</Trans>,
      icon: <TagOutlined />,
      route: `/${language}/categories/second`
    }

    // {
    //   id: '51',
    //   breadcrumbParentId: '5',
    //   menuParentId: '5',
    //   name: 'Echart',
    //   icon: <LineChartOutlined />,
    //   route: `/${language}/chart/ECharts`
    // },
    // {
    //   id: '52',
    //   breadcrumbParentId: '5',
    //   menuParentId: '5',
    //   name: 'HighCharts',

    //   icon: <BarChartOutlined />,
    //   route: `/${language}/chart/highCharts`
    // },
    // {
    //   id: '53',
    //   breadcrumbParentId: '5',
    //   menuParentId: '5',
    //   name: 'Rechartst',
    //   icon: <RadarChartOutlined />,
    //   route: `/${language}/chart/Recharts`
    // },
    // {
    //   id: '5',
    //   breadcrumbParentId: '1',
    //   name: 'Charts',
    //   icon: <DotChartOutlined />
    // },
  ];
};
