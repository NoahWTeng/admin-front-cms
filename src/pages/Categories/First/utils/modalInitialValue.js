import { isEmpty } from 'ramda';

export const setInitialValue = (item) => {
  const check = isEmpty(item);

  return {
    id: check ? '' : item._id,
    title: check ? '' : item.title,
    description: check ? '' : item.description,
    isActive: check ? false : item.isActive,
    level: 1,
  };
};
