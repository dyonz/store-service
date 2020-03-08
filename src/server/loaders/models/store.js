const { createLoadersFromDescriptors } = require('./utils');

const KeyName = {
  ID: 'id'
};

const createLoaders = ({ models, psql }) => {
  const descriptorByKeyName = {
    [KeyName.ID]: {
      loadFromKeysFn: (ids) => models.stores.findAllInIDs(ids, { psql }),
      getKeyFn: ({ id }) => id,
      makeCacheKeyFn: (id) => id
    }
  };

  const { loaderByKeyName, clear, prime } = createLoadersFromDescriptors(
    descriptorByKeyName
  );

  return {
    byID: loaderByKeyName[KeyName.ID],
    clear,
    prime
  };
};

module.exports = { createLoaders };
