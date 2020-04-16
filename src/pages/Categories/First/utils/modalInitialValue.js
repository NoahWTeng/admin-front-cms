export const setInitialValue = (item, type) => {
  const check = type === 'Create';

  return {
    id: check ? '' : item._id,
    title: check ? '' : item.title,
    description: check ? '' : item.description,
    isActive: check ? false : item.isActive,
  };
};
