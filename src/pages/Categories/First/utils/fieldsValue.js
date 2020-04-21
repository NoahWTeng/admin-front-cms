export const fieldsValue = (i18n, modalType) => {
  const col = [
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
      name: 'imageFile',
      upload: true,
    },
  ];

  return col.filter(({ title }) => title.includes(modalType));
};
