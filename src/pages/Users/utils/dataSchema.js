export const dataSchema = (data, type) => {
  return type === 'Create' || type === 'Update'
    ? {
        email: data.email,
        phone: data.phone,
        fullName: `${data.firstName} ${data.lastName1}`,
        range: data.range,
        billAddress: {
          firstName: data.firstName,
          lastName1: data.lastName1,
          lastName2: data.lastName2 || ' ',
          company: data.company,
          taxType: data.taxType,
          taxNumber: data.taxNumber,
          street: data.address,
          postCode: data.postCode,
          town: data.town,
          city: data.city,
          country: data.country
        }
      }
    : {
        shippAddress: {
          firstName: data.firstName,
          lastName1: data.lastName1,
          lastName2: data.lastName2 || ' ',
          company: data.company,
          phone2: data.phone2,
          street: data.address,
          postCode: data.postCode,
          town: data.town,
          city: data.city,
          country: data.country
        }
      };
};
