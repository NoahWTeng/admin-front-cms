export const fieldsValue = (i18n, modalType) => {
  const col = [
    {
      id: '1',
      title: [i18n.t`Update`, i18n.t`UpdateShipp`],
      label: i18n.t`Id`,
      name: 'id',
      disable: true,
      placeholder: null,
      rules: null
    },
    {
      id: '2',
      title: [i18n.t`Update`, i18n.t`Create`],
      label: i18n.t`Range`,
      name: 'range',
      rules: [
        {
          required: true,
          message: i18n.t`This field is required!`
        }
      ],
      options: ['particular', 'professional']
    },
    {
      id: '3',
      title: [i18n.t`Update`, i18n.t`Create`, i18n.t`UpdateShipp`],
      label: i18n.t`First name`,
      name: 'firstName',
      rules: [
        {
          required: true,
          message: i18n.t`This field is required!`
        }
      ],
      placeholder: i18n.t`First name`
    },
    {
      id: '4',
      title: [i18n.t`Update`, i18n.t`Create`, i18n.t`UpdateShipp`],
      label: i18n.t`Surname`,
      name: 'lastName1',
      rules: [
        {
          required: true,
          message: i18n.t`This field is required!`
        }
      ],
      placeholder: i18n.t`Surname`
    },
    {
      id: '5',
      title: [i18n.t`Update`, i18n.t`Create`, i18n.t`UpdateShipp`],
      label: i18n.t`Second surname`,
      name: 'lastName2',
      rules: null,
      placeholder: i18n.t`Second surname`
    },
    {
      id: '6',
      title: [i18n.t`Update`, i18n.t`Create`, i18n.t`UpdateShipp`],
      label: i18n.t`Company`,
      name: 'company',
      rules: [
        {
          required: true,
          message: i18n.t`This field is required!`
        }
      ],
      placeholder: i18n.t`Company`
    },
    {
      id: '7',
      title: [i18n.t`Update`, i18n.t`Create`],
      label: i18n.t`TaxType`,
      name: 'taxType',
      rules: [
        {
          required: true,
          message: i18n.t`This field is required!`
        }
      ],
      options: ['N.I.E', 'N.I.F', 'C.I.F']
    },
    {
      id: '8',
      title: [i18n.t`Update`, i18n.t`Create`],
      label: i18n.t`TaxNumber`,
      name: 'taxNumber',
      rules: [
        {
          required: true,
          message: i18n.t`This field is required!`
        }
      ],
      placeholder: i18n.t`TaxNumber`
    },
    {
      id: '9',
      title: [i18n.t`Update`, i18n.t`Create`],
      label: i18n.t`BillAddress`,
      name: 'address',
      rules: [
        {
          required: true,
          message: i18n.t`This field is required!`
        }
      ],
      placeholder: i18n.t`BillAddress`
    },
    {
      id: '10',
      title: [i18n.t`Update`, i18n.t`Create`, i18n.t`UpdateShipp`],
      label: i18n.t`PostalCode`,
      name: 'postCode',
      rules: [
        {
          required: true,
          message: i18n.t`This field must be numeric!`,
          pattern: /^([0-9])/
        }
      ],
      placeholder: i18n.t`PostalCode`
    },
    {
      id: '11',
      title: [i18n.t`Update`, i18n.t`Create`, i18n.t`UpdateShipp`],
      label: i18n.t`Town`,
      name: 'town',
      rules: [
        {
          required: true,
          message: i18n.t`This field is required!`
        }
      ],
      placeholder: i18n.t`Town`
    },
    {
      id: '12',
      title: [i18n.t`Update`, i18n.t`Create`, i18n.t`UpdateShipp`],
      label: i18n.t`Province`,
      name: 'city',
      rules: [
        {
          required: true,
          message: i18n.t`This field is required!`
        }
      ],
      placeholder: i18n.t`Province`
    },
    {
      id: '13',
      title: [i18n.t`Update`, i18n.t`Create`, i18n.t`UpdateShipp`],
      label: i18n.t`Country`,
      name: 'country',
      rules: [
        {
          required: true,
          message: i18n.t`This field is required!`
        }
      ],
      placeholder: i18n.t`Country`
    },
    {
      id: '14',
      title: [i18n.t`Update`, i18n.t`Create`],
      label: i18n.t`Phone`,
      name: 'phone',
      rules: [
        {
          required: true,
          message: i18n.t`This field must be numeric!`,
          pattern: /^([0-9])/
        }
      ],
      placeholder: i18n.t`Phone`,
      inputNumber: true
    },
    {
      id: '15',
      title: [i18n.t`Update`, i18n.t`Create`],
      label: i18n.t`Email`,
      name: 'email',
      rules: [
        {
          required: true,
          pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
          message: i18n.t`The input is not a valid E-mail!`
        }
      ],
      placeholder: i18n.t`Email`
    },
    {
      id: '16',
      title: [i18n.t`UpdateShipp`],
      label: i18n.t`Phone`,
      name: 'phone2',
      rules: [
        {
          required: true,
          pattern: /^([0-9])/,
          message: i18n.t`This field must be numeric!`
        }
      ],
      placeholder: i18n.t`Phone`,
      inputNumber: true
    },
    {
      id: '17',
      title: [i18n.t`UpdateShipp`],
      label: i18n.t`ShippAddress`,
      name: 'address',
      rules: [
        {
          required: true,
          message: i18n.t`This field is required!`
        }
      ],
      placeholder: i18n.t`ShippAddress`
    }
  ];

  return col.filter(({ title }) => title.includes(modalType));
};
