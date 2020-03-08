const { UserInputError } = require('apollo-server');

const resolvers = {
  Query: {
    stores: async (_, __, { db }) => {
      const { models, psql } = db;

      return await models.stores.findAll(null, { psql });
    },
    storeByID: async (_, { id }, { loaders }) => {
      return await loaders.stores.byID.load(id);
    }
  },
  Mutation: {
    createStore: async (_, { input }, { db, loaders }) => {
      const { models, psql } = db;

      const store = await models.stores.create(
        {
          name: input.name,
          meta: input.meta
        },
        { psql }
      );

      loaders.stores.prime(store);

      return { success: true, store };
    },
    deleteStore: async (_, { input }, { db, loaders }) => {
      const { models, psql } = db;

      const store = await loaders.stores.byID.load(input.storeID);
      if (!store) throw new UserInputError();

      await models.stores.deleteWithID(store.id, { psql });

      loaders.stores.clear(store);

      return { success: true };
    }
  }
};

module.exports = resolvers;
