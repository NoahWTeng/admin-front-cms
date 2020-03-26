import { isEmpty } from 'lodash';

export const setInitialValue = (item, type) => {
  const { billAddress, shippAddress } = item;
  const check = isEmpty(item);

  return {
    email: check ? '' : item.email,
    range: check ? '' : item.range,
    phone: check ? '' : item.phone,
    id: check ? '' : item._id,
    firstName: check
      ? ''
      : type === 'UpdateShipp'
      ? shippAddress.firstName
      : billAddress.firstName,
    lastName1: check
      ? ''
      : type === 'UpdateShipp'
      ? shippAddress.lastName1
      : billAddress.lastName1,
    lastName2: check
      ? ''
      : type === 'UpdateShipp'
      ? shippAddress.lastName2
      : billAddress.lastName2,
    company: check
      ? ''
      : type === 'UpdateShipp'
      ? shippAddress.company
      : billAddress.company,
    taxType: check
      ? ''
      : type === 'UpdateShipp'
      ? shippAddress.taxType
      : billAddress.taxType,
    taxNumber: check
      ? ''
      : type === 'UpdateShipp'
      ? shippAddress.taxNumber
      : billAddress.taxNumber,
    address: check
      ? ''
      : type === 'UpdateShipp'
      ? shippAddress.street
      : billAddress.street,
    postCode: check
      ? ''
      : type === 'UpdateShipp'
      ? shippAddress.postCode
      : billAddress.postCode,
    town: check
      ? ''
      : type === 'UpdateShipp'
      ? shippAddress.town
      : billAddress.town,
    city: check
      ? ''
      : type === 'UpdateShipp'
      ? shippAddress.city
      : billAddress.city,
    country: check
      ? ''
      : type === 'UpdateShipp'
      ? shippAddress.country
      : billAddress.country,
    phone2: check ? '' : shippAddress.phone2
  };
};
