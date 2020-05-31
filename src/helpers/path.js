import { pathToRegexp } from 'path-to-regexp';
import { uniqBy, prop } from 'ramda';
import { stringify } from 'qs';

function updatePath(location) {
  const updatePath = location.pathname.split('/');
  updatePath.shift();
  const newPath = updatePath.slice(1).join('/');

  return newPath;
}

function queryStringToJSON(pathname) {
  const pairs = pathname.slice(1).split('&');

  const result = {};
  pairs.forEach(function (pair) {
    pair = pair.split('=');
    result[pair[0]] = Number(decodeURIComponent(pair[1] || ''));
  });

  return result;
}

/**
 * Convert an array to a tree-structured array.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @param   {string}    parentId       The alias of the parent ID of the object in the array.
 * @param   {string}    children  The alias of children of the object in the array.
 * @return  {array}    Return a tree-structured array.
 */
function arrayToTree(data, id = 'id', parentId = 'pid', children = 'children') {
  const result = [];

  const hash = data.reduce((init, item) => {
    const included = init.hasOwnProperty(item.id);
    return included ? { ...init } : { ...init, [item.id]: item };
  }, {});

  data.forEach((item) => {
    const hashParent = hash[item[parentId]];

    if (hashParent) {
      !hashParent[children] && (hashParent[children] = []);
      hashParent[children].push(item);
    } else {
      result.push(item);
    }
  });

  const toBeUnique = result.map((item) =>
    item.children
      ? { ...item, children: uniqBy(prop(id), item.children) }
      : item
  );

  return toBeUnique;
}

/**
 * Whether the path matches the regexp if the language prefix is ignored, https://github.com/pillarjs/path-to-regexp.
 * @param   {string|regexp|array}     regexp     Specify a string, array of strings, or a regular expression.
 * @param   {string}                  pathname   Specify the pathname to match.
 * @return  {array|null}              Return the result of the match or null.
 */
function pathMatchRegexp(regexp, pathname) {
  return pathToRegexp(regexp).exec(pathname);
}

/**
 * In an array of objects, specify an object that traverses the objects whose parent ID matches.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    current   Specify the object that needs to be queried.
 * @param   {string}    parentId  The alias of the parent ID of the object in the array.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @return  {array}    Return a key array.
 */
function queryAncestors(array, current, parentId, id = 'id') {
  const result = [current];
  const hashMap = new Map();
  array.forEach((item) => hashMap.set(item[id], item));

  const getPath = (current) => {
    const currentParentId = hashMap.get(current[id])[parentId];
    if (currentParentId) {
      result.push(hashMap.get(currentParentId));
      getPath(hashMap.get(currentParentId));
    }
  };

  getPath(current);
  return result;
}

function currentMenu(menus, location) {
  return menus.find(
    (_) => _.route && pathMatchRegexp(_.route, location.pathname)
  );
}

const handleRefresh = (newQuery, location, history) => {
  const { pathname } = location;
  history.push({
    pathname,
    search: stringify(
      {
        ...newQuery,
      },
      { arrayFormat: 'repeat' }
    ),
  });
};

export {
  queryAncestors,
  pathMatchRegexp,
  arrayToTree,
  updatePath,
  queryStringToJSON,
  currentMenu,
  handleRefresh,
};
