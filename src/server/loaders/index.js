const { loaderCreators } = require('./models');

const createLoaders = (db) =>
  new Proxy(
    {},
    {
      get(obj, propName) {
        if (!obj[propName] && loaderCreators[propName]) {
          obj[propName] = loaderCreators[propName].createLoaders(db);
        }
        return obj[propName];
      }
    }
  );

module.exports = { createLoaders };
