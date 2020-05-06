export const setInitialValue = (item, type, pathname) => {
  const check = type === 'Create';

  const first = {
    id: check ? '' : item._id,
    title: check ? '' : item.title,
    description: check ? '' : item.description,
    isActive: check ? false : item.isActive,
    imageUrl: check ? '' : item.imageUrl,
  };

  if (pathname) return first;

  const second = {
    breadcrumbParentId: check ? '' : item.breadcrumbParentId._id,
    menuParentId: check ? '' : item.menuParentId._id,
  };
  return {
    ...first,
    ...second,
  };
};
