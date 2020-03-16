export const mergeArray = (previewUsers, newUser) => {
  return previewUsers.reduce((ini, previewUsers) => {
    const finded = previewUsers._id === newUser._id;
    return finded ? [...ini, newUser] : [...ini, previewUsers];
  }, []);
};
