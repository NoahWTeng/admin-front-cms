export const setInitialValue = (item, type) => {
  const check = type === 'Create';
  return {
    id: check ? '' : item._id,
    title: check ? '' : item.title,
    description: check ? '' : item.description,
    isActive: check ? false : item.isActive,
    imageUrl: check ? '' : item.imageUrl,
    breadcrumbParentId: check ? '' : item.breadcrumbParentId._id,
    menuParentId: check ? '' : item.menuParentId._id,
  };
};
