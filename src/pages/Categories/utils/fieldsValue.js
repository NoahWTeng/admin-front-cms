const filterCol = (col, modalType) =>
  col.filter(({ title }) => title.includes(modalType));

export const fieldsValue = (i18n, modalType, parents, pathname) => {
  const first = [
    {
      id: '1',
      title: [i18n.t`Update`],
      label: i18n.t`Id`,
      name: 'id',
      disable: true,
    },
    {
      id: '2',
      title: [i18n.t`Update`, i18n.t`Create`],
      label: i18n.t`Title`,
      name: 'title',
      rules: [
        {
          required: true,
          message: i18n.t`This field is required!`,
        },
      ],
    },
    {
      id: '3',
      title: [i18n.t`Update`, i18n.t`Create`],
      label: i18n.t`Description`,
      name: 'description',
      textArea: true,
    },
    {
      id: '4',
      title: [i18n.t`Update`, i18n.t`Create`],
      label: i18n.t`Active`,
      switch: true,
      name: 'isActive',
    },
    {
      id: '5',
      title: [i18n.t`Update`, i18n.t`Create`],
      label: i18n.t`Imagen`,
      name: 'imageUrl',
      upload: true,
    },
  ];
  if (pathname) {
    return filterCol(first, modalType);
  }

  const parentsOpt = parents.map(({ title, _id }) => ({ title, _id }));

  const second = [
    ...first,
    {
      id: '6',
      title: [i18n.t`Update`, i18n.t`Create`],
      label: i18n.t`breadcrumbParentId`,
      name: 'breadcrumbParentId',
      options: parentsOpt,
    },
    {
      id: '7',
      title: [i18n.t`Update`, i18n.t`Create`],
      label: i18n.t`menuParentId`,
      name: 'menuParentId',
      options: parentsOpt,
    },
  ];

  return filterCol(second, modalType);
};
