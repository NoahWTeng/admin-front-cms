export const storage = {
  set: (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  },
  get: name => {
    if (!name) return;
    return window.localStorage.getItem(name);
  },
  remove: name => {
    if (!name) return;
    return window.localStorage.removeItem(name);
  },
  clear: () => {
    return window.localStorage.clear();
  }
};

export const getStorage = {
  collapsed: () => JSON.parse(storage.get('collapsed')),
  isDarkTheme: () => JSON.parse(storage.get('isDarkTheme')),
  lang: () => JSON.parse(storage.get('lang')),
  login: () => JSON.parse(storage.get('login')),
  admin: () => JSON.parse(storage.get('admin'))
};
