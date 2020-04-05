export const setInitialValue = (item, type) => {
  const check = type === 'Create';

  if (type === 'UpdateShipp') {
    const { shipping } = item;
    return {
      phone: shipping.phone,
      id: item._id,
      firstName: shipping.firstName,
      lastName1: shipping.lastName1,
      lastName2: shipping.lastName2,
      company: shipping.company,
      street: shipping.street,
      postCode: shipping.postCode,
      town: shipping.town,
      city: shipping.city,
      country: shipping.country,
    };
  }

  return {
    email: check ? '' : item.email,
    range: check ? '' : item.range,
    phone: check ? '' : item.phone,
    id: check ? '' : item._id,
    firstName: check ? '' : item.firstName,
    lastName1: check ? '' : item.lastName1,
    lastName2: check ? '' : item.lastName2,
    company: check ? '' : item.company,
    taxType: check ? '' : item.taxType,
    taxNumber: check ? '' : item.taxNumber,
    street: check ? '' : item.street,
    postCode: check ? '' : item.postCode,
    town: check ? '' : item.town,
    city: check ? '' : item.city,
    country: check ? '' : item.country,
  };
};
