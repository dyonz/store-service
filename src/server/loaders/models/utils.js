const DataLoader = require('dataloader');

const createLoadersFromDescriptors = (descriptorByKeyName) => {
  const keyNames = Object.keys(descriptorByKeyName);

  const loaderByKeyName = {};

  for (const keyName of keyNames) {
    const { loadFromKeysFn, getKeyFn, makeCacheKeyFn } = descriptorByKeyName[
      keyName
    ];

    const loader = new DataLoader(
      async (keys) => {
        const objs = await loadFromKeysFn(keys);

        const currentKeyName = keyName;
        for (const obj of objs) {
          for (const keyName of keyNames) {
            if (keyName === currentKeyName) {
              continue;
            }

            const loader = loaderByKeyName[keyName];
            const { getKeyFn } = descriptorByKeyName[keyName];

            const key = getKeyFn(obj);
            loader.clear(key).prime(key, obj);
          }
        }

        const keyed = objs.reduce((keyed, obj) => {
          const cacheKey = makeCacheKeyFn(getKeyFn(obj));
          keyed[cacheKey] = obj;
          return keyed;
        }, {});
        const sorted = keys.map((key) => {
          const cacheKey = makeCacheKeyFn(key);
          return keyed[cacheKey] || null;
        });
        return sorted;
      },
      { cacheKeyFn: makeCacheKeyFn }
    );

    loaderByKeyName[keyName] = loader;
  }

  const loaders = {};

  for (const keyName of keyNames) {
    const loader = loaderByKeyName[keyName];

    loaders[keyName] = {
      load: loader.load.bind(loader),
      loadMany: loader.loadMany.bind(loader)
    };
  }

  const clear = (obj) => {
    for (const keyName of keyNames) {
      const loader = loaderByKeyName[keyName];
      const { getKeyFn } = descriptorByKeyName[keyName];

      const key = getKeyFn(obj);
      loader.clear(key);
    }
  };

  const prime = (obj) => {
    for (const keyName of keyNames) {
      const loader = loaderByKeyName[keyName];
      const { getKeyFn } = descriptorByKeyName[keyName];

      const key = getKeyFn(obj);
      loader.clear(key).prime(key, obj);
    }
  };

  return { loaderByKeyName: loaders, clear, prime };
};

module.exports = { createLoadersFromDescriptors };
